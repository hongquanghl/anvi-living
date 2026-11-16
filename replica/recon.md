# Recon map: Wanderlust (Web Fullstack)

Scope: Full-ecosystem Portal & Core Modules (Landing Page, Events & Ticketing, On-Demand Yoga/TV Classes, Editorial Magazine, Wellness Shop)  
Target Stack: Next.js (App Router), Tailwind CSS, Node.js / Supabase (PostgreSQL + Auth)  
Date: 2026-11-16  

---

## Sources

| # | source | URL | notes |
|---|---|---|---|
| 1 | Marketing & Portal Homepage | `https://wanderlust.com` | Cấu trúc định vị thương hiệu, hero video/banner, 4 trụ cột chính |
| 2 | Events & Festivals Directory | `https://wanderlust.com/events` | Lịch trình sự kiện (Wanderlust 108, Festival, Retreats), lọc địa điểm, bán vé |
| 3 | Wanderlust TV (On-demand) | `https://wanderlust.com/tv` | Danh mục video yoga/meditation, giáo viên, gói thuê bao (subscription) |
| 4 | Journal & Editorial (Magazine) | `https://wanderlust.com/journal` | Blog/tạp chí phong cách sống, sức khỏe, thiền định, dinh dưỡng |
| 5 | Shop & Merchandise | `https://wanderlust.com/shop` | E-commerce bán đồ tập, thảm yoga, thực phẩm bổ sung plant-active |

---

## Core Loop

> **Người dùng khám phá cảm hứng sống mindful qua bài viết & sự kiện -> Đăng ký tham gia lớp học / Festival hoặc mua gói hội viên Wanderlust TV để thực hành mỗi ngày.**

---

## Screens

| ID | Screen Name | Route / Path | Purpose | Key Components | States Seen |
|---|---|---|---|---|---|
| **S01** | Homepage (Portal Hub) | `/` | Giới thiệu toàn cảnh hệ sinh thái, sự kiện nổi bật, video gợi ý, bài viết mới | Hero Video/Slider, Pillar Cards (Events, TV, Journal, Shop), Testimonials, Newsletter Banner | filled, loading |
| **S02** | Events Directory | `/events` | Khám phá và lọc các sự kiện, lễ hội, workshop theo địa điểm & ngày | Filter Bar (Location, Type, Date), Event Card Grid, Map View Toggle | empty, filled, loading |
| **S03** | Event Detail & Booking | `/events/[slug]` | Chi tiết lịch trình, giáo viên/nghệ sĩ tham gia, bảng giá vé và đặt chỗ | Hero Banner, Lineup Carousel, Schedule Accordion, Ticket Selector Widget | filled, sold-out, error |
| **S04** | Wanderlust TV Hub | `/tv` | Duyệt kho bài tập yoga, thiền, breathwork theo cấp độ và giáo viên | Category Tabs, Hero Featured Class, Video Carousel Rows, Subscription Banner | filled, loading |
| **S05** | Video Player / Class View | `/tv/[classId]` | Trải nghiệm lớp học video trực tuyến kèm thông tin bài tập | Custom Video Player, Class Notes/Props, Related Classes, Save to Library button | playing, paused, locked (paywall) |
| **S06** | Journal / Article Feed | `/journal` | Đọc các bài viết, bài phỏng vấn, hướng dẫn dinh dưỡng và lối sống | Category Pills, Featured Editorial Hero, 3-Column Article Grid, Search Bar | empty, filled |
| **S07** | Article Detail Page | `/journal/[slug]` | Đọc chi tiết bài viết với trải nghiệm đọc chuẩn typography cao cấp | Sticky Share Bar, Reading Progress Bar, Rich Text Renderer, Author Bio, Related Posts | filled |
| **S08** | Shop Collection | `/shop` | Khám phá các sản phẩm đồ tập, thảm, thảo dược bổ sung | Faceted Sidebar Filters, Sort Dropdown, Product Grid, Quick View Modal | empty, filled, loading |
| **S09** | Product Detail (PDP) | `/shop/[productSlug]` | Xem chi tiết sản phẩm, chọn phân loại (size/màu), thêm vào giỏ hàng | Image Gallery Carousel, Variant Picker, Quantity Counter, Add to Cart, Accordion Specs | in-stock, out-of-stock |
| **S10** | Cart & Checkout Drawer | `/checkout` (hoặc Slide-over Drawer) | Xem lại giỏ hàng, nhập coupon, thanh toán vé hoặc sản phẩm | Cart Item List, Order Summary, Promo Code Input, Stripe/Payment Form | empty, filled, processing |
| **S11** | User Auth & Profile | `/login`, `/account` | Đăng nhập tài khoản, quản lý vé đã mua, lớp học đã lưu | Auth Tabs (Email/OAuth), Saved Classes Tab, Ticket History, Membership Status | logged-out, logged-in |

