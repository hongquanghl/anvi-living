# Architecture: Mindful Living Portal (Wanderlust Clone)

Architecture plan based on `replica/recon.md` and `replica/features.csv`.

---

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| **Web Frontend & API** | Next.js (App Router) + TypeScript | React Server Components (RSC) tối ưu SEO vượt trội cho Journal & Events, Server Actions đơn giản hoá gọi backend. |
| **Styling & UI Tokens** | Tailwind CSS + Lucide Icons | Nhanh, linh hoạt, dễ tuỳ biến tone màu tự nhiên (earthy/khaki/sand) từ Design System. |
| **Database** | PostgreSQL on Supabase (hoặc Neon) | Quan hệ thực thể chặt chẽ (Events - Tickets - Orders - Videos), hỗ trợ RLS bảo mật mạnh mẽ. |
| **ORM / Data Access** | Prisma hoặc Supabase JS Client | Type-safe queries, migration tự động, dễ viết truy vấn. |
| **Authentication** | Supabase Auth (hoặc NextAuth.js) | Hỗ trợ Email Magic Link + Google OAuth mượt mà, đồng bộ trực tiếp với RLS. |
| **Payments** | Stripe Checkout + Webhooks (hoặc PayOS/VNPay cho VN) | Xử lý thanh toán cả One-time (mua vé, mua đồ shop) và Recurring Subscription (gói Wanderlust TV). |
| **Video Delivery** | Cloudflare Stream / Mux (hoặc HLS Storage) | Streaming video mượt mà, chống tải lậu, hỗ trợ adaptive bitrate streaming trên mọi thiết bị. |
| **Email Service** | Resend (React Email) | Gửi vé điện tử QR Code, xác nhận đơn hàng và bản tin newsletter với tỷ lệ vào Inbox cao. |
| **Hosting** | Vercel | Triển khai Edge/Serverless tự động, tốc độ cao toàn cầu, CDN tích hợp. |

---

## 2. Schema

