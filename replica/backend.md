# Backend Specification & Checklist: Wanderlust Vietnam

Tài liệu triển khai Backend theo tiêu chuẩn `replica-backend`.

---

## 1. Cấu hình Biến Môi Trường (`.env.example`)

File [.env.example](file:///d:/WEB/.env.example) đã được thiết lập đầy đủ tên các biến cần thiết mà không để lộ secret:
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY` & `EMAIL_FROM`

> File `.gitignore` đã được cấu hình chặt chẽ để chặn commit các file `.env`, `.env.local` lên Git.

---

## 2. Các Khối Chức Năng Đã Xây Dựng

### A. Tầng Cơ Sở Dữ Liệu & RLS (Supabase / PostgreSQL)
- **File Schema:** [replica/schema.sql](file:///d:/WEB/replica/schema.sql) gồm 11 bảng dữ liệu hoàn chỉnh, kiểu thời gian `timestamptz` chuẩn UTC, tiền tệ lưu dạng integer cents/đồng.
- **Phân quyền dữ liệu (Row Level Security):** Áp dụng chính sách bảo vệ dữ liệu khách hàng (khách chỉ xem được đơn hàng của chính mình, thông tin hội viên được bảo vệ).
- **Client kết nối:**
  - Client phía trình duyệt: `src/lib/supabase/client.ts`
  - Admin/Service role phía máy chủ: `src/lib/supabase/server.ts`

### B. Thanh Toán Trực Tuyến (Stripe Checkout & Webhook Idempotency)
- **API Khởi tạo thanh toán vé:** `POST /api/checkout/ticket`
  - Kiểm tra tính hợp lệ của sự kiện và số lượng vé còn lại trong kho.
  - Tạo Stripe Checkout Session và chuyển hướng người dùng sang trang thanh toán bảo mật.
  - Chạy song song chế độ Mock Test khi chưa cấu hình Live Key.
- **Webhook xử lý kết quả:** `POST /api/webhooks/stripe`
  - Xác thực chữ ký `stripe-signature` với `STRIPE_WEBHOOK_SECRET` để chống giả mạo request.
  - Xử lý sự kiện `checkout.session.completed` đảm bảo tính **Idempotent** (tránh trừ kho vé và gửi mail lặp lại).

### C. Gửi Email Xác Nhận Tự Động (Resend Transactional Email)
- **Module:** `src/lib/email.ts`
- **Mẫu email vé điện tử:** Tự động gửi email thông báo mã đơn hàng, hạng vé, thời gian & địa điểm ngay sau khi khách hàng hoàn tất thanh toán.

### D. Kiểm Tra Hợp Lệ Dữ Liệu Đầu Vào (Server Validation với Zod)
- **File:** `src/lib/validations.ts`
- Đảm bảo kiểm tra kiểu dữ liệu, định dạng email, chặn ký tự độc hại và giới hạn số lượng vé (tối đa 10 vé/lần) trước khi xử lý.

---

## 3. Bảng Kiểm Tra An Ninh (Security Checklist)

- [x] **Bảo mật Secret:** Khóa API chỉ nằm trong biến môi trường, file `.gitignore` đã chặn các file `.env*`, không lọt key bí mật vào client bundle.
- [x] **Validation máy chủ:** Toàn bộ route POST đều được validate chặt chẽ qua thư viện `Zod`.
- [x] **Phân quyền truy cập (Authorisation):** Schema PostgreSQL đã kích hoạt Row Level Security (RLS) cho tất cả các bảng.
- [x] **Xác thực Webhook:** Webhook Stripe có bước kiểm tra `stripe.webhooks.constructEvent` với chữ ký mã hóa.
- [x] **Xử lý bất đồng bộ & Idempotency:** Webhook kiểm tra trùng lặp mã thanh toán trước khi xử lý đơn hàng.
- [x] **Kiểm toán thư viện phụ thuộc:** Đã chạy kiểm tra `npm audit`.
- [x] **Chế độ kiểm thử an toàn (Test mode):** Mặc định hỗ trợ khóa test `sk_test_...` và tự động fallback sang Mock Mode an toàn khi đang phát triển cục bộ.

---

### Bước tiếp theo:
Theo lộ trình của Replica Pack, bước kế tiếp là **`replica-test`** (Viết kế hoạch kiểm thử, kiểm tra toàn bộ luồng happy path và edge cases của cả hệ thống).
