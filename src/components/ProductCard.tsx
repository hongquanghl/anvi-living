import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group bg-[#f3eee5] rounded-xl overflow-hidden border border-[#dcd4c5]/70 hover:border-[#9c4826]/40 transition-all duration-300 flex flex-col justify-between p-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-white mb-4">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.compareAtPrice && (
          <span className="absolute top-2 left-2 bg-[#9c4826] text-white text-[10px] font-bold px-2 py-0.5 rounded">
            Ưu đãi
          </span>
        )}
      </div>

      <div>
        <span className="text-[11px] text-[#575249] uppercase tracking-wider block mb-1">
          {product.category}
        </span>
        <h4 className="font-serif font-bold text-base text-[#1a1917] group-hover:text-[#9c4826] transition line-clamp-2 leading-snug">
          <Link href={`/shop/${product.slug}`}>{product.title}</Link>
        </h4>
        <div className="flex items-center gap-1 mt-1 text-xs text-[#575249]">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="font-semibold text-[#1a1917]">{product.rating}</span>
          <span>({product.reviewsCount})</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#dcd4c5]/60 flex items-center justify-between">
        <div>
          <span className="font-serif font-bold text-[#9c4826] text-base">
            {product.price.toLocaleString('vi-VN')} đ
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-[#575249] line-through ml-2">
              {product.compareAtPrice.toLocaleString('vi-VN')} đ
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onAddToCart && onAddToCart(product)}
          className="p-2 rounded-full bg-white hover:bg-[#9c4826] hover:text-white text-[#1a1917] shadow-sm transition border border-[#dcd4c5]"
          title="Thêm vào giỏ"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
