import React, { useEffect, useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { BOOKS, getBookBySlug } from '../data/books';
import { Review } from '../types/bookstore';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { applyPageSeo } from '../utils/seo';
import { calculateSavings, computeAverageRating, formatPKR } from '../utils/format';
import { BookCoverImage } from '../components/BookCoverImage';
import { BookCard } from '../components/BookCard';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function BookDetailsPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const { addToCart } = useCart();

  const baseBook = useMemo(() => getBookBySlug(slug), [slug]);
  const [quantity, setQuantity] = useState(1);

  const [extraReviews, setExtraReviews] = useState<Review[]>([]);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewStatus, setReviewStatus] = useState<string | null>(null);

  useEffect(() => {
    setQuantity(1);
    setReviewStatus(null);
    if (baseBook) {
      try {
        const stored = JSON.parse(
          localStorage.getItem(`booknest_reviews_${baseBook.id}`) || '[]'
        );
        setExtraReviews(Array.isArray(stored) ? stored : []);
      } catch {
        setExtraReviews([]);
      }
    }
  }, [baseBook]);

  const book = useMemo(() => {
    if (!baseBook) return undefined;
    return {
      ...baseBook,
      reviews: [...extraReviews, ...baseBook.reviews],
    };
  }, [baseBook, extraReviews]);

  useEffect(() => {
    if (!book) {
      applyPageSeo({
        title: 'Book Not Found | BookNest Pakistan',
        description: 'The requested book could not be found. Browse our full online bookstore catalog in Pakistan.',
        canonicalPath: `/book/${slug}`,
      });
      return;
    }

    applyPageSeo({
      title: `${book.title} by ${book.author} | Buy Online – BookNest`,
      description: book.seoDescription,
      canonicalPath: `/book/${book.slug}`,
      ogType: 'product',
      ogImage: book.coverImage,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: book.categoryName, path: `/category/${book.category}` },
        { name: book.title, path: `/book/${book.slug}` },
      ],
      productBook: book,
    });
  }, [book, slug]);

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-[#0F1E36]">Book Not Found</h1>
        <p className="mt-3 text-sm text-[#526075]">
          We couldn’t locate that title in our current catalog. Explore all available editions in our shop.
        </p>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="mt-6 rounded-md bg-[#E85D22] px-6 py-3 text-sm font-semibold text-white hover:bg-[#CF4E17] cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const { average, count } = computeAverageRating(book);
  const savings = calculateSavings(book.originalPrice, book.discountedPrice);
  const relatedBooks = BOOKS.filter(
    (b) => b.id !== book.id && (b.category === book.category || b.isBestSeller)
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(book, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      setReviewStatus('Please enter your name and review comment.');
      return;
    }
    const newReview: Review = {
      id: `rev-user-${Date.now()}`,
      reviewerName: reviewerName.trim(),
      city: reviewerCity.trim() || 'Pakistan',
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment.trim(),
      verifiedPurchase: false,
    };
    const updated = [newReview, ...extraReviews];
    setExtraReviews(updated);
    try {
      localStorage.setItem(`booknest_reviews_${book.id}`, JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }
    setReviewerName('');
    setReviewerCity('');
    setReviewRating(5);
    setReviewComment('');
    setReviewStatus('Thank you! Your review has been added to this product page.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: book.categoryName, path: `/category/${book.category}` },
          { label: book.title },
        ]}
      />

      {/* Contiguous Purchase Module (Left Sticky Cover + Right Purchase Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Book Cover Gallery */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-xl border border-[#E3E7EE] bg-white p-4">
            <BookCoverImage
              src={book.coverImage}
              alt={book.coverAlt}
              title={book.title}
              author={book.author}
              lazy={false}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Purchase Details & Specifications */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#526075]">
              <a
                href={`/category/${book.category}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/category/${book.category}`);
                }}
                className="text-[#E85D22] font-semibold hover:underline"
              >
                {book.categoryName}
              </a>
              <span aria-hidden="true">·</span>
              <span>{book.binding}</span>
              <span aria-hidden="true">·</span>
              <span>{book.edition}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F1E36] mt-2 leading-tight">
              {book.title}
            </h1>
            {book.subtitle && (
              <p className="mt-1.5 text-lg text-[#526075]">{book.subtitle}</p>
            )}
            <p className="mt-2 text-sm text-[#526075]">
              By <strong className="text-[#0F1E36] font-semibold">{book.author}</strong>
            </p>

            {/* Rating Summary */}
            <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5 text-[#E85D22]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(average) ? 'fill-current' : 'text-slate-300'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="font-semibold text-[#0F1E36] tabular-nums">
                {average.toFixed(1)}
              </span>
              <span className="text-[#526075] tabular-nums">
                ({count} verified reader {count === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="rounded-lg border border-[#E3E7EE] bg-white p-6 space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#0F1E36] tabular-nums">
                  {formatPKR(book.discountedPrice)}
                </span>
                {book.originalPrice > book.discountedPrice && (
                  <span className="text-base text-[#526075] line-through tabular-nums">
                    {formatPKR(book.originalPrice)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                  Save {formatPKR(savings)} ({book.discountPercentage}% OFF)
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#526075]">
              <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                <Check className="h-4 w-4" aria-hidden="true" />
                In Stock · Ready to Dispatch
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-[#E85D22]" aria-hidden="true" />
                2–4 Days Delivery Across Pakistan
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#E85D22]" aria-hidden="true" />
                Cash on Delivery Eligible
              </span>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <div className="inline-flex items-center justify-between rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-2 h-12 sm:w-32">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2 text-[#526075] hover:text-[#0F1E36] cursor-pointer"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="text-sm font-bold text-[#0F1E36] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(25, q + 1))}
                  aria-label="Increase quantity"
                  className="p-2 text-[#526075] hover:text-[#0F1E36] cursor-pointer"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(book, quantity)}
                className="flex-1 h-12 inline-flex items-center justify-center gap-2 rounded-md bg-[#E85D22] px-6 text-sm font-semibold text-white hover:bg-[#CF4E17] transition-colors whitespace-nowrap cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="h-12 inline-flex items-center justify-center rounded-md bg-[#0F1E36] px-6 text-sm font-semibold text-white hover:bg-[#1A2F52] transition-colors whitespace-nowrap cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Synopsis & Key Takeaways */}
          <div className="space-y-4 pt-2">
            <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
              Book Overview
            </h2>
            <p className="text-base text-[#526075] leading-relaxed">{book.description}</p>
            <ul className="space-y-2 pt-1">
              {book.highlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#0F1E36]">
                  <CheckCircle2
                    className="h-4 w-4 text-[#E85D22] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Book Metadata Table */}
          <div className="pt-4 border-t border-[#E3E7EE]">
            <h2 className="font-display text-xl font-semibold text-[#0F1E36] mb-4">
              Edition Specifications
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-lg border border-[#E3E7EE] bg-white p-5 text-sm">
              <div>
                <dt className="text-xs text-[#526075]">ISBN-13</dt>
                <dd className="mt-0.5 font-semibold text-[#0F1E36] tabular-nums">
                  {book.isbn}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#526075]">Publisher</dt>
                <dd className="mt-0.5 font-semibold text-[#0F1E36]">{book.publisher}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#526075]">Pages</dt>
                <dd className="mt-0.5 font-semibold text-[#0F1E36] tabular-nums">
                  {book.pages} pages
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#526075]">Binding</dt>
                <dd className="mt-0.5 font-semibold text-[#0F1E36]">{book.binding}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#526075]">Language</dt>
                <dd className="mt-0.5 font-semibold text-[#0F1E36]">{book.language}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#526075]">Edition</dt>
                <dd className="mt-0.5 font-semibold text-[#0F1E36]">{book.edition}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-16 pt-12 border-t border-[#E3E7EE]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
                Customer Reviews ({count})
              </h2>
              <p className="text-sm text-[#526075] mt-1">
                Authentic feedback from readers across Pakistan.
              </p>
            </div>

            <div className="space-y-4">
              {book.reviews.map((rev) => (
                <article
                  key={rev.id}
                  className="rounded-lg border border-[#E3E7EE] bg-white p-5 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#0F1E36]">
                        {rev.reviewerName}
                      </span>
                      <span className="text-xs text-[#526075]">· {rev.city}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-xs font-medium text-emerald-700">
                          · Verified Reader
                        </span>
                      )}
                    </div>
                    <time className="text-xs text-[#526075] tabular-nums">{rev.date}</time>
                  </div>
                  <div className="flex items-center gap-0.5 text-[#E85D22]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3.5 w-3.5 ${
                          star <= rev.rating ? 'fill-current' : 'text-slate-300'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#0F1E36] leading-relaxed">{rev.comment}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Interactive Review Form */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleReviewSubmit}
              className="rounded-lg border border-[#E3E7EE] bg-white p-6 space-y-4"
            >
              <h3 className="font-display text-lg font-semibold text-[#0F1E36]">
                Write a Reader Review
              </h3>
              <div>
                <label
                  htmlFor="rev-name"
                  className="block text-xs font-semibold text-[#0F1E36] mb-1.5"
                >
                  Your Name *
                </label>
                <input
                  id="rev-name"
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g., Hamza Tariq"
                  required
                  className="h-10 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="rev-city"
                    className="block text-xs font-semibold text-[#0F1E36] mb-1.5"
                  >
                    City
                  </label>
                  <input
                    id="rev-city"
                    type="text"
                    value={reviewerCity}
                    onChange={(e) => setReviewerCity(e.target.value)}
                    placeholder="Lahore"
                    className="h-10 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rev-rating"
                    className="block text-xs font-semibold text-[#0F1E36] mb-1.5"
                  >
                    Rating
                  </label>
                  <select
                    id="rev-rating"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="h-10 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
                  >
                    <option value={5}>5 Stars — Excellent</option>
                    <option value={4}>4 Stars — Very Good</option>
                    <option value={3}>3 Stars — Good</option>
                    <option value={2}>2 Stars — Fair</option>
                    <option value={1}>1 Star — Poor</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="rev-comment"
                  className="block text-xs font-semibold text-[#0F1E36] mb-1.5"
                >
                  Review *
                </label>
                <textarea
                  id="rev-comment"
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share how this book helped your studies or reading..."
                  required
                  className="w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] p-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
                />
              </div>

              {reviewStatus && (
                <p className="text-xs font-medium text-[#E85D22]">{reviewStatus}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-md bg-[#0F1E36] py-2.5 text-sm font-semibold text-white hover:bg-[#1A2F52] transition-colors cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Related Books Section */}
      <section className="mt-16 pt-12 border-t border-[#E3E7EE]">
        <h2 className="font-display text-2xl font-semibold text-[#0F1E36] mb-8">
          Readers Also Explored
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedBooks.map((rel) => (
            <BookCard key={rel.id} book={rel} />
          ))}
        </div>
      </section>
    </div>
  );
}
