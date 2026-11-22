import { Mail, MapPin, Phone } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useRouter } from '../context/RouterContext';

export function Footer() {
  const { navigate } = useRouter();

  const handleLink = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="bg-[#091426] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Overview */}
        <div className="space-y-4">
          <a
            href="/"
            onClick={handleLink('/')}
            className="font-display text-2xl font-bold text-white tracking-tight inline-block"
          >
            BookNest
          </a>
          <p className="text-sm text-slate-300 leading-relaxed">
            Pakistan’s modern online book store for university textbooks, programming handbooks, literature, Islamic history, and personal development—priced transparently in PKR.
          </p>
          <div className="flex items-center gap-4 pt-1 text-xs font-medium text-slate-300">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F69469] transition-colors"
            >
              Facebook
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F69469] transition-colors"
            >
              Instagram
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F69469] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Store Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Bookstore
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="/" onClick={handleLink('/')} className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" onClick={handleLink('/shop')} className="hover:text-white transition-colors">
                Shop All Books
              </a>
            </li>
            <li>
              <a
                href="/best-sellers"
                onClick={handleLink('/best-sellers')}
                className="hover:text-white transition-colors"
              >
                Best Selling Books
              </a>
            </li>
            <li>
              <a
                href="/categories"
                onClick={handleLink('/categories')}
                className="hover:text-white transition-colors"
              >
                All Categories
              </a>
            </li>
            <li>
              <a href="/about" onClick={handleLink('/about')} className="hover:text-white transition-colors">
                About BookNest
              </a>
            </li>
            <li>
              <a href="/contact" onClick={handleLink('/contact')} className="hover:text-white transition-colors">
                Contact & Bulk Orders
              </a>
            </li>
          </ul>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Popular Categories
          </h3>
          <ul className="space-y-2.5 text-sm">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <a
                  href={`/category/${cat.slug}`}
                  onClick={handleLink(`/category/${cat.slug}`)}
                  className="hover:text-white transition-colors"
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Pakistan Support & Local SEO */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Pakistan Dispatch
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-[#E85D22] shrink-0 mt-0.5" aria-hidden="true" />
              <span>Gulberg III & Urdu Bazaar Hub, Lahore, Pakistan</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[#E85D22] shrink-0" aria-hidden="true" />
              <span className="tabular-nums">+92 42 3578 4920</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-[#E85D22] shrink-0" aria-hidden="true" />
              <span>support@booknest.pk</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-400">
            Cash on Delivery (COD) available across Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan & Peshawar.
          </p>
        </div>
      </div>

      {/* Quiet Bottom Copyright & Sitemap Row */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} BookNest – Online Book Store Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/sitemap.xml" className="hover:text-white transition-colors">
              XML Sitemap
            </a>
            <span aria-hidden="true">·</span>
            <a href="/robots.txt" className="hover:text-white transition-colors">
              Robots.txt
            </a>
            <span aria-hidden="true">·</span>
            <a href="/checkout" onClick={handleLink('/checkout')} className="hover:text-white transition-colors">
              Checkout Demo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
