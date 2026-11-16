import React from 'react';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight, Users } from 'lucide-react';
import { EventItem } from '@/types';

interface EventCardProps {
  event: EventItem;
  featured?: boolean;
}

export default function EventCard({ event, featured = false }: EventCardProps) {
  const lowestPrice = Math.min(...event.ticketTiers.map((t) => t.price));

  return (
    <div className={`group bg-[#f3eee5] rounded-2xl overflow-hidden border border-[#dcd4c5]/80 hover:border-[#9c4826]/50 transition-all duration-300 hover:shadow-xl flex flex-col ${featured ? 'md:grid md:grid-cols-12' : ''}`}>
      {/* Cover Image */}
      <div className={`relative overflow-hidden ${featured ? 'md:col-span-7 h-72 md:h-full' : 'h-64'}`}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-[#fcfbf8]/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-[#9c4826] tracking-wide uppercase border border-[#dcd4c5]">
          {event.categoryLabel}
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 sm:p-8 flex flex-col justify-between flex-1 ${featured ? 'md:col-span-5' : ''}`}>
        <div>
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#575249] mb-3">
            <span className="flex items-center gap-1 font-medium text-[#1a1917]">
              <Calendar className="w-3.5 h-3.5 text-[#9c4826]" />
              {new Date(event.startDate).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#9c4826]" />
              {event.city}
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1a1917] group-hover:text-[#9c4826] transition-colors leading-snug">
            <Link href={`/events/${event.slug}`}>{event.title}</Link>
          </h3>

          <p className="text-sm text-[#575249] mt-3 line-clamp-2 leading-relaxed">
            {event.subtitle || event.description}
          </p>

          {/* Lineup Instructors */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#dcd4c5]/60">
            <div className="flex -space-x-2">
              {event.instructors.map((ins) => (
                <img
                  key={ins.id}
                  src={ins.avatar}
                  alt={ins.name}
                  className="w-7 h-7 rounded-full border-2 border-[#f3eee5] object-cover"
                  title={ins.name}
                />
              ))}
            </div>
            <span className="text-xs text-[#575249]">
              Cùng {event.instructors.map((i) => i.name).join(', ')}
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-6 pt-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#575249] block">Giá vé từ</span>
            <span className="font-serif text-lg font-bold text-[#9c4826]">
              {lowestPrice.toLocaleString('vi-VN')} đ
            </span>
          </div>
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9c4826] text-white text-xs font-semibold hover:bg-[#873c1d] transition shadow"
          >
            <span>Đặt Vé Ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
