import { useEffect } from 'react';
import { ArrowRight, BookOpen, Percent, ShieldCheck, Truck } from 'lucide-react';
import { BOOKS, TESTIMONIALS } from '../data/books';
import { CATEGORIES } from '../data/categories';
import { useRouter } from '../context/RouterContext';
import { applyPageSeo } from '../utils/seo';
import { BookCard } from '../components/BookCard';
import { NewsletterSection } from '../components/NewsletterSection';

export function HomePage() {
  const { navigate } = useRouter();

  useEffect(() => {
    applyPageSeo({
      title: 'BookNest – Online Book Store | Buy Books Online in Pakistan',
      description:
        'Discover your next favorite book at BookNest, the best online book store in Pakistan. Shop Computer Science, Programming, Novels, Islamic, and Academic books in PKR.',
      canonicalPath: '/',
      ogType: 'website',
    });
  }, []);

  const featuredBooks = BOOKS.filter((b) => b.isFeatured).slice(0, 4);
  const bestSellers = BOOKS.filter((b) => b.isBestSeller)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 4);
  const newArrivals = BOOKS.filter((b) => b.isNewArrival).slice(0, 4);
  const specialOffers = BOOKS.filter((b) => b.isSpecialOffer)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 4);

  const handleLink = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="bg-white border-b border-[#E3E7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Hero Copy */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E85D22]">
                Best Online Book Store in Pakistan
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#0F1E36] leading-[1.1]">
                Discover Your Next Favorite Book
              </h1>
              <p className="text-base sm:text-lg text-[#526075] leading-relaxed max-w-xl">
                Explore Thousands of Books and Start Your Next Reading Adventure. From university Computer Science and Programming textbooks to English novels, Islamic history, and business guides—priced clearly in PKR.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="/shop"
                  onClick={handleLink('/shop')}
                  className="inline-flex items-center gap-2 rounded-md bg-[#E85D22] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#CF4E17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D22] whitespace-nowrap shrink-0"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="/categories"
                  onClick={handleLink('/categories')}
                  className="inline-flex items-center gap-2 rounded-md border border-[#0F1E36] bg-white px-6 py-3.5 text-sm font-semibold text-[#0F1E36] transition-colors hover:bg-[#0F1E36] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F1E36] whitespace-nowrap shrink-0"
                >
                  <span>Explore Books</span>
                </a>
              </div>
            </div>

            {/* Hero Photography */}
            <div className="lg:col-span-6">
              <div className="relative h-72 sm:h-96 lg:h-full min-h-[340px] w-full overflow-hidden rounded-xl border border-[#E3E7EE] bg-[#0F1E36]">
                <img
                  src="/src/assets/images/hero_bookstore_banner_1795366985355.jpg"
                  alt="BookNest curated independent bookstore shelves and oak reading table in warm morning sunlight"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 4-Column Store Assurance Strip */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#E3E7EE]">
            <div className="flex items-start gap-3.5">
              <Truck className="h-5 w-5 text-[#E85D22] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-[#0F1E36]">Nationwide Pakistan Delivery</p>
                <p className="text-xs text-[#526075] mt-0.5">
                  Free shipping on orders above PKR 3,500
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <ShieldCheck className="h-5 w-5 text-[#E85D22] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-[#0F1E36]">Cash on Delivery Available</p>
                <p className="text-xs text-[#526075] mt-0.5">
                  Pay safely at your doorstep in any city
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Percent className="h-5 w-5 text-[#E85D22] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-[#0F1E36]">Up to 25% Academic Savings</p>
                <p className="text-xs text-[#526075] mt-0.5">
                  Extra 15% student discount with STUDENT15
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <BookOpen className="h-5 w-5 text-[#E85D22] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-[#0F1E36]">8 Core Curated Subjects</p>
                <p className="text-xs text-[#526075] mt-0.5">
                  Verified crisp print & clothbound editions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section aria-labelledby="featured-books-heading" className="py-16 px-4 sm:px-6 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#E85D22]">
                Editor’s Selection
              </p>
              <h2
                id="featured-books-heading"
                className="font-display text-3xl font-semibold text-[#0F1E36] mt-1"
              >
                Featured Books
              </h2>
            </div>
            <a
              href="/shop"
              onClick={handleLink('/shop')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F1E36] hover:text-[#E85D22] transition-colors whitespace-nowrap shrink-0"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} priorityLoad />
            ))}
          </div>
        </div>
      </section>

      {/* Browse 8 Categories Section */}
      <section
        aria-labelledby="categories-heading"
        className="py-16 px-4 sm:px-6 bg-white border-y border-[#E3E7EE]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#E85D22]">
                Shop by Subject
              </p>
              <h2
                id="categories-heading"
                className="font-display text-3xl font-semibold text-[#0F1E36] mt-1"
              >
                Explore Book Categories
              </h2>
            </div>
            <a
              href="/categories"
              onClick={handleLink('/categories')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F1E36] hover:text-[#E85D22] transition-colors whitespace-nowrap shrink-0"
            >
              <span>All 8 Categories</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((category) => (
              <a
                key={category.slug}
                href={`/category/${category.slug}`}
                onClick={handleLink(`/category/${category.slug}`)}
                className="group flex items-center gap-4 rounded-lg border border-[#E3E7EE] bg-[#F8F9FB] p-4 transition-all duration-200 hover:bg-white hover:border-[#0F1E36] hover:shadow-sm"
              >
                <img
                  src={category.featuredImage}
                  alt={category.imageAlt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-20 w-15 rounded object-cover border border-[#E3E7EE] shrink-0 bg-white"
                />
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-[#0F1E36] group-hover:text-[#E85D22] transition-colors leading-snug">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#526075] line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling Books Section */}
      <section aria-labelledby="bestsellers-heading" className="py-16 px-4 sm:px-6 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#E85D22]">
                Most Popular Across Pakistan
              </p>
              <h2
                id="bestsellers-heading"
                className="font-display text-3xl font-semibold text-[#0F1E36] mt-1"
              >
                Best Selling Books
              </h2>
            </div>
            <a
              href="/best-sellers"
              onClick={handleLink('/best-sellers')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F1E36] hover:text-[#E85D22] transition-colors whitespace-nowrap shrink-0"
            >
              <span>See All Best Sellers</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Discount Offers Campaign Section */}
      <section
        aria-labelledby="special-offers-heading"
        className="py-16 px-4 sm:px-6 bg-white border-y border-[#E3E7EE]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl bg-[#0F1E36] text-white p-8 sm:p-10 mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F69469]">
                Limited Semester Promotion
              </p>
              <h2
                id="special-offers-heading"
                className="font-display text-2xl sm:text-3xl font-semibold text-white"
              >
                Special Discount Offers — Save Up to 25% in PKR
              </h2>
              <p className="text-sm text-slate-300">
                Buy affordable books online for university coursework and personal libraries. Combine marked-down editions with code{' '}
                <strong className="text-white">READPK10</strong> for an additional 10% cart discount.
              </p>
            </div>
            <a
              href="/shop?collection=offers"
              onClick={handleLink('/shop?collection=offers')}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#E85D22] px-6 py-3 text-sm font-semibold text-white hover:bg-[#CF4E17] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Shop All Deals</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialOffers.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section aria-labelledby="new-arrivals-heading" className="py-16 px-4 sm:px-6 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#E85D22]">
                Fresh on the Shelf
              </p>
              <h2
                id="new-arrivals-heading"
                className="font-display text-3xl font-semibold text-[#0F1E36] mt-1"
              >
                New Arrivals
              </h2>
            </div>
            <a
              href="/shop?collection=new"
              onClick={handleLink('/shop?collection=new')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F1E36] hover:text-[#E85D22] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Browse New Releases</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section
        aria-labelledby="testimonials-heading"
        className="py-16 px-4 sm:px-6 bg-white border-t border-[#E3E7EE]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E85D22]">
              Verified Reader Stories
            </p>
            <h2
              id="testimonials-heading"
              className="font-display text-3xl font-semibold text-[#0F1E36] mt-1"
            >
              Trusted by Students & Readers Across Pakistan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item) => (
              <figure
                key={item.id}
                className="flex flex-col justify-between rounded-lg border border-[#E3E7EE] bg-[#F8F9FB] p-6"
              >
                <blockquote className="text-sm text-[#0F1E36] leading-relaxed">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-[#E3E7EE]">
                  <p className="text-sm font-semibold text-[#0F1E36]">{item.name}</p>
                  <p className="text-xs text-[#526075] mt-0.5">
                    {item.role} · {item.organization}
                  </p>
                  <p className="text-xs text-[#E85D22] font-medium mt-0.5">{item.city}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <NewsletterSection />
    </div>
  );
}
