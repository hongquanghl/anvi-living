'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, ChevronLeft, Share2, Bookmark, ArrowRight } from 'lucide-react';
import { ARTICLES } from '@/data/seed';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];
  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id);

  return (
    <div className="pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#f3eee5] border-b border-[#dcd4c5]/70 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#575249]">
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 hover:text-[#9c4826] font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại ANVI Journal</span>
          </Link>
          <button
            onClick={() => alert('Đã sao chép liên kết bài viết!')}
            className="p-1.5 rounded-full hover:bg-white text-[#575249] transition"
            title="Chia sẻ"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Meta Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full bg-[#9c4826]/10 text-[#9c4826] text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {article.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1a1917] leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-[#575249]">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="font-semibold text-[#1a1917]">{article.author.name}</span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#9c4826]" />
              {article.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#9c4826]" />
              {article.readTimeMinutes} phút đọc
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-lg border border-[#dcd4c5]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="prose prose-lg max-w-none text-[#1a1917] space-y-6 text-base sm:text-lg leading-relaxed">
          <p className="font-serif text-xl sm:text-2xl italic text-[#575249] border-l-4 border-[#9c4826] pl-6 my-8">
            {article.excerpt}
          </p>

          <p>
            {article.content}
          </p>

          <p>
            Khi chúng ta dành thời gian để dừng lại, quan sát từng nhịp hít vào và thở ra, cơ thể sẽ tự động gửi tín hiệu đến hạch hạnh nhân (amygdala) để giảm sản sinh cortisol — hormone gây stress. Đó chính là chìa khóa vàng giúp bạn hồi phục năng lượng tự nhiên.
          </p>

          <p>
            Tại ANVI Living, chúng tôi tin rằng chánh niệm không phải là điều gì đó xa vời hay tách biệt khỏi đời sống thường nhật. Nó bắt đầu ngay từ cách bạn thưởng thức một tách trà buổi sớm, cách bạn bước những bước chân vững chãi trên mặt đất, hay cách bạn lắng nghe một người đối diện mà không vội phán xét.
          </p>
        </div>

        {/* Author Bio Footer */}
        <div className="mt-14 pt-8 border-t border-[#dcd4c5] bg-[#f3eee5] rounded-3xl p-6 sm:p-8 flex items-center gap-5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
          />
          <div>
            <h4 className="font-serif font-bold text-lg text-[#1a1917]">
              Tác giả: {article.author.name}
            </h4>
            <p className="text-xs text-[#9c4826] font-medium">{article.author.role}</p>
            <p className="text-xs text-[#575249] mt-1">
              Đồng hành cùng cộng đồng ANVI Living lan tỏa nguồn cảm hứng sống an nhiên và phục hồi sức khỏe tự nhiên.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#dcd4c5]">
            <h3 className="font-serif font-bold text-2xl text-[#1a1917] mb-6">
              Bài Viết Cùng Chủ Đề
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/journal/${rel.slug}`}
                  className="group bg-[#f3eee5] rounded-2xl p-4 border border-[#dcd4c5] hover:border-[#9c4826] transition flex gap-4 items-center"
                >
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9c4826] block">
                      {rel.category}
                    </span>
                    <h5 className="font-serif font-bold text-sm text-[#1a1917] group-hover:text-[#9c4826] transition line-clamp-2 mt-0.5">
                      {rel.title}
                    </h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
