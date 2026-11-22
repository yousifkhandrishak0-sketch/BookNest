import React, { useState } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2, X } from 'lucide-react';
import {
  FREE_DELIVERY_THRESHOLD,
  useCart,
} from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { formatPKR } from '../utils/format';

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    promoCode,
    promoDiscountAmount,
    shippingFee,
    total,
    applyPromoCode,
    removePromoCode,
  } = useCart();
  const { navigate } = useRouter();

  const [codeInput, setCodeInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  if (!isDrawerOpen) return null;

  const amountRemainingForFreeShipping = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - Math.max(0, subtotal - promoDiscountAmount)
  );

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInput.trim()) return;
    const res = applyPromoCode(codeInput);
    setPromoFeedback(res);
    if (res.success) setCodeInput('');
  };

  const goToCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F1E36]/50 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
      />

      {/* Slide-over Panel */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#E3E7EE] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#E85D22]" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
              Your Reading Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close shopping cart"
            className="rounded-md p-1.5 text-[#526075] hover:bg-[#F8F9FB] hover:text-[#0F1E36] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Free Delivery Progress */}
        {items.length > 0 && (
          <div className="bg-[#F8F9FB] px-6 py-3 border-b border-[#E3E7EE] text-xs">
            {amountRemainingForFreeShipping === 0 ? (
              <p className="font-semibold text-emerald-700">
                You unlocked Free Nationwide Delivery across Pakistan.
              </p>
            ) : (
              <p className="text-[#526075]">
                Add{' '}
                <span className="font-semibold text-[#0F1E36] tabular-nums">
                  {formatPKR(amountRemainingForFreeShipping)}
                </span>{' '}
                more for Free Delivery across Pakistan.
              </p>
            )}
          </div>
        )}

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F8F9FB] text-[#526075]">
                <ShoppingBag className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="font-display text-lg font-semibold text-[#0F1E36]">
                Your cart is currently empty
              </p>
              <p className="mt-1.5 max-w-xs text-sm text-[#526075]">
                Explore our Computer Science, Fiction, Business, and Academic collections to start your next reading adventure.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  navigate('/shop');
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#E85D22] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#CF4E17] transition-colors cursor-pointer"
              >
                Browse Books
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#E3E7EE]">
              {items.map(({ book, quantity }) => (
                <li key={book.id} className="flex gap-4 py-4 first:pt-0">
                  <img
                    src={book.coverImage}
                    alt={book.coverAlt}
                    className="h-24 w-18 rounded object-cover border border-[#E3E7EE] shrink-0 bg-[#F8F9FB]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <a
                          href={`/book/${book.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            closeDrawer();
                            navigate(`/book/${book.slug}`);
                          }}
                          className="text-sm font-semibold text-[#0F1E36] hover:text-[#E85D22] line-clamp-1"
                        >
                          {book.title}
                        </a>
                        <p className="text-xs text-[#526075] truncate">{book.author}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(book.id)}
                        aria-label={`Remove ${book.title} from cart`}
                        className="p-1 text-[#526075] hover:text-rose-600 transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-md border border-[#E3E7EE] bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(book.id, quantity - 1)}
                          aria-label={`Decrease quantity of ${book.title}`}
                          className="p-1.5 text-[#526075] hover:text-[#0F1E36] cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="min-w-7 text-center text-xs font-semibold text-[#0F1E36] tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(book.id, quantity + 1)}
                          aria-label={`Increase quantity of ${book.title}`}
                          className="p-1.5 text-[#526075] hover:text-[#0F1E36] cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <p className="text-sm font-bold text-[#0F1E36] tabular-nums whitespace-nowrap">
                        {formatPKR(book.discountedPrice * quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart Summary & Promo Code */}
        {items.length > 0 && (
          <div className="border-t border-[#E3E7EE] bg-[#F8F9FB] px-6 py-5 space-y-4">
            {!promoCode ? (
              <form onSubmit={handlePromoSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#526075]"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    placeholder="Promo code (e.g. READPK10)"
                    aria-label="Promo code"
                    className="h-9 w-full rounded-md border border-[#E3E7EE] bg-white pl-8 pr-3 text-xs text-[#0F1E36] focus:border-[#0F1E36] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="h-9 rounded-md border border-[#0F1E36] px-3 text-xs font-semibold text-[#0F1E36] hover:bg-[#0F1E36] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-800">
                <span>
                  Promo <strong>{promoCode}</strong> active
                </span>
                <button
                  type="button"
                  onClick={() => {
                    removePromoCode();
                    setPromoFeedback(null);
                  }}
                  className="font-semibold underline hover:text-emerald-950 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {promoFeedback && !promoCode && (
              <p
                className={`text-xs ${
                  promoFeedback.success ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                {promoFeedback.message}
              </p>
            )}

            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#526075]">
                <dt>Subtotal</dt>
                <dd className="font-medium text-[#0F1E36] tabular-nums">
                  {formatPKR(subtotal)}
                </dd>
              </div>
              {promoDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <dt>Promo Discount</dt>
                  <dd className="font-medium tabular-nums">
                    -{formatPKR(promoDiscountAmount)}
                  </dd>
                </div>
              )}
              <div className="flex justify-between text-[#526075]">
                <dt>Delivery (Pakistan)</dt>
                <dd className="font-medium text-[#0F1E36] tabular-nums">
                  {shippingFee === 0 ? 'Free' : formatPKR(shippingFee)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-[#E3E7EE] pt-2.5 text-base font-bold text-[#0F1E36]">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatPKR(total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={goToCheckout}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#E85D22] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#CF4E17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D22] cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
