import { Book } from '../types/bookstore';

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function computeAverageRating(book: Book): { average: number; count: number } {
  if (!book.reviews || book.reviews.length === 0) {
    return { average: 0, count: 0 };
  }
  const sum = book.reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    average: Number((sum / book.reviews.length).toFixed(1)),
    count: book.reviews.length,
  };
}

export function calculateSavings(originalPrice: number, discountedPrice: number): number {
  return Math.max(0, originalPrice - discountedPrice);
}
