'use client';

import React, { useState } from 'react';
import { Compass, Filter, Calendar, MapPin } from 'lucide-react';
import { EVENTS } from '@/data/seed';
import EventCard from '@/components/EventCard';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const filteredEvents = EVENTS.filter((evt) => {
    const matchCategory = selectedCategory === 'all' || evt.category === selectedCategory;
    const matchCity = selectedCity === 'all' || evt.city === selectedCity;
    return matchCategory && matchCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3eee5] text-[#9c4826] text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Lịch Trình Sự Kiện Toàn Quốc</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1a1917] tracking-tight">
          Lễ Hội & Kỳ Nghỉ Dưỡng 2026 - 2027
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#575249] leading-relaxed">
          Bước ra khỏi màn hình để hòa mình vào những ngày hội vận động, âm nhạc mộc mạc và sự kết nối chân thật giữa con người và thiên nhiên.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#f3eee5] p-4 sm:p-6 rounded-2xl border border-[#dcd4c5]/80 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'Tất Cả Sự Kiện' },
            { id: '108', label: 'Lễ Hội 108' },
            { id: 'retreat', label: 'Kỳ Nghỉ Dưỡng Retreat' },
            { id: 'workshop', label: 'Workshop Chuyên Sâu' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-[#9c4826] text-white shadow-sm'
                  : 'bg-white text-[#575249] hover:text-[#1a1917] hover:bg-white/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <MapPin className="w-4 h-4 text-[#9c4826]" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2 bg-white rounded-lg border border-[#dcd4c5] text-xs font-medium text-[#1a1917] focus:outline-none focus:ring-1 focus:ring-[#9c4826]"
          >
            <option value="all">Mọi Địa Điểm</option>
            <option value="Đà Lạt">Đà Lạt</option>
            <option value="Hội An">Hội An</option>
            <option value="Phú Quốc">Phú Quốc</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-24 bg-[#f3eee5] rounded-2xl border border-[#dcd4c5]">
          <Calendar className="w-12 h-12 text-[#dcd4c5] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#1a1917]">Chưa có sự kiện phù hợp</h3>
          <p className="text-xs text-[#575249] mt-1">
            Vui lòng thử chọn lại danh mục hoặc tỉnh thành khác.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      )}
    </div>
  );
}
