import React from 'react';
import Link from 'next/link';
import { Compass, PlayCircle, BookOpen, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { EVENTS, CLASS_VIDEOS, ARTICLES, PRODUCTS } from '@/data/seed';
import EventCard from '@/components/EventCard';
import VideoCard from '@/components/VideoCard';
import ArticleCard from '@/components/ArticleCard';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featuredEvent = EVENTS[0];
  const otherEvents = EVENTS.slice(1);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#1a1917] text-white">
        {/* Background Image / Ambient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=85"
            alt="ANVI Living Yoga & Meditation"
            className="w-full h-full object-cover opacity-45 scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1917] via-transparent to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-widest uppercase mb-6 text-[#f3eee5]">
            <Sparkles className="w-3.5 h-3.5 text-[#f4a261]" />
            <span>Hệ Sinh Thái Sống Mindful Số 1 Việt Nam</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] text-white drop-shadow-sm">
            Tìm Về Sự Cân Bằng. <br />
            <span className="italic font-normal text-[#f4a261]">Nuôi Dưỡng Thân & Tâm.</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-[#f3eee5]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Kết nối cộng đồng những người đam mê yoga, thiền định, chạy bộ chánh niệm và lối sống xanh qua các lễ hội thực tế và lớp học trực tuyến mỗi ngày.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/events"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#9c4826] hover:bg-[#873c1d] text-white font-medium text-sm transition shadow-lg flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Khám Phá Lễ Hội 2026</span>
            </Link>

            <Link
              href="/tv"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-medium text-sm transition flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Tập Thử Miễn Phí</span>
            </Link>
          </div>

          {/* Quick Pillars Nav */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto text-left">
            <Link
              href="/events"
              className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#9c4826] transition group"
            >
              <Compass className="w-5 h-5 text-[#f4a261] mb-2" />
              <div className="text-xs font-semibold uppercase text-white/70">Trụ cột 01</div>
              <div className="font-serif font-bold text-sm text-white group-hover:text-[#f4a261] transition">Lễ Hội ANVI 108</div>
            </Link>
            <Link
              href="/tv"
              className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#9c4826] transition group"
            >
              <PlayCircle className="w-5 h-5 text-[#f4a261] mb-2" />
              <div className="text-xs font-semibold uppercase text-white/70">Trụ cột 02</div>
              <div className="font-serif font-bold text-sm text-white group-hover:text-[#f4a261] transition">ANVI Studio Online</div>
            </Link>
            <Link
              href="/journal"
              className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#9c4826] transition group"
            >
              <BookOpen className="w-5 h-5 text-[#f4a261] mb-2" />
              <div className="text-xs font-semibold uppercase text-white/70">Trụ cột 03</div>
              <div className="font-serif font-bold text-sm text-white group-hover:text-[#f4a261] transition">Tạp Chí Lối Sống</div>
            </Link>
            <Link
              href="/shop"
              className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#9c4826] transition group"
            >
              <Sparkles className="w-5 h-5 text-[#f4a261] mb-2" />
              <div className="text-xs font-semibold uppercase text-white/70">Trụ cột 04</div>
              <div className="font-serif font-bold text-sm text-white group-hover:text-[#f4a261] transition">Thảm Tập & Dược Liệu</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9c4826]">
              Trải nghiệm thực tế
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1917] mt-2">
              Lễ Hội & Sự Kiện Sắp Diễn Ra
            </h2>
            <p className="text-sm text-[#575249] mt-2 max-w-xl">
              Nơi hội tụ âm nhạc, thể thao chánh niệm và thiên nhiên nguyên bản khắp Việt Nam.
            </p>
          </div>
          <Link
            href="/events"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#9c4826] hover:text-[#873c1d] transition"
          >
            <span>Xem toàn bộ lịch trình</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Big Event Card */}
        <div className="space-y-8">
          <EventCard event={featuredEvent} featured={true} />
          {otherEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ANVI Studio Preview Section */}
      <section className="bg-[#f3eee5] py-20 border-y border-[#dcd4c5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9c4826]">
                ANVI Studio Trực Tuyến
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1917] mt-2">
                Thực Hành Yoga & Thiền Tại Nhà
              </h2>
              <p className="text-sm text-[#575249] mt-2 max-w-xl">
                Hơn 100+ video hướng dẫn chi tiết từ các bậc thầy hàng đầu với đa dạng thời lượng từ 15 đến 60 phút.
              </p>
            </div>
            <Link
              href="/tv"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#9c4826] hover:text-[#873c1d] transition"
            >
              <span>Vào thư viện lớp học</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLASS_VIDEOS.map((vid) => (
              <VideoCard key={vid.id} video={vid} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Magazine Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9c4826]">
              Tạp chí Mindful Journal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1917] mt-2">
              Tri Thức Nuôi Dưỡng Tâm Hồn
            </h2>
          </div>
          <Link
            href="/journal"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#9c4826] hover:text-[#873c1d] transition"
          >
            <span>Đọc tất cả bài viết</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      {/* Value Proposition & Commitments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#f3eee5] rounded-3xl p-8 sm:p-14 border border-[#dcd4c5]/70 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#9c4826]/10 text-[#9c4826] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[#1a1917]">Giảng Viên Uy Tín</h4>
            <p className="text-xs text-[#575249] mt-2 leading-relaxed">
              100% huấn luyện viên được chứng nhận quốc tế Yoga Alliance và có thâm niên hướng dẫn chuyên sâu.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#9c4826]/10 text-[#9c4826] flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[#1a1917]">Bảo Vệ Môi Trường</h4>
            <p className="text-xs text-[#575249] mt-2 leading-relaxed">
              Không rác thải nhựa tại các lễ hội thực địa và ưu tiên tối đa các sản phẩm thuần thiên nhiên phân hủy sinh học.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#9c4826]/10 text-[#9c4826] flex items-center justify-center mb-4">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[#1a1917]">Cộng Đồng Tương Ái</h4>
            <p className="text-xs text-[#575249] mt-2 leading-relaxed">
              Trích 5% lợi nhuận từ mỗi tấm vé bán ra đóng góp vào quỹ trồng rừng và bảo tồn thiên nhiên Việt Nam.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
