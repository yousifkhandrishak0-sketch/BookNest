import { useEffect, useMemo } from 'react';
import { BOOKS } from '../data/books';
import { applyPageSeo } from '../utils/seo';
import { BookCard } from '../components/BookCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NewsletterSection } from '../components/NewsletterSection';

export function BestSellersPage() {
  useEffect(() => {
    applyPageSeo({
      title: 'Best Selling Books in Pakistan | BookNest Top Charts',
      description:
        'Discover Pakistan’s best selling books across Programming, Computer Science, Business, English Novels, Islamic History, and Self-Development at BookNest.',
      canonicalPath: '/best-sellers',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Best Sellers', path: '/best-sellers' },
      ],
    });
  }, []);

  const rankedBooks = useMemo(
    () =>
      BOOKS.filter((b) => b.isBestSeller).sort(
        (a, b) => b.popularityScore - a.popularityScore
      ),
    []
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Best Sellers' }]} />

        <div className="max-w-3xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E85D22]">
            Reader Favorites · Nationwide
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F1E36] mt-1">
            Best Selling Books in Pakistan
          </h1>
          <p className="mt-2.5 text-base text-[#526075] leading-relaxed">
            Our highest-rated and most ordered titles by university students, software engineers, entrepreneurs, and book clubs across Lahore, Karachi, and Islamabad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {rankedBooks.map((book) => (
            <BookCard key={book.id} book={book} priorityLoad />
          ))}
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
}
