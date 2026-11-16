# 🌿 ANVI Living — Hệ Sinh Thái Sống Mindful & Thể Thao Chánh Niệm

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)

> **Tìm Về Khoảng Lặng Bình Yên. Đánh Thức Năng Lượng Thuần Khiết Trong Bạn.**  
> Nền tảng kết nối cộng đồng yêu thích Yoga, thiền định, chạy bộ chánh niệm và lối sống xanh qua chuỗi sự kiện thực tế và các khóa học trực tuyến mỗi ngày.

---

## ✨ 4 Trụ Cột Hệ Sinh Thái ANVI Living

1. **🏃 Lễ Hội & Sự Kiện Thực Địa (ANVI 108 & Retreats):**
   - Chuỗi lễ hội ba môn phối hợp chánh niệm: Chạy bộ 5K ngắm bình minh + Đại hòa âm Yoga 90 phút ngoài trời + Thiền chuông xoay trị liệu tại Đà Lạt, Hội An, Phú Quốc.
   - Hệ thống giữ chỗ, chọn hạng vé (Early Bird, VIP All-Access) và gửi vé điện tử QR Code tức thì.
2. **🎬 Lớp Học Trực Tuyến (ANVI Studio):**
   - Kho video bài tập 4K theo từng trường phái: *Vinyasa Flow, Yin Yoga phục hồi, Breathwork chữa lành, Thiền định*.
   - Trình phát video trực tiếp (Video Modal Player) không làm gián đoạn trải nghiệm người dùng.
3. **📖 Tạp Chí Phong Cách Sống (ANVI Journal):**
   - Bài viết chuyên sâu về khoa học hơi thở, sống chậm và dinh dưỡng thực dưỡng bản địa.
   - Bộ lọc chuyên mục thông minh và thanh tìm kiếm từ khóa thời gian thực.
4. **🛍️ Cửa Hàng Vật Phẩm & Thảo Mộc (ANVI Shop):**
   - Thảm định tuyến cao su tự nhiên cao cấp ANVI Pro, trà thảo dược thư giãn giấc ngủ sâu.
   - Giỏ hàng trượt thông minh (Slide-over Cart Drawer) tích hợp tính tiền đồng nhất.

---

## 🧘 Đội Ngũ Huấn Luyện Viên Dẫn Dắt

- **Thuận Hoàng:** Bậc thầy Hatha & Breathwork Trị Liệu (Chủ trì Đại hòa âm Yoga & Tác giả chuyên mục Sống Đẹp).
- **Thùy Giang:** Huấn luyện viên Vinyasa & Năng Lượng Chuyển Động (Dẫn dắt 5K Mindful Run & Khóa học Vinyasa Flow).
- **Bích Huệ:** Chuyên gia Yin Yoga & Dinh Dưỡng Thực Dưỡng (Chủ trì Thiền chuông xoay & Các khóa tu dưỡng Retreats).

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

| Tầng công nghệ | Giải pháp lựa chọn |
|---|---|
| **Frontend Framework** | **Next.js 14 (App Router)** + **React 18** |
| **Ngôn ngữ** | **TypeScript 5.7** (100% Type-safe) |
| **Giao diện & Styling** | **Tailwind CSS** + Bộ Design Tokens đạt chuẩn tương phản **WCAG 2.2 AAA** |
| **Font chữ** | **Playfair Display** (Tiêu đề) + **Plus Jakarta Sans** (Nội dung) với subset tiếng Việt hoàn chỉnh |
| **Cơ sở dữ liệu** | **PostgreSQL on Supabase** (Tích hợp phân quyền Row Level Security - RLS) |
| **Thanh toán trực tuyến** | **Stripe Checkout API** + Webhook xử lý bất đồng bộ chống trùng lặp |
| **Email giao dịch** | **Resend** (Mẫu email xác nhận vé điện tử QR Code tự động) |
| **Validation máy chủ** | **Zod** (Kiểm tra dữ liệu đầu vào toàn bộ các API routes) |

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### 1. Tải mã nguồn về máy:
```bash
git clone https://github.com/hongquanghl/anvi-living.git
cd anvi-living
```

### 2. Cài đặt các gói phụ thuộc:
```bash
npm install
```

### 3. Cấu hình biến môi trường:
Tạo file `.env.local` dựa trên file mẫu `.env.example`:
```bash
cp .env.example .env.local
```

Điền các thông tin khóa API của bạn:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
EMAIL_FROM="ANVI Living <hoangthuannk@gmail.com>"
```

### 4. Khởi chạy máy chủ phát triển:
```bash
npm run dev
```
Mở trình duyệt truy cập: **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
d:/WEB
├── replica/                 # Hồ sơ tài liệu kỹ thuật Replica Pack
│   ├── recon.md             # Khảo sát cấu trúc & luồng người dùng
│   ├── architecture.md      # Kiến trúc hệ thống & thiết kế API
│   ├── schema.sql           # Cấu trúc 11 bảng PostgreSQL + RLS
│   ├── design/              # Design tokens (tokens.json, tokens.css)
│   ├── brand.md             # Chiến lược tái định vị thương hiệu ANVI Living
│   └── launch/              # Bản kế hoạch ra mắt, trang bán hàng & bảng giá
├── src/
│   ├── app/                 # Next.js App Router (13 trang & API routes)
│   │   ├── events/          # Danh mục & Đặt vé sự kiện
│   │   ├── tv/              # Thư viện lớp học trực tuyến
│   │   ├── journal/         # Tạp chí chánh niệm
│   │   ├── shop/            # Cửa hàng thảm & thảo mộc
│   │   ├── account/         # Quản lý tài khoản, ví vé & hủy gói 1-Click
│   │   └── api/             # Các API Checkout, Webhook, Newsletter
│   ├── components/          # Các linh kiện UI (Navbar, Footer, Cards, Drawer)
│   ├── context/             # Global Cart State (CartContext.tsx)
│   ├── data/                # Dữ liệu hạt giống chuẩn hóa (seed.ts)
│   └── lib/                 # Supabase, Stripe, Resend & Zod validation
└── tailwind.config.js       # Cấu hình màu sắc, typography Việt hóa
```

---

## 📬 Liên Hệ & Hợp Tác

- **Đơn vị vận hành:** ANVI Living Vietnam
- **Email:** [hoangthuannk@gmail.com](mailto:hoangthuannk@gmail.com)
- **Website chính thức:** [https://anvi-living.vercel.app](https://anvi-living.vercel.app)

---

*Bản quyền © 2026 ANVI Living. Thiết kế sạch, hướng tới lối sống bền vững.*
