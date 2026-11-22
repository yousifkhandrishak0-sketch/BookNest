import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { BOOKS } from '../data/books';
import { CATEGORIES } from '../data/categories';
import { useRouter } from '../context/RouterContext';
import { applyPageSeo } from '../utils/seo';
import { computeAverageRating } from '../utils/format';
import { BookCard } from '../components/BookCard';
import { Breadcrumbs } from '../components/Breadcrumbs';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'discount' | 'rating';
type CollectionFilter = 'all' | 'bestsellers' | 'new' | 'offers';

export function ShopPage() {
  const { search } = useRouter();

  const initialParams = useMemo(() => new URLSearchParams(search), [search]);
  const [query, setQuery] = useState(initialParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialParams.get('category') || 'all'
  );
  const [collection, setCollection] = useState<CollectionFilter>(
    (initialParams.get('collection') as CollectionFilter) || 'all'
  );
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.has('q')) setQuery(params.get('q') || '');
    if (params.has('category')) setSelectedCategory(params.get('category') || 'all');
    if (params.has('collection')) {
      setCollection((params.get('collection') as CollectionFilter) || 'all');
    }
  }, [search]);

  useEffect(() => {
    applyPageSeo({
      title: 'Shop All Books Online in Pakistan | BookNest Store',
      description:
        'Browse and buy Computer Science, Programming, Business, Science, English Novels, Islamic, and Academic books online in Pakistan with PKR pricing.',
      canonicalPath: '/shop',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
      ],
    });
  }, []);

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = BOOKS.filter((book) => {
      if (selectedCategory !== 'all' && book.category !== selectedCategory) return false;
      if (collection === 'bestsellers' && !book.isBestSeller) return false;
      if (collection === 'new' && !book.isNewArrival) return false;
      if (collection === 'offers' && !book.isSpecialOffer) return false;
      if (q) {
        const matches =
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.categoryName.toLowerCase().includes(q) ||
          book.isbn.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.discountedPrice - b.discountedPrice;
        case 'price-desc':
          return b.discountedPrice - a.discountedPrice;
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        case 'rating':
          return computeAverageRating(b).average - computeAverageRating(a).average;
        case 'popular':
        default:
          return b.popularityScore - a.popularityScore;
      }
    });
  }, [query, selectedCategory, collection, sortBy]);

  const clearAllFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setCollection('all');
    setSortBy('popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Shop All Books' }]} />

      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F1E36]">
            Shop Books Online in Pakistan
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#526075] max-w-2xl">
            Explore authentic editions across 8 academic and general categories. All prices shown in Pakistani Rupees (PKR) with Cash on Delivery nationwide.
          </p>
        </div>
        <p className="text-sm font-medium text-[#526075] tabular-nums whitespace-nowrap">
          Showing <strong className="text-[#0F1E36]">{filteredBooks.length}</strong> of{' '}
          {BOOKS.length} books
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="rounded-lg border border-[#E3E7EE] bg-white p-4 sm:p-5 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#526075]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by book title, author, or ISBN..."
              aria-label="Search books by title, author, or ISBN"
              className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] pl-10 pr-4 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Collection Filter */}
          <div className="md:col-span-3">
            <label htmlFor="collection-select" className="sr-only">
              Filter by collection
            </label>
            <select
              id="collection-select"
              value={collection}
              onChange={(e) => setCollection(e.target.value as CollectionFilter)}
              className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
            >
              <option value="all">All Collections</option>
              <option value="bestsellers">Best Selling Books</option>
              <option value="new">New Arrivals</option>
              <option value="offers">Special Discount Offers</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-4 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#526075] shrink-0" aria-hidden="true" />
            <label htmlFor="sort-books" className="sr-only">
              Sort books
            </label>
            <select
              id="sort-books"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] px-3 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
            >
              <option value="popular">Sort by: Popularity</option>
              <option value="price-asc">Price: Low to High (PKR)</option>
              <option value="price-desc">Price: High to Low (PKR)</option>
              <option value="discount">Highest Discount %</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Interactive Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E3E7EE]">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0F1E36] text-white'
                : 'bg-[#F8F9FB] text-[#526075] hover:text-[#0F1E36]'
            }`}
          >
            All Subjects
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-[#E85D22] text-white'
                  : 'bg-[#F8F9FB] text-[#526075] hover:text-[#0F1E36]'
              }`}
            >
              {cat.shortTitle}
            </button>
          ))}

          {(query || selectedCategory !== 'all' || collection !== 'all') && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#E85D22] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredBooks.length === 0 ? (
        <div className="rounded-lg border border-[#E3E7EE] bg-white p-12 text-center">
          <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
            No matching books found
          </h2>
          <p className="mt-2 text-sm text-[#526075]">
            Try adjusting your search keywords or clearing category filters to explore our full PKR catalog.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-5 rounded-md bg-[#0F1E36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1A2F52] transition-colors cursor-pointer"
          >
            Show All Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
