# Deploy Checklist: ANVI Living

Date: 2026-11-16  Commit: a0ce424  Go from user: Yes

---

## 1. Preflight Verification (Tất cả đã đạt chuẩn)

- [x] **Parity Feature Score:** 100.0 / 100 (14/14 Must-haves hoàn thành)
- [x] **Brand Sweep Clean:** Exit 0 (0 vết tích của Wanderlust, không dính bản quyền)
- [x] **Store Listing:** Exit 0 (0 lỗi vi phạm ASO của App Store / Google Play)
- [x] **Production Build:** `npm run build` thành công 100% (13 routes tĩnh/động không lỗi)
- [x] **Bản địa hóa & Dấu tiếng Việt:** 100% tiếng Việt, font Playfair Display & Plus Jakarta Sans chuẩn chỉnh
- [x] **Bảo mật Secret:** File `.gitignore` chặn toàn bộ file `.env*`, `.env.example` đã chuẩn hóa

---

## 2. Production Services & Hosting (Vercel)
- **Host:** Vercel (Tối ưu hóa mặc định cho Next.js App Router)
- **Database:** Supabase PostgreSQL (Kèm RLS bảo mật)
- **Thanh toán:** Stripe Checkout + Webhook (`/api/webhooks/stripe`)
- **Email:** Resend (`/api/email`)

---

## 3. Bản ghi DNS Tên Miền (Custom Domain Configuration)

| Loại bản ghi (Type) | Tên (Host / Name) | Giá trị đích (Target Value) | Mục đích |
|---|---|---|---|
| **A** | `@` | `76.76.21.21` | Trỏ tên miền gốc (apex) về cụm Edge IP Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | Trỏ subdomain www về Vercel |

### Cấu hình Email DNS (Tránh rơi vào hộp thư Spam):
- **SPF (TXT):** `v=spf1 include:resend.com ~all`
- **DMARC (TXT):** `v=DMARC1; p=none; rua=mailto:hoangthuannk@gmail.com`
