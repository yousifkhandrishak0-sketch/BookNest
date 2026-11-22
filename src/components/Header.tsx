import React, { useMemo, useState } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { BOOKS } from '../data/books';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { formatPKR } from '../utils/format';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Categories', path: '/categories' },
  { label: 'Best Sellers', path: '/best-sellers' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export function Header() {
  const { pathname, navigate } = useRouter();
  const { totalItems, openDrawer } = useCart();

  const [promoVisible, setPromoVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const quickResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return BOOKS.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.categoryName.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  const submitSearch = () => {
    const q = searchQuery.trim();
    setSearchFocused(false);
    setMobileMenuOpen(false);
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearch();
  };

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Non-sticky slim promotional strip (keeps mobile sticky height strictly <= 64px) */}
      {promoVisible && (
        <div className="bg-[#0F1E36] text-white text-xs border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between gap-3">
            <p className="truncate text-slate-200">
              Free delivery across Pakistan on orders above{' '}
              <span className="font-semibold text-white tabular-nums">PKR 3,500</span>
              <span className="hidden sm:inline"> · Use code </span>
              <span className="hidden sm:inline font-semibold text-[#F69469]">READPK10</span>
              <span className="hidden sm:inline"> for 10% off</span>
            </p>
            <button
              type="button"
              onClick={() => setPromoVisible(false)}
              aria-label="Dismiss announcement"
              className="p-1 text-slate-300 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E3E7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="font-display text-2xl font-bold tracking-tight text-[#0F1E36] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E85D22] rounded"
          >
            BookNest
          </a>

          {/* Zone 2: Clean Single-line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#526075]"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.path === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.path) ||
                    (link.path === '/categories' && pathname.startsWith('/category/'));
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.path);
                  }}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#0F1E36] ${
                    isActive ? 'text-[#0F1E36] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#E85D22] rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Search + Shopping Cart Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop Live Search Bar */}
            <div className="relative hidden md:block">
              <form onSubmit={handleSearchSubmit} role="search">
                <label htmlFor="header-book-search" className="sr-only">
                  Search books by title or author
                </label>
                <div className="relative flex items-center">
                  <Search
                    className="pointer-events-none absolute left-3 h-4 w-4 text-[#526075]"
                    aria-hidden="true"
                  />
                  <input
                    id="header-book-search"
                    type="search"
                    value={searchQuery}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search title or author..."
                    className="h-10 w-48 xl:w-64 rounded-md border border-[#E3E7EE] bg-[#F8F9FB] pl-9 pr-3 text-sm text-[#0F1E36] placeholder:text-[#526075] focus:border-[#0F1E36] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </form>

              {searchFocused && quickResults.length > 0 && (
                <div
                  className="absolute right-0 mt-2 w-80 rounded-lg border border-[#E3E7EE] bg-white shadow-xl overflow-hidden z-50"
                  role="listbox"
                  aria-label="Quick search results"
                >
                  <ul className="divide-y divide-[#E3E7EE]">
                    {quickResults.map((book) => (
                      <li key={book.id}>
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSearchQuery('');
                            setSearchFocused(false);
                            navigate(`/book/${book.slug}`);
                          }}
                          className="w-full flex items-center gap-3 p-3 text-left hover:bg-[#F8F9FB] transition-colors cursor-pointer"
                        >
                          <img
                            src={book.coverImage}
                            alt={book.coverAlt}
                            className="h-12 w-9 object-cover rounded shrink-0 bg-slate-100"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-[#0F1E36] truncate">
                              {book.title}
                            </p>
                            <p className="text-xs text-[#526075] truncate">{book.author}</p>
                            <p className="text-xs font-semibold text-[#E85D22] tabular-nums mt-0.5">
                              {formatPKR(book.discountedPrice)}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      submitSearch();
                    }}
                    className="w-full bg-[#F8F9FB] px-3 py-2 text-xs font-semibold text-[#0F1E36] hover:bg-slate-100 text-center border-t border-[#E3E7EE] cursor-pointer"
                  >
                    See all results for “{searchQuery}”
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Open shopping cart (${totalItems} items)`}
              className="relative inline-flex h-10 items-center gap-2 rounded-md bg-[#0F1E36] px-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1A2F52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D22] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded bg-[#E85D22] px-1.5 text-xs font-bold text-white tabular-nums">
                {totalItems}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-md border border-[#E3E7EE] bg-white text-[#0F1E36] hover:bg-[#F8F9FB] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E3E7EE] bg-white px-4 py-4 space-y-4">
            <form onSubmit={handleSearchSubmit} role="search">
              <label htmlFor="mobile-book-search" className="sr-only">
                Search books
              </label>
              <div className="relative flex items-center">
                <Search
                  className="pointer-events-none absolute left-3 h-4 w-4 text-[#526075]"
                  aria-hidden="true"
                />
                <input
                  id="mobile-book-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books, authors, ISBN..."
                  className="h-11 w-full rounded-md border border-[#E3E7EE] bg-[#F8F9FB] pl-9 pr-20 text-sm text-[#0F1E36] focus:border-[#0F1E36] focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 rounded bg-[#0F1E36] px-3 py-1.5 text-xs font-semibold text-white cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>

            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.path === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.path);
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.path);
                    }}
                    className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F8F9FB] text-[#E85D22] font-semibold'
                        : 'text-[#0F1E36] hover:bg-[#F8F9FB]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
