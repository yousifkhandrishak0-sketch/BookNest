import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Info, Lock, Printer, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { DemoOrder } from '../types/bookstore';
import { applyPageSeo } from '../utils/seo';
import { formatPKR } from '../utils/format';
import { Breadcrumbs } from '../components/Breadcrumbs';

const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
];

export function CheckoutPage() {
  const {
    items,
    subtotal,
    promoCode,
    promoDiscountAmount,
    shippingFee,
    total,
    saveDemoOrder,
    lastOrder,
  } = useCart();
  const { navigate } = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'bank'>('cod');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<DemoOrder | null>(null);

  useEffect(() => {
    applyPageSeo({
      title: 'Checkout – BookNest Online Book Store Pakistan',
      description:
        'Complete your BookNest front-end demo order in Pakistani Rupees (PKR) with Cash on Delivery across Pakistan.',
      canonicalPath: '/checkout',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Checkout', path: '/checkout' },
      ],
    });
  }, []);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('Please fill in all required delivery fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const orderNum = `BN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: DemoOrder = {
      orderNumber: orderNum,
      createdAt: new Date().toLocaleString('en-PK'),
      customerName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city,
      address: address.trim(),
      postalCode: postalCode.trim() || '54000',
      paymentMethod,
      items: items.map((i) => ({
        id: i.book.id,
        title: i.book.title,
        author: i.book.author,
        quantity: i.quantity,
        unitPrice: i.book.discountedPrice,
      })),
      subtotal,
      discountAmount: promoDiscountAmount,
      shippingFee,
      total,
      promoCode: promoCode || undefined,
    };

    setErrorMsg(null);
    saveDemoOrder(newOrder);
    setConfirmedOrder(newOrder);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show Order Confirmation Receipt
  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="rounded-xl border border-[#E3E7EE] bg-white p-8 sm:p-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Front-End E-Commerce Demo Confirmation
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F1E36] mt-1">
                Order #{confirmedOrder.orderNumber} Confirmed
              </h1>
              <p className="mt-1.5 text-sm text-[#526075]">
                Thank you, <strong>{confirmedOrder.customerName}</strong>. Your simulated order has been saved locally for demonstration. No real payment or courier dispatch occurs in this academic demo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg bg-[#F8F9FB] border border-[#E3E7EE] p-5 text-sm">
            <div>
              <p className="text-xs font-semibold text-[#526075] uppercase">Delivery Details</p>
              <p className="mt-1 font-semibold text-[#0F1E36]">{confirmedOrder.customerName}</p>
              <p className="text-[#526075]">{confirmedOrder.address}</p>
              <p className="text-[#526075]">
                {confirmedOrder.city}, {confirmedOrder.postalCode}
              </p>
              <p className="text-[#526075] tabular-nums">{confirmedOrder.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#526075] uppercase">Order Info</p>
              <p className="mt-1 text-[#0F1E36]">
                <strong>Placed:</strong> {confirmedOrder.createdAt}
              </p>
              <p className="text-[#0F1E36]">
                <strong>Payment:</strong>{' '}
                {confirmedOrder.paymentMethod === 'cod'
                  ? 'Cash on Delivery (PKR)'
                  : confirmedOrder.paymentMethod.toUpperCase()}
              </p>
              <p className="text-[#0F1E36]">
                <strong>Email:</strong> {confirmedOrder.email}
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-[#0F1E36] mb-3">
              Itemized Receipt
            </h2>
            <ul className="divide-y divide-[#E3E7EE] border-y border-[#E3E7EE] text-sm">
              {confirmedOrder.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-3 gap-4">
                  <div>
                    <p className="font-semibold text-[#0F1E36]">{item.title}</p>
                    <p className="text-xs text-[#526075]">
                      {item.author} · Qty {item.quantity} × {formatPKR(item.unitPrice)}
                    </p>
                  </div>
                  <p className="font-semibold text-[#0F1E36] tabular-nums whitespace-nowrap">
                    {formatPKR(item.unitPrice * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-[#526075]">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{formatPKR(confirmedOrder.subtotal)}</dd>
              </div>
              {confirmedOrder.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <dt>Promo Discount ({confirmedOrder.promoCode})</dt>
                  <dd className="tabular-nums">-{formatPKR(confirmedOrder.discountAmount)}</dd>
                </div>
              )}
              <div className="flex justify-between text-[#526075]">
                <dt>Delivery Fee</dt>
                <dd className="tabular-nums">
                  {confirmedOrder.shippingFee === 0 ? 'Free' : formatPKR(confirmedOrder.shippingFee)}
                </dd>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E3E7EE] text-base font-bold text-[#0F1E36]">
                <dt>Total Payable</dt>
                <dd className="tabular-nums">{formatPKR(confirmedOrder.total)}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-md border border-[#E3E7EE] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F1E36] hover:bg-[#F8F9FB] cursor-pointer"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              <span>Print Receipt</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 rounded-md bg-[#E85D22] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#CF4E17] cursor-pointer"
            >
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart Guard
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white border border-[#E3E7EE] text-[#526075]">
          <ShoppingBag className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="font-display text-2xl font-bold text-[#0F1E36]">
          Your checkout bag is empty
        </h1>
        <p className="text-sm text-[#526075]">
          Add books from our catalog before proceeding to demo checkout.
        </p>
        {lastOrder && (
          <p className="text-xs text-[#526075]">
            Last demo order placed: <strong>#{lastOrder.orderNumber}</strong> ({formatPKR(lastOrder.total)})
          </p>
        )}
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#E85D22] px-6 py-3 text-sm font-semibold text-white hover:bg-[#CF4E17] cursor-pointer"
        >
          Browse Books
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Checkout Demo' }]} />

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#0F1E36]">Checkout</h1>
          <p className="mt-1 text-sm text-[#526075]">
            Complete your BookNest order in PKR with nationwide Pakistan delivery.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F1E36] hover:text-[#E85D22] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Explicit Front-End Demo Notice */}
      <div className="mb-8 flex items-start gap-3 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-950">
        <Info className="h-5 w-5 text-sky-700 shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <strong>Front-End E-Commerce Demo:</strong> This checkout simulates a complete Pakistani online bookstore order workflow using browser Local Storage. No real payment is processed and no physical shipment is dispatched.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form */}
        <form
          onSubmit={handlePlaceOrder}
          noValidate
          className="lg:col-span-7 rounded-lg border border-[#E3E7EE] bg-white p-6 sm:p-8 space-y-6"
        >
          <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
            1. Shipping Information (Pakistan)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="co-name" className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                Full Name *
              </label>
              <input
                id="co-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Muhammad Ali"
                className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="co-phone" className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                Mobile Number *
              </label>
              <input
                id="co-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0300-1234567"
                className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="co-email" className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                Email Address *
              </label>
              <input
                id="co-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@domain.pk"
                className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="co-city" className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                City *
              </label>
              <select
                id="co-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
              >
                {PAKISTAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="co-address" className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                Street Address *
              </label>
              <input
                id="co-address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House 14, Street 6, Gulberg III"
                className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="co-postal" className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                Postal Code
              </label>
              <input
                id="co-postal"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="54660"
                className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E3E7EE] space-y-3">
            <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
              2. Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'cod', label: 'Cash on Delivery (COD)', sub: 'Pay courier in PKR upon arrival' },
                { id: 'jazzcash', label: 'JazzCash Wallet (Demo)', sub: 'Simulated mobile wallet option' },
                { id: 'easypaisa', label: 'Easypaisa (Demo)', sub: 'Simulated mobile wallet option' },
                { id: 'bank', label: 'IBFT Bank Transfer (Demo)', sub: 'Simulated Pakistani bank transfer' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 rounded-md border p-3.5 cursor-pointer transition-colors ${
                    paymentMethod === opt.id
                      ? 'border-[#E85D22] bg-[#E85D22]/5'
                      : 'border-[#E3E7EE] bg-[#F8F9FB] hover:bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === opt.id}
                    onChange={() =>
                      setPaymentMethod(opt.id as 'cod' | 'jazzcash' | 'easypaisa' | 'bank')
                    }
                    className="mt-1 accent-[#E85D22]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#0F1E36]">{opt.label}</p>
                    <p className="text-xs text-[#526075]">{opt.sub}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {errorMsg && (
            <p className="text-sm font-medium text-rose-600" role="alert">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-md bg-[#E85D22] px-6 text-sm font-semibold text-white hover:bg-[#CF4E17] transition-colors cursor-pointer"
          >
            <Lock className="h-4 w-4" aria-hidden="true" />
            <span>Place Demo Order ({formatPKR(total)})</span>
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-5 rounded-lg border border-[#E3E7EE] bg-white p-6 space-y-5">
          <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
            Order Summary
          </h2>

          <ul className="divide-y divide-[#E3E7EE]">
            {items.map(({ book, quantity }) => (
              <li key={book.id} className="flex items-center gap-3 py-3 first:pt-0">
                <img
                  src={book.coverImage}
                  alt={book.coverAlt}
                  className="h-16 w-12 rounded object-cover border border-[#E3E7EE] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#0F1E36] truncate">{book.title}</p>
                  <p className="text-xs text-[#526075] tabular-nums">
                    Qty {quantity} × {formatPKR(book.discountedPrice)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#0F1E36] tabular-nums whitespace-nowrap">
                  {formatPKR(book.discountedPrice * quantity)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="space-y-2 border-t border-[#E3E7EE] pt-4 text-sm">
            <div className="flex justify-between text-[#526075]">
              <dt>Subtotal</dt>
              <dd className="font-medium text-[#0F1E36] tabular-nums">{formatPKR(subtotal)}</dd>
            </div>
            {promoDiscountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <dt>Promo ({promoCode})</dt>
                <dd className="font-medium tabular-nums">-{formatPKR(promoDiscountAmount)}</dd>
              </div>
            )}
            <div className="flex justify-between text-[#526075]">
              <dt>Nationwide Delivery</dt>
              <dd className="font-medium text-[#0F1E36] tabular-nums">
                {shippingFee === 0 ? 'Free' : formatPKR(shippingFee)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-[#E3E7EE] pt-3 text-base font-bold text-[#0F1E36]">
              <dt>Total (PKR)</dt>
              <dd className="tabular-nums">{formatPKR(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
