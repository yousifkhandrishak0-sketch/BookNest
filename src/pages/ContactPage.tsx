import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Info, Mail, MapPin, Phone } from 'lucide-react';
import { applyPageSeo } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedPreview, setSubmittedPreview] = useState<{
    fullName: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    applyPageSeo({
      title: 'Contact BookNest | Online Book Store Support Pakistan',
      description:
        'Contact BookNest Pakistan for book inquiries, university bulk orders, and customer support in Lahore, Karachi, and Islamabad.',
      canonicalPath: '/contact',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ],
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please complete all four required contact form fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 10) {
      setErrorMsg('Please provide a brief message (at least 10 characters).');
      return;
    }

    setErrorMsg(null);
    setSubmittedPreview({
      fullName: fullName.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
    setFullName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Contact Us' }]} />

      <div className="max-w-2xl mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E85D22]">
          Reader Support & University Orders
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F1E36] mt-1">
          Contact BookNest
        </h1>
        <p className="mt-2.5 text-base text-[#526075]">
          Have a question about an edition, bulk academic order, or Cash on Delivery across Pakistan? Reach our team below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 rounded-lg border border-[#E3E7EE] bg-white p-6 sm:p-8 space-y-5">
          <div className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-950">
            <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Front-End Demo Notice:</strong> No live email server is connected in this Digital Marketing project. Submitting validates your message locally and lets you review or open it in your mail app.
            </p>
          </div>

          {submittedPreview && (
            <div
              role="status"
              className="rounded-md border border-emerald-200 bg-emerald-50 p-4 space-y-2 text-sm text-emerald-950"
            >
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                <span>Form validated in front-end demo</span>
              </div>
              <p className="text-xs text-emerald-900">
                Ready for <strong>{submittedPreview.subject}</strong> from{' '}
                {submittedPreview.fullName} ({submittedPreview.email}). Because no backend mail server is configured, no automated email was transmitted.
              </p>
              <a
                href={`mailto:support@booknest.pk?subject=${encodeURIComponent(
                  submittedPreview.subject
                )}&body=${encodeURIComponent(
                  `Name: ${submittedPreview.fullName}\nEmail: ${submittedPreview.email}\n\n${submittedPreview.message}`
                )}`}
                className="inline-block text-xs font-semibold text-[#0F1E36] underline hover:text-[#E85D22]"
              >
                Open this message in your email client
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="ct-name"
                  className="block text-xs font-semibold text-[#0F1E36] mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="ct-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Sara Ahmed"
                  className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="ct-email"
                  className="block text-xs font-semibold text-[#0F1E36] mb-1.5"
                >
                  Email Address *
                </label>
                <input
                  id="ct-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sara@university.edu.pk"
                  className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="ct-subject"
                className="block text-xs font-semibold text-[#0F1E36] mb-1.5"
              >
                Subject *
              </label>
              <input
                id="ct-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="University bulk order inquiry / Book request"
                className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="ct-message"
                className="block text-xs font-semibold text-[#0F1E36] mb-1.5"
              >
                Message *
              </label>
              <textarea
                id="ct-message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us which books or editions you are looking for..."
                className="w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] p-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
              />
            </div>

            {errorMsg && (
              <p className="text-sm font-medium text-rose-600" role="alert">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-[#E85D22] px-6 py-3 text-sm font-semibold text-white hover:bg-[#CF4E17] transition-colors cursor-pointer"
            >
              Validate & Prepare Message
            </button>
          </form>
        </div>

        {/* Contact Information Sidebar */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="rounded-lg border border-[#E3E7EE] bg-white p-6 space-y-5">
            <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
              Store & Support Details
            </h2>
            <ul className="space-y-4 text-sm text-[#526075]">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#E85D22] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#0F1E36]">BookNest Fulfillment Hub</p>
                  <p>Office 12, Al-Hafeez Center, Gulberg III, Lahore, Pakistan</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#E85D22] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#0F1E36]">Customer Support Helpline</p>
                  <p className="tabular-nums">+92 42 3578 4920</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#E85D22] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#0F1E36]">Email</p>
                  <p>support@booknest.pk</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#E85D22] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#0F1E36]">Support Hours</p>
                  <p>Monday – Saturday, 9:30 AM – 7:00 PM PKT</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-[#E3E7EE] bg-[#0F1E36] text-white p-6 space-y-3">
            <h3 className="font-display text-lg font-semibold text-white">
              Connect With BookNest
            </h3>
            <p className="text-sm text-slate-300">
              Follow our latest book reviews, reading challenges, and semester textbook bundles across Pakistan.
            </p>
            <div className="flex flex-wrap gap-3 pt-1 text-xs font-semibold">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-white/20 px-3 py-1.5 hover:border-[#E85D22] hover:text-[#F69469] transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-white/20 px-3 py-1.5 hover:border-[#E85D22] hover:text-[#F69469] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-white/20 px-3 py-1.5 hover:border-[#E85D22] hover:text-[#F69469] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
