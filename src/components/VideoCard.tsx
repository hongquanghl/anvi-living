import React from 'react';
import Link from 'next/link';
import { Play, Clock, Lock, Sparkles } from 'lucide-react';
import { ClassVideo } from '@/types';

interface VideoCardProps {
  video: ClassVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group bg-[#f3eee5] rounded-xl overflow-hidden border border-[#dcd4c5]/70 hover:border-[#9c4826]/40 transition-all duration-300 hover:shadow-md flex flex-col">
      {/* Thumbnail with overlay */}
      <div className="relative aspect-video overflow-hidden bg-black/10">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#9c4826] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-[#fcfbf8]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-[#1a1917]">
            {video.style}
          </span>
          {video.isPremium ? (
            <span className="bg-[#9c4826] text-white px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Hội viên</span>
            </span>
          ) : (
            <span className="bg-[#1b693e] text-white px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Miễn phí</span>
            </span>
          )}
        </div>

        <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-sm">
          <Clock className="w-3 h-3" />
          <span>{video.durationMinutes} phút</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] text-[#575249] font-medium uppercase tracking-wider block mb-1">
            {video.level}
          </span>
          <h4 className="font-serif font-bold text-[#1a1917] group-hover:text-[#9c4826] transition-colors line-clamp-2 text-base leading-snug">
            <Link href={`/tv/${video.slug}`}>{video.title}</Link>
          </h4>
        </div>

        <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-[#dcd4c5]/60">
          <img
            src={video.instructor.avatar}
            alt={video.instructor.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs text-[#575249]">{video.instructor.name}</span>
        </div>
      </div>
    </div>
  );
}
