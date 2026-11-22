import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKS, getBooksByCategory } from '../data/books';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { useRouter } from '../context/RouterContext';
import { applyPageSeo } from '../utils/seo';
import { BookCard } from '../components/BookCard';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function CategoriesPage({ categorySlug }: { categorySlug?: string }) {
  const { navigate } = useRouter();
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  const activeCategory = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  useEffect(() => {
    if (activeCategory) {
      applyPageSeo({
        title: activeCategory.seoTitle,
        description: activeCategory.seoDescription,
        canonicalPath: `/category/${activeCategory.slug}`,
        ogImage: activeCategory.featuredImage,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Categories', path: '/categories' },
          { name: activeCategory.name, path: `/category/${activeCategory.slug}` },
        ],
      });
    } else {
      applyPageSeo({
        title: 'Book Categories | Computer Science, Fiction, Islamic & Academic – BookNest',
        description:
          'Browse 8 curated book categories at BookNest Pakistan: Computer Science, Programming, Business, Science, English Novels, Islamic Books, Self-Development, and Academic Textbooks.',
        canonicalPath: '/categories',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Categories', path: '/categories' },
        ],
      });
    }
  }, [activeCategory]);

  const categoryBooks = useMemo(() => {
    if (!activeCategory) return [];
    const list = getBooksByCategory(activeCategory.slug);
    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.discountedPrice - b.discountedPrice;
      if (sortBy === 'price-desc') return b.discountedPrice - a.discountedPrice;
      return b.popularityScore - a.popularityScore;
    });
  }, [activeCategory, sortBy]);

  if (activeCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'Categories', path: '/categories' },
            { label: activeCategory.name },
          ]}
        />

        <div className="rounded-xl bg-[#0F1E36] text-white p-8 sm:p-10 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#F69469]">
              BookNest Subject Shelf
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
              {activeCategory.name} Books
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {activeCategory.description}
            </p>
          </div>
          <div className="shrink-0">
            <label htmlFor="cat-sort" className="sr-only">
              Sort category books
            </label>
            <select
              id="cat-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'price-asc' | 'price-desc')}
              className="h-10 rounded-md border border-white/20 bg-[#132645] px-3 text-sm text-white focus:border-[#E85D22] focus:outline-none"
            >
              <option value="popular">Sort by: Popularity</option>
              <option value="price-asc">Price: Low to High (PKR)</option>
              <option value="price-desc">Price: High to Low (PKR)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {categoryBooks.map((book) => (
            <BookCard key={book.id} book={book} priorityLoad />
          ))}
        </div>

        {/* Cross-linking to other categories for Internal SEO */}
        <section className="pt-10 border-t border-[#E3E7EE]">
          <h2 className="font-display text-xl font-semibold text-[#0F1E36] mb-5">
            Explore Other Book Categories
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.filter((c) => c.slug !== activeCategory.slug).map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/category/${cat.slug}`);
                }}
                className="rounded-md border border-[#E3E7EE] bg-white px-4 py-2 text-sm font-medium text-[#0F1E36] hover:border-[#E85D22] hover:text-[#E85D22] transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Categories' }]} />

      <div className="max-w-3xl mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F1E36]">
          Browse Books by Category
        </h1>
        <p className="mt-2.5 text-base text-[#526075] leading-relaxed">
          From university Computer Science textbooks and modern Programming guides to English novels, Islamic scholarship, and Academic writing manuals—explore all 8 specialized shelves at BookNest.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((category) => {
          const count = BOOKS.filter((b) => b.category === category.slug).length;
          return (
            <article
              key={category.slug}
              className="group flex flex-col sm:flex-row gap-5 rounded-lg border border-[#E3E7EE] bg-white p-5 transition-all hover:border-[#0F1E36] hover:shadow-md"
            >
              <a
                href={`/category/${category.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/category/${category.slug}`);
                }}
                className="sm:w-36 aspect-[3/4] rounded-md overflow-hidden border border-[#E3E7EE] bg-[#F8F9FB] shrink-0"
              >
                <img
                  src={category.featuredImage}
                  alt={category.imageAlt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </a>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-[#E85D22] tabular-nums">
                    {count} Curated Editions
                  </p>
                  <h2 className="font-display text-xl font-semibold text-[#0F1E36] mt-1">
                    <a
                      href={`/category/${category.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/category/${category.slug}`);
                      }}
                      className="hover:text-[#E85D22] transition-colors"
                    >
                      {category.name}
                    </a>
                  </h2>
                  <p className="mt-2 text-sm text-[#526075] leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E3E7EE]">
                  <a
                    href={`/category/${category.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/category/${category.slug}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F1E36] group-hover:text-[#E85D22] transition-colors"
                  >
                    <span>Explore {category.shortTitle}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
