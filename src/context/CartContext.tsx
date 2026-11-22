import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Book, CartItem, DemoOrder } from '../types/bookstore';

const CART_STORAGE_KEY = 'booknest_cart_v1';
const ORDERS_STORAGE_KEY = 'booknest_demo_orders_v1';
const PROMO_STORAGE_KEY = 'booknest_promo_v1';

export const FREE_DELIVERY_THRESHOLD = 3500;
export const STANDARD_DELIVERY_FEE = 250;

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  promoCode: string;
  promoDiscountRate: number;
  totalItems: number;
  subtotal: number;
  promoDiscountAmount: number;
  shippingFee: number;
  total: number;
  lastAddedTitle: string | null;
  lastOrder: DemoOrder | null;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  saveDemoOrder: (order: DemoOrder) => void;
  clearLastAdded: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore corrupted local storage
    }
    return [];
  });

  const [promoCode, setPromoCode] = useState<string>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [lastOrder, setLastOrder] = useState<DemoOrder | null>(() => {
    try {
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : null;
      }
    } catch {
      // Ignore storage error
    }
    return null;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAddedTitle, setLastAddedTitle] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items]);

  useEffect(() => {
    try {
      if (promoCode) {
        localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch {
      // Ignore storage error
    }
  }, [promoCode]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const clearLastAdded = useCallback(() => setLastAddedTitle(null), []);

  const addToCart = useCallback((book: Book, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity }];
    });
    setLastAddedTitle(book.title);
    setIsDrawerOpen(true);
  }, []);

  const removeFromCart = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((item) => item.book.id !== bookId));
  }, []);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.book.id !== bookId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.book.id === bookId ? { ...item, quantity: Math.min(quantity, 25) } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode('');
  }, []);

  const promoDiscountRate = useMemo(() => {
    const normalized = promoCode.trim().toUpperCase();
    if (normalized === 'READPK10') return 0.1;
    if (normalized === 'STUDENT15') return 0.15;
    return 0;
  }, [promoCode]);

  const applyPromoCode = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'READPK10') {
      setPromoCode('READPK10');
      return { success: true, message: 'Code READPK10 applied — 10% extra discount.' };
    }
    if (normalized === 'STUDENT15') {
      setPromoCode('STUDENT15');
      return { success: true, message: 'Code STUDENT15 applied — 15% student discount.' };
    }
    return {
      success: false,
      message: 'Invalid code. Try READPK10 (10% off) or STUDENT15 (15% off).',
    };
  }, []);

  const removePromoCode = useCallback(() => {
    setPromoCode('');
  }, []);

  const saveDemoOrder = useCallback((order: DemoOrder) => {
    setLastOrder(order);
    try {
      const existingRaw = localStorage.getItem(ORDERS_STORAGE_KEY);
      const existing: DemoOrder[] = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([order, ...existing].slice(0, 10)));
    } catch {
      // Ignore storage error
    }
    setItems([]);
    setPromoCode('');
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.book.discountedPrice * item.quantity, 0),
    [items]
  );

  const promoDiscountAmount = useMemo(
    () => Math.round(subtotal * promoDiscountRate),
    [subtotal, promoDiscountRate]
  );

  const discountedSubtotal = Math.max(0, subtotal - promoDiscountAmount);

  const shippingFee = useMemo(() => {
    if (items.length === 0) return 0;
    return discountedSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  }, [items.length, discountedSubtotal]);

  const total = discountedSubtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        promoCode,
        promoDiscountRate,
        totalItems,
        subtotal,
        promoDiscountAmount,
        shippingFee,
        total,
        lastAddedTitle,
        lastOrder,
        openDrawer,
        closeDrawer,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
        saveDemoOrder,
        clearLastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