---

## Flows

### F01: Khách đặt vé tham gia sự kiện (Events & Ticketing)
```
S01 (Home) -> S02 (Events Directory) -> S03 (Event Detail) -> Chọn loại vé -> S10 (Thanh toán Checkout) -> Nhận vé điện tử / QR Code
Happy path clicks: 4 clicks
Edge cases: Hết vé (Sold out), thay đổi địa điểm/thời tiết, hoàn vé.
```

### F02: Học viên xem video luyện tập Yoga / Thiền (Wanderlust TV)
```
S01 (Home) -> S04 (TV Catalog) -> Lọc bài tập 20 phút Vinyasa -> S05 (Video Player) -> Bấm Play / Đánh dấu hoàn thành
Happy path clicks: 3 clicks
Edge cases: Chưa đăng ký hội viên (hiển thị Paywall modal mời đăng ký gói tháng), mạng giật lag khi tải video.
```

### F03: Đọc bài viết phong cách sống & Đăng ký nhận bản tin
```
S01 (Home) -> S06 (Journal) -> S07 (Article Detail) -> Đọc xong -> Nhập email tại Newsletter Form -> Thông báo xác nhận
Happy path clicks: 2 clicks
Edge cases: Email đã tồn tại trong hệ thống, lỗi kết nối API email marketing.
```

### F04: Mua sắm sản phẩm thể thao / thực phẩm bổ sung
```
S01 (Home) -> S08 (Shop) -> S09 (Product Detail) -> Chọn Size -> Mở S10 (Cart Drawer) -> Điền địa chỉ & Thanh toán
Happy path clicks: 5 clicks
Edge cases: Hết hàng kích cỡ mong muốn, huỷ đơn.
```

---

## Components

| Component | Variants | States | Used On |
|---|---|---|---|
| **Button** | primary (khaki/earthy), secondary, outline, ghost | default, hover, active, disabled, loading | Tất cả các màn hình |
| **Navbar / MegaMenu** | transparent (on hero), solid sticky, mobile drawer | expanded, collapsed, scrolled | S01 - S11 |
| **Card (Event)** | horizontal, vertical card | default, hover (scale & badge), sold-out | S01, S02 |
| **Card (Video Class)** | video thumbnail với thời lượng & mức độ | default, hover preview, locked badge | S01, S04 |
| **Card (Article)** | featured hero card, standard list card | default, hover underline | S01, S06, S07 |
| **Card (Product)** | e-commerce grid card kèm quick-add | default, hover image swap, out-of-stock | S08, S09 |
| **VideoPlayer** | HTML5 / HLS streaming with custom controls | playing, paused, fullscreen, buffering | S05 |
| **Drawer / Modal** | slide-over cart, search modal, filter drawer | open, closing, closed | S02, S08, S10 |
| **Badge / Tag** | style pill (e.g., "Yin Yoga", "Festival", "New") | default, selected, disabled | S02, S04, S06, S08 |
| **Input / Form** | text, email, select dropdown, search input | default, focus, valid, error, disabled | S03, S06, S10, S11 |

