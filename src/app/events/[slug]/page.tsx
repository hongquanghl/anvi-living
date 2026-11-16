'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  Check,
  Ticket,
  ChevronLeft,
  Share2,
  Users,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { EVENTS } from '@/data/seed';
import { useCart } from '@/context/CartContext';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const event = EVENTS.find((e) => e.slug === slug) || EVENTS[0];

  const { addToCart } = useCart();
  const [selectedTierId, setSelectedTierId] = useState<string>(event.ticketTiers[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const selectedTier = event.ticketTiers.find((t) => t.id === selectedTierId) || event.ticketTiers[0];

  const handleBooking = () => {
    if (!selectedTier) return;
    addToCart({
      id: `${event.id}-${selectedTier.id}`,
      title: event.title,
      variantName: selectedTier.name,
      price: selectedTier.price,
      quantity,
      image: event.image,
      type: 'ticket',
    });
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  return (
    <div className="pb-24">
      {/* Top Banner & Breadcrumbs */}
      <div className="bg-[#f3eee5] border-b border-[#dcd4c5]/70 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#575249]">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 hover:text-[#9c4826] font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại danh sách sự kiện</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Đã sao chép liên kết sự kiện vào clipboard!')}
              className="p-1.5 rounded-full hover:bg-white text-[#575249] transition"
              title="Chia sẻ"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-96 sm:h-[480px] w-full overflow-hidden bg-black">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1917] via-transparent to-black/30" />
        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
          <span className="px-3 py-1 rounded-full bg-[#9c4826] text-white text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            {event.categoryLabel}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight max-w-4xl">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#f3eee5] mt-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#f4a261]" />
              {new Date(event.startDate).toLocaleDateString('vi-VN', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#f4a261]" />
              {event.locationName}, {event.city}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Ticket Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Event Details (7 cols) */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1a1917] mb-4">
                Giới Thiệu Trải Nghiệm
              </h2>
              <p className="text-[#575249] leading-relaxed text-base">
                {event.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1a1917] mb-4">
                Điểm Nhấn Sự Kiện
              </h3>
              <div className="space-y-3">
                {event.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#f3eee5] p-3.5 rounded-xl border border-[#dcd4c5]/60">
                    <Sparkles className="w-5 h-5 text-[#9c4826] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#1a1917] font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1a1917] mb-4">
                Lịch Trình Chi Tiết
              </h3>
              <div className="border border-[#dcd4c5] rounded-2xl overflow-hidden divide-y divide-[#dcd4c5] bg-white">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#fcfbf8] transition">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#9c4826] shrink-0" />
                      <span className="font-bold text-xs sm:text-sm text-[#1a1917] w-32">
                        {item.time}
                      </span>
                      <span className="text-sm text-[#575249]">{item.activity}</span>
                    </div>
                    {item.instructor && (
                      <span className="text-xs text-[#9c4826] font-semibold bg-[#9c4826]/10 px-2.5 py-1 rounded-full self-start sm:self-auto">
                        GV: {item.instructor}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructors Lineup */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1a1917] mb-4">
                Huấn Luyện Viên Dẫn Dắt
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.instructors.map((ins) => (
                  <div key={ins.id} className="p-4 rounded-xl bg-[#f3eee5] border border-[#dcd4c5] flex gap-4 items-center">
                    <img
                      src={ins.avatar}
                      alt={ins.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-[#1a1917] text-base">{ins.name}</h4>
                      <p className="text-xs text-[#9c4826] font-medium">{ins.title}</p>
                      <p className="text-[11px] text-[#575249] mt-1 line-clamp-1">{ins.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Ticket Selector Widget (5 cols sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#f3eee5] rounded-3xl p-6 sm:p-8 border border-[#dcd4c5] shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Ticket className="w-5 h-5 text-[#9c4826]" />
                <h3 className="font-serif text-xl font-bold text-[#1a1917]">
                  Chọn Hạng Vé Tham Gia
                </h3>
              </div>

              {/* Tiers Option Cards */}
              <div className="space-y-4 mb-6">
                {event.ticketTiers.map((tier) => {
                  const isSelected = tier.id === selectedTierId;
                  const remaining = tier.quota - tier.sold;

                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'border-[#9c4826] bg-white shadow-md'
                          : 'border-[#dcd4c5] bg-white/60 hover:bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif font-bold text-[#1a1917] text-base">
                            {tier.name}
                          </h4>
                          <span className="text-[11px] text-[#9c4826] font-medium">
                            Chỉ còn {remaining} vé cuối cùng
                          </span>
                        </div>
                        <span className="font-serif font-bold text-lg text-[#9c4826]">
                          {tier.price.toLocaleString('vi-VN')} đ
                        </span>
                      </div>

                      {/* Perks list */}
                      <ul className="mt-3 pt-3 border-t border-[#dcd4c5]/50 space-y-1.5 text-xs text-[#575249]">
                        {tier.perks.map((p, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#1b693e] shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center justify-between py-4 border-t border-[#dcd4c5] mb-6">
                <span className="text-sm font-semibold text-[#1a1917]">Số lượng vé:</span>
                <div className="flex items-center border border-[#dcd4c5] rounded-full bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-1.5 text-sm font-bold text-[#575249] hover:text-[#1a1917]"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-bold text-[#1a1917]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-1.5 text-sm font-bold text-[#575249] hover:text-[#1a1917]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-[#575249]">Tổng thanh toán:</span>
                <span className="font-serif text-2xl font-bold text-[#9c4826]">
                  {((selectedTier?.price || 0) * quantity).toLocaleString('vi-VN')} đ
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={handleBooking}
                className="w-full py-4 px-6 rounded-full bg-[#9c4826] text-white font-semibold text-sm hover:bg-[#873c1d] transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>Thêm Vào Giỏ & Đặt Vé</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {addedMessage && (
                <div className="mt-3 p-2 bg-[#1b693e]/10 text-[#1b693e] text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Đã thêm vé vào giỏ hàng thành công!</span>
                </div>
              )}

              <p className="text-[11px] text-[#575249] text-center mt-4">
                Vé điện tử có mã QR sẽ được gửi tức thì về email sau khi thanh toán.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
