'use client';

import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export interface CartItem {
  id: string;
  title: string;
  variantName?: string;
  price: number;
  quantity: number;
  image?: string;
  type: 'ticket' | 'product';
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQty,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcfbf8] shadow-2xl flex flex-col justify-between border-l border-[#dcd4c5]">
          {/* Header */}
          <div className="p-6 border-b border-[#dcd4c5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9c4826]" />
              <h3 className="font-serif text-xl font-bold text-[#1a1917]">
                Túi Của Bạn ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#f3eee5] text-[#575249] hover:text-[#1a1917] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="p-6 overflow-y-auto flex-1 divide-y divide-[#dcd4c5]/60">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-[#dcd4c5] mx-auto mb-3" />
                <p className="font-serif text-lg font-bold text-[#1a1917]">Túi đồ đang trống</p>
                <p className="text-xs text-[#575249] mt-1 max-w-xs mx-auto">
                  Hãy khám phá các lễ hội sắp tới hoặc chọn mua thảm tập và dụng cụ để bắt đầu hành trình.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover bg-white border border-[#dcd4c5]"
                    />
                  )}
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9c4826]">
                      {item.type === 'ticket' ? 'Vé Lễ Hội' : 'Sản Phẩm'}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#1a1917] leading-tight">
                      {item.title}
                    </h4>
                    {item.variantName && (
                      <p className="text-xs text-[#575249] mt-0.5">{item.variantName}</p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-[#dcd4c5] rounded-full bg-white">
                        <button
                          onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2.5 py-0.5 text-xs text-[#575249] hover:text-[#1a1917]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs text-[#575249] hover:text-[#1a1917]"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#9c4826]">
                        {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#575249] hover:text-[#b82b2b] p-1"
                    title="Xóa món này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#dcd4c5] bg-[#f3eee5]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-[#575249]">Tổng thanh toán:</span>
                <span className="font-serif text-2xl font-bold text-[#9c4826]">
                  {totalAmount.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <button
                onClick={() => alert('Chức năng đang kết nối cổng thanh toán trực tuyến!')}
                className="w-full py-3.5 px-6 rounded-full bg-[#9c4826] text-white text-sm font-semibold hover:bg-[#873c1d] transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Tiến Hành Đặt Hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-[#575249] text-center mt-2.5">
                Bảo mật thanh toán 100% • Hỗ trợ hoàn vé trước 7 ngày
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