- **Số lượng bảng:** 11 bảng.
- **Bảo mật truy cập:** Row Level Security (RLS) trên PostgreSQL.
- **File chi tiết:** Xem tại [schema.sql](file:///d:/WEB/replica/schema.sql).

Danh sách bảng:
1. `profiles`: Thông tin người dùng & vai trò (member, instructor, admin).
2. `instructors`: Danh mục giáo viên, tiểu sử, ảnh đại diện, chuyên môn.
3. `events`: Danh mục sự kiện, lễ hội, workshop, địa điểm, thời gian.
4. `ticket_tiers`: Các hạng vé của sự kiện, giá tiền, số lượng vé tối đa & đã bán.
5. `class_videos`: Kho video bài tập (thời lượng, trình độ, phong cách, trạng thái hội viên).
6. `saved_classes`: Danh sách bài tập yêu thích / lưu lại của học viên.
7. `articles`: Tạp chí lối sống, bài viết blog, thời gian đọc, markdown content.
8. `products`: Sản phẩm thời trang, thảm tập, thực phẩm chức năng, số lượng kho.
9. `orders`: Đơn hàng đặt vé, mua sản phẩm hoặc mua gói hội viên.
10. `order_items`: Chi tiết từng món trong đơn hàng.
11. `newsletter_subscribers`: Danh sách email nhận bản tin.

---

## 3. API & Routes

| Method & Route | What it does | Who can call | Input | Output | Flow |
|---|---|---|---|---|---|
| `GET /api/events` | Lấy danh sách sự kiện kèm bộ lọc | Public | `category`, `city`, `from_date` | JSON list of Events | F01 |
| `GET /api/events/[slug]` | Lấy chi tiết sự kiện và các hạng vé | Public | `slug` | Event detail + TicketTiers | F01 |
| `POST /api/checkout/ticket` | Tạo phiên thanh toán vé sự kiện | Public / Member | `ticket_tier_id`, `qty`, `customer_info` | Stripe Checkout URL / Order ID | F01 |
| `GET /api/tv/classes` | Lấy danh sách video bài tập theo bộ lọc | Public | `style`, `level`, `duration` | JSON list of ClassVideos | F02 |
| `GET /api/tv/classes/[slug]` | Lấy thông tin video & Stream URL | Public / Member | `slug` | Video metadata + Signed Stream URL | F02 |
| `POST /api/tv/saved` | Thêm / Xoá video khỏi danh sách đã lưu | Member | `class_id`, `action` (save/unsave) | Success status | F02 |
| `GET /api/articles` | Lấy bài viết tạp chí theo danh mục | Public | `category`, `page`, `limit` | Paginated Articles | F03 |
| `GET /api/articles/[slug]` | Đọc chi tiết bài viết | Public | `slug` | Full Article markdown | F03 |
| `POST /api/newsletter` | Đăng ký nhận bản tin | Public | `email`, `source` | Success message | F03 |
| `GET /api/shop/products` | Lấy danh mục sản phẩm | Public | `category`, `sort` | JSON list of Products | F04 |
| `POST /api/checkout/cart` | Thanh toán giỏ hàng sản phẩm | Public / Member | `items: [{product_id, qty}]`, `address` | Checkout URL | F04 |

### Webhooks:
- `POST /api/webhooks/stripe`: Lắng nghe sự kiện `checkout.session.completed`, cập nhật trạng thái đơn hàng (`status = 'paid'`), kích hoạt gửi email vé qua Resend và trừ số lượng vé (`sold_count`).

### Background Jobs:
- `Daily Cleanup Job`: Hủy các đơn hàng pending quá 24h để hoàn lại quota vé.
- `Event Reminder Job`: Gửi email nhắc nhở trước 24h cho người đã mua vé sự kiện.

---

## 4. The Parts That Bite (Các rủi ro kỹ thuật cần lưu ý)

1. **Race Condition khi mua vé (Overselling Tickets):**
   - Khi sự kiện "hot" mở bán, nhiều người có thể bấm mua cùng lúc dẫn đến số vé bán vượt quá `quota`.
   - *Giải pháp:* Sử dụng transaction trong PostgreSQL với câu lệnh cập nhật có điều kiện:  
     `UPDATE ticket_tiers SET sold_count = sold_count + $qty WHERE id = $id AND (sold_count + $qty) <= quota;`
2. **Bảo vệ nội dung Video Streaming (Wanderlust TV Paywall):**
   - Không được để lộ trực tiếp URL file MP4 gốc ra client.
   - *Giải pháp:* Sử dụng Cloudflare Stream hoặc HLS với Signed URLs / Signed Tokens có hạn giờ (TTL 2 giờ).
3. **Timezone & Giờ giấc sự kiện:**
   - Người tham gia có thể đến từ các múi giờ khác nhau.
   - *Giải pháp:* Luôn lưu thời gian sự kiện dưới dạng `timestamptz` chuẩn UTC, và hiển thị kèm múi giờ của địa phương tổ chức sự kiện.
4. **Idempotency ở Webhook thanh toán:**
   - Webhook của Stripe có thể gửi lặp lại 2 lần. Cần kiểm tra `payment_intent_id` trước khi gửi vé hoặc trừ kho sản phẩm.

---

## 5. Build Order (Thứ tự triển khai)

### Giai đoạn 1: Vertical Slice (MVP Core Loop)
> Mục tiêu: Chứng minh tính khả thi của toàn bộ Stack trong vòng 2 - 3 ngày.
- **Screens:** `S01` (Homepage cơ bản) $\rightarrow$ `S02` (Events Directory) $\rightarrow$ `S03` (Event Detail) $\rightarrow$ `S10` (Checkout đơn giản).
- **Tables:** `events`, `ticket_tiers`, `orders`, `order_items`.
- **Routes:** `/api/events`, `/api/checkout/ticket`, `/api/webhooks/stripe`.

### Giai đoạn 2: Must-Haves (Hoàn thiện 4 trụ cột)
- **Wanderlust TV:** Màn hình `S04` & `S05` (Trình duyệt video + Player phát bài tập).
- **Journal / Magazine:** Màn hình `S06` & `S07` (Trang tạp chí & Trang đọc bài viết Markdown).
- **Wellness Shop:** Màn hình `S08` & `S09` (Danh mục sản phẩm & Trang giỏ hàng).
- **User Auth & Profiles:** Đăng nhập Google/Email, xem lịch sử vé đã mua.

### Giai đoạn 3: Should-Haves & Nâng cao
- Bộ lọc nâng cao theo bộ môn yoga & thời lượng.
- Chức năng tìm kiếm toàn trang (Global search modal).
- Gói thuê bao định kỳ (Monthly/Annual Subscription) cho TV.
