# Build Log: Wanderlust Vietnam (Clone MVP)

## Milestone: Vertical Slice & Core Pillars (Tiếng Việt)
- **Ngày:** 2026-11-16
- **Ngôn ngữ giao diện:** 100% Tiếng Việt
- **Các màn hình đã dựng:**
  - `S01` (Trang chủ Landing Page tích hợp 4 trụ cột) -> `src/app/page.tsx`
  - `S02` (Danh mục Lễ hội & Sự kiện toàn quốc) -> `src/app/events/page.tsx`
  - `S03` (Chi tiết sự kiện, Lịch trình & Chọn vé) -> `src/app/events/[slug]/page.tsx`
  - `S04` & `S05` (Wanderlust TV Hub & Trình phát video bài tập có modal) -> `src/app/tv/page.tsx`
  - `S06` (Tạp chí phong cách sống Journal) -> `src/app/journal/page.tsx`
  - `S08` (Cửa hàng thảm tập & thảo mộc) -> `src/app/shop/page.tsx`
  - `S10` (Giỏ hàng Slide-over Drawer & Tính tiền) -> `src/components/CartDrawer.tsx`
- **Linh kiện Primitives:**
  - `Navbar.tsx`, `Footer.tsx`, `HeaderWrapper.tsx`
  - `EventCard.tsx`, `VideoCard.tsx`, `ArticleCard.tsx`, `ProductCard.tsx`
  - `CartContext.tsx` (Global State cho vé sự kiện và sản phẩm)
