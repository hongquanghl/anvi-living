# Component Specifications (Wanderlust Design System)

All components use design tokens from `tokens.json`. No raw hex codes.

---

### 1. Button
- **Variants:** `primary` (solid terracotta accent), `secondary` (sand surface), `outline` (border only), `ghost` (clean text)
- **Sizes:** `sm` (h-8 px-3 text-xs), `md` (h-10 px-5 text-sm), `lg` (h-12 px-6 text-base)
- **States:** `default`, `hover`, `active`, `focus-visible` (ring-2 ring-accent ring-offset-2), `disabled` (opacity-50 cursor-not-allowed), `loading` (spinner with accessible text)
- **Tokens:** `bg-accent text-on-accent rounded-pill font-medium transition-base`
- **A11y:** Semantic `<button>`, visible focus ring, preserves aria-label during loading
- **Used on:** All screens (S01 - S11)

---

### 2. Navbar / Header
- **Variants:** `transparent-hero` (white text on dark hero image), `solid-sticky` (bg-bg/95 backdrop-blur-md border-b border-border)
- **Components:** Brand Logo, Navigation Links (Events, TV, Journal, Shop), Search Icon, Account Icon, Cart Trigger (with badge count)
- **States:** `top`, `scrolled`, `mobile-open`
- **Tokens:** `h-20 px-6 max-w-7xl mx-auto flex items-center justify-between`
- **A11y:** Semantic `<header>` and `<nav>`, keyboard navigable dropdowns, Escape closes mobile menu
- **Used on:** All screens (S01 - S11)

---

### 3. EventCard
- **Variants:** `vertical` (grid layout), `horizontal` (featured highlight)
- **Sub-elements:** Event image (aspect-video rounded-lg), Date & Location badge, Title (font-serif font-bold), Short description, "Get Tickets" CTA
- **States:** `default`, `hover` (slight scale 1.02 & shadow-card lift), `sold-out` (dimmed image + "Sold Out" badge)
- **Tokens:** `bg-surface rounded-xl overflow-hidden border border-border/60 transition-base`
- **Used on:** S01 (Homepage), S02 (Events Directory)

---

### 4. VideoCard (Wanderlust TV)
- **Variants:** `grid-item` (16:9 thumbnail), `compact` (playlist sidebar)
- **Sub-elements:** Video thumbnail, Duration pill (e.g. "25 min"), Style badge ("Vinyasa"), Instructor avatar & name, Lock icon (if premium)
- **States:** `default`, `hover` (play button overlay appears, subtle zoom), `locked` (membership banner)
- **Tokens:** `group relative rounded-lg overflow-hidden bg-surface`
- **Used on:** S01, S04 (TV Hub), S05 (Class Player sidebar)

---

### 5. ArticleCard (Journal)
- **Variants:** `featured-hero` (large 2-column spread), `editorial-card` (standard 3-column feed)
- **Sub-elements:** Category kicker pill (e.g. "Mindfulness"), Title (font-serif tracking-tight), Excerpt, Author avatar, Published date & Read time
- **States:** `default`, `hover` (title underline transition)
- **Tokens:** `text-text hover:text-accent transition-colors`
- **Used on:** S01, S06 (Journal Feed), S07 (Related articles)

---

### 6. ProductCard (Shop)
- **Variants:** `standard` (e-commerce catalog)
- **Sub-elements:** Product photo (aspect-[3/4]), Quick Add button (on hover), Title, Price & Currency, Sale tag
- **States:** `default`, `hover` (secondary image preview or Quick Add button slide-up), `out-of-stock`
- **Tokens:** `bg-surface rounded-lg p-4 border border-transparent hover:border-border transition-base`
- **Used on:** S08 (Shop Collection), S09 (Related products)

---

### 7. VideoPlayer
- **Features:** Custom minimalist controls, Play/Pause toggle, Timeline scrubber, Volume slider, Fullscreen, Quality selector
- **States:** `buffering`, `playing`, `paused`, `error`, `paywall-locked`
- **A11y:** Keyboard shortcuts (Space/K for play/pause, M for mute, F for fullscreen), captions/subtitles support
- **Used on:** S05 (Video Class Page)

---

### 8. Cart Drawer (Slide-over)
- **Elements:** Header with item count, Scrollable cart item list (image, title, variant, qty stepper, remove button), Order total, Free shipping progress bar, Checkout CTA button
- **States:** `empty` ("Your bag is empty" + "Explore classes & gear"), `filled`, `updating`
- **Tokens:** `fixed inset-y-0 right-0 w-full max-w-md bg-bg shadow-pop border-l border-border z-50`
- **A11y:** Focus trap when opened, close on Escape key or backdrop click
- **Used on:** Global trigger on all screens (S01 - S11)
