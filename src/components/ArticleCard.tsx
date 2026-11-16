import React from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group flex flex-col bg-[#f3eee5] rounded-xl overflow-hidden border border-[#dcd4c5]/70 hover:border-[#9c4826]/40 transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-[#fcfbf8]/90 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-[#9c4826]">
          {article.category}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#575249] mb-2">
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#9c4826]" />
              {article.readTimeMinutes} phút đọc
            </span>
          </div>
          <h4 className="font-serif font-bold text-lg text-[#1a1917] group-hover:text-[#9c4826] transition-colors leading-snug">
            <Link href={`/journal/${article.slug}`}>{article.title}</Link>
          </h4>
          <p className="text-xs text-[#575249] mt-2 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
        <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-[#dcd4c5]/60">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs text-[#575249]">{article.author.name}</span>
        </div>
      </div>
    </article>
  );
}
