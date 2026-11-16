'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Star,
  ShoppingBag,
  ChevronLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ArrowRight,
} from 'lucide-react';
import { PRODUCTS } from '@/data/seed';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      image: product.images[0],
      type: 'product',
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <div className="pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#f3eee5] border-b border-[#dcd4c5]/70 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#575249]">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 hover:text-[#9c4826] font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại ANVI Shop</span>
          </Link>
          <span className="text-xs text-[#575249]">{product.category}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Product Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-[#dcd4c5] shadow-sm">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info & Purchase (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9c4826] block mb-2">
                {product.category}
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1a1917] leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 text-xs text-[#575249]">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#1a1917]">{product.rating}</span>
                <span>({product.reviewsCount} đánh giá từ khách hàng)</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 py-4 border-y border-[#dcd4c5]">
              <span className="font-serif text-3xl font-bold text-[#9c4826]">
                {product.price.toLocaleString('vi-VN')} đ
              </span>
              {product.compareAtPrice && (
                <span className="text-base text-[#575249] line-through">
                  {product.compareAtPrice.toLocaleString('vi-VN')} đ
                </span>
              )}
              <span className="text-xs font-semibold px-2.5 py-1 bg-[#1b693e]/10 text-[#1b693e] rounded-full">
                Còn hàng trong kho
              </span>
            </div>

            <p className="text-sm text-[#575249] leading-relaxed">
              {product.description}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-[#1a1917]">Số lượng:</span>
                <div className="flex items-center border border-[#dcd4c5] rounded-full bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-sm font-bold text-[#575249] hover:text-[#1a1917]"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-bold text-[#1a1917]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-sm font-bold text-[#575249] hover:text-[#1a1917]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-8 rounded-full bg-[#9c4826] text-white font-bold text-sm hover:bg-[#873c1d] transition shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm Vào Giỏ Hàng</span>
                </button>
              </div>

              {isAdded && (
                <div className="p-3 rounded-xl bg-[#1b693e]/10 text-[#1b693e] text-xs font-bold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Đã thêm vào giỏ hàng thành công!</span>
                </div>
              )}
            </div>

            {/* Shipping & Assurance Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#dcd4c5] text-xs text-[#575249]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#9c4826] shrink-0" />
                <span>Giao hàng toàn quốc 2-4 ngày</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-5 h-5 text-[#9c4826] shrink-0" />
                <span>Đổi trả miễn phí 7 ngày</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#9c4826] shrink-0" />
                <span>100% chính hãng tự nhiên</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
