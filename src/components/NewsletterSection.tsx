import React, { useState } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValid) {
      setStatus('error');
      setMessage('Please enter a valid email address (for example, reader@domain.pk).');
      return;
    }

    try {
      const saved = JSON.parse(localStorage.getItem('booknest_newsletter_v1') || '[]');
      if (Array.isArray(saved) && !saved.includes(trimmed)) {
        localStorage.setItem('booknest_newsletter_v1', JSON.stringify([...saved, trimmed]));
      }
    } catch {
      // Ignore storage error
    }

    setStatus('success');
    setMessage(
      `Subscribed (${trimmed}) in this front-end demo. Use code READPK10 at checkout for 10% off.`
    );
    setEmail('');
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-[#0F1E36] text-white py-16 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-3">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#F69469]">
            BookNest Readers Dispatch
          </p>
          <h2
            id="newsletter-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-white"
          >
            Weekly book drops, PKR bundle deals, and reading guides
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Join university students, engineers, and avid readers across Pakistan receiving curated new arrivals and subscriber-only promo codes.
          </p>
        </div>

        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="relative flex-1">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  required
                  className="h-12 w-full rounded-md border border-white/20 bg-white/10 pl-10 pr-4 text-sm text-white placeholder:text-slate-300 focus:border-[#E85D22] focus:bg-[#132645] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="h-12 rounded-md bg-[#E85D22] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#CF4E17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-rose-300" role="alert">
                {message}
              </p>
            )}
            {status === 'success' && (
              <p className="flex items-start gap-2 text-xs text-emerald-300" role="status">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{message}</span>
              </p>
            )}
            <p className="text-xs text-slate-400">
              No spam. Unsubscribe anytime. Demo email subscription stored locally in browser.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
