export interface Instructor {
  id: string;
  name: string;
  slug: string;
  title: string;
  bio: string;
  avatar: string;
  specialties: string[];
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  quota: number;
  sold: number;
  perks: string[];
  isAvailable: boolean;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'festival' | '108' | 'retreat' | 'workshop';
  categoryLabel: string;
  locationName: string;
  address: string;
  city: string;
  startDate: string;
  endDate: string;
  image: string;
  instructors: Instructor[];
  ticketTiers: TicketTier[];
  highlights: string[];
  schedule: { time: string; activity: string; instructor?: string }[];
}

export interface ClassVideo {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructor: Instructor;
  durationMinutes: number;
  level: 'Mọi cấp độ' | 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  style: 'Vinyasa Yoga' | 'Yin Yoga' | 'Thiền định' | 'Hít thở Breathwork' | 'Sound Healing';
  thumbnail: string;
  videoUrl: string;
  isPremium: boolean;
  isFeatured?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: 'Lối sống Mindful' | 'Thực hành Yoga' | 'Dinh dưỡng thực dưỡng' | 'Sức khỏe tinh thần';
  readTimeMinutes: number;
  publishedAt: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  category: 'Thảm & Dụng cụ tập' | 'Thời trang thể thao' | 'Thực phẩm thảo mộc' | 'Phụ kiện';
  images: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}
