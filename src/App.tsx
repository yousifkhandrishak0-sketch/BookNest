/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartProvider } from './context/CartContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BestSellersPage } from './pages/BestSellersPage';
import { BookDetailsPage } from './pages/BookDetailsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function MainRoutes() {
  const { pathname, navigate } = useRouter();

  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  let content: React.ReactNode;

  if (normalized === '/') {
    content = <HomePage />;
  } else if (normalized === '/shop') {
    content = <ShopPage />;
  } else if (normalized === '/categories') {
    content = <CategoriesPage />;
  } else if (normalized.startsWith('/category/')) {
    const slug = normalized.replace('/category/', '');
    content = <CategoriesPage categorySlug={slug} />;
  } else if (normalized === '/best-sellers') {
    content = <BestSellersPage />;
  } else if (normalized.startsWith('/book/')) {
    const slug = normalized.replace('/book/', '');
    content = <BookDetailsPage slug={slug} />;
  } else if (normalized === '/checkout') {
    content = <CheckoutPage />;
  } else if (normalized === '/about') {
    content = <AboutPage />;
  } else if (normalized === '/contact') {
    content = <ContactPage />;
  } else {
    content = (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center space-y-4">
        <h1 className="font-display text-3xl font-bold text-[#0F1E36]">Page Not Found</h1>
        <p className="text-sm text-[#526075]">
          The page you requested does not exist. Explore our online bookstore catalog below.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-md bg-[#E85D22] px-6 py-3 text-sm font-semibold text-white hover:bg-[#CF4E17] cursor-pointer"
        >
          Back to BookNest Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] text-[#0F1E36]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-[#0F1E36] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {content}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <MainRoutes />
      </CartProvider>
    </RouterProvider>
  );
}