---

## Inferred Data Model

```
User          id, email, full_name, avatar_url, role (member, instructor, admin), created_at
              evidence: S11 User Account, S05 Saved Classes
              confidence: high

Event         id, title, slug, subtitle, description, location_name, address, city, country,
              start_date, end_date, cover_image, banner_image, category (festival, 108, retreat), status
              evidence: S02 Events Directory, S03 Event Detail
              confidence: high

TicketTier    id, event_id, name, price, currency, quota, sold_count, perks_description
              evidence: S03 Ticket Selection
              confidence: high

ClassVideo    id, title, slug, description, instructor_id, video_url, duration_seconds,
              level (beginner, intermediate, advanced), style (vinyasa, yin, hatha, meditation),
              is_featured, is_premium, thumbnail_url, created_at
              evidence: S04 TV Hub, S05 Video Player
              confidence: high

Instructor    id, name, slug, bio, profile_image, instagram_handle, specialties (array)
              evidence: S03 Event Lineup, S04 Class Instructors
              confidence: high

Article       id, title, slug, excerpt, content_markdown, cover_image, author_id, category,
              read_time_minutes, published_at, is_published
              evidence: S06 Journal Feed, S07 Article View
              confidence: high

Product       id, title, slug, description, price, compare_at_price, category, images (json/array),
              stock_quantity, sku, is_available
              evidence: S08 Shop Collection, S09 PDP
              confidence: high

Order         id, user_id, order_type (ticket, product, subscription), total_amount, status (pending, paid, cancelled),
              payment_method, shipping_address (json), created_at
              evidence: S10 Checkout, S11 Order History
              confidence: high
```

Relationships:
- `User` 1-n `Order`
- `Event` 1-n `TicketTier`
- `TicketTier` 1-n `OrderItem`
- `Instructor` 1-n `ClassVideo`
- `Instructor` n-n `Event` (Lineup)
- `User` n-n `ClassVideo` (Saved bookmarks/History)

---

## Feature Matrix Summary

- Xem chi tiết tại [features.csv](file:///d:/WEB/replica/features.csv)
- **Must-have**: 14 tính năng cốt lõi (Landing page, Events listing, Ticket selection, Video Catalog, Video Player, Journal, Article reader, Shop PDP, Cart, User Auth, Newsletter,...)
- **Should-have**: 5 tính năng (Subscription Pass, Instructor directory, Watchlist, Global search, Ticket wallet)
- **Could-have / Skip**: 4 tính năng (Bỏ qua tải offline mobile app, tài trợ doanh nghiệp, bản quyền nhạc số độc quyền)

---

## Out of Scope (Không thể hoặc không nên sao chép)

1. **Bản quyền hình ảnh / video độc quyền của Wanderlust**: Cần thay bằng kho ảnh / video royalty-free (Unsplash, Pexels, yoga stock videos).
2. **Hệ thống nhạc độc quyền**: Kho nhạc bản quyền của các nghệ sĩ tham gia lễ hội.
3. **Mạng lưới đối tác sự kiện toàn cầu**: Quan hệ hợp tác với các nhà tài trợ nước ngoài.

---

## Sizing & Độ phức tạp dự án

- **Quy mô**: 11 màn hình (Screens), 4 luồng chính (Flows), 8 bảng thực thể (Entities).
- **Phần phức tạp nhất (Hard parts)**:
  1. Xây dựng Video Streaming Player mượt mà kèm phân quyền hội viên (Wanderlust TV).
  2. Hệ thống đặt vé sự kiện (Inventory, Quota & Checkout).
  3. Quản lý trạng thái đa giỏ hàng / đa phân hệ (E-commerce + Ticketing + Subscription).
- **Đánh giá độ lớn**: **Size M** (Khoảng 2 - 3 tuần để hoàn thiện một bản Fullstack MVP chất lượng cao).
