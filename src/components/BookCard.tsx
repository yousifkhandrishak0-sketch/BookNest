import { ShoppingBag, Star } from 'lucide-react';
import { Book } from '../types/bookstore';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { computeAverageRating, formatPKR } from '../utils/format';
import { BookCoverImage } from './BookCoverImage';

interface BookCardProps {
  book: Book;
  priorityLoad?: boolean;
}

export function BookCard({ book, priorityLoad = false }: BookCardProps) {
  const { addToCart } = useCart();
  const { navigate } = useRouter();
  const { average, count } = computeAverageRating(book);

  const bookUrl = `/book/${book.slug}`;

  return (
    <article className="group flex flex-col bg-white border border-[#E3E7EE] rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(15,30,54,0.14)]">
      {/* Book Cover Showcase */}
      <a
        href={bookUrl}
        onClick={(e) => {
          e.preventDefault();
          navigate(bookUrl);
        }}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-[#F3F5F8] focus-visible:outline-2 focus-visible:outline-[#E85D22]"
        aria-label={`View details for ${book.title} by ${book.author}`}
      >
        <BookCoverImage
          src={book.coverImage}
          alt={book.coverAlt}
          title={book.title}
          author={book.author}
          lazy={!priorityLoad}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {book.discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-[#0F1E36] text-white px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded tabular-nums">
            -{book.discountPercentage}% OFF
          </span>
        )}
      </a>

      {/* Uniform Metadata & Pricing Block */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs text-[#526075] mb-1.5 truncate">
          <span className="truncate">{book.categoryName}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{book.binding}</span>
        </div>

        <h3 className="font-display text-lg font-semibold text-[#0F1E36] leading-snug line-clamp-2 min-h-[3rem]">
          <a
            href={bookUrl}
            onClick={(e) => {
              e.preventDefault();
              navigate(bookUrl);
            }}
            className="hover:text-[#E85D22] transition-colors"
          >
            {book.title}
          </a>
        </h3>

        <p className="mt-1 text-sm text-[#526075] truncate">{book.author}</p>

        {/* Genuine Rating */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#526075]">
          <div className="flex items-center text-[#E85D22]" aria-label={`Rated ${average} out of 5`}>
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            <span className="ml-1 font-semibold text-[#0F1E36] tabular-nums">
              {average.toFixed(1)}
            </span>
          </div>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {count} {count === 1 ? 'review' : 'reviews'}
          </span>
        </div>

        {/* PKR Price Row */}
        <div className="mt-4 pt-3 border-t border-[#E3E7EE] flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-base font-bold text-[#0F1E36] tabular-nums whitespace-nowrap">
              {formatPKR(book.discountedPrice)}
            </span>
            {book.originalPrice > book.discountedPrice && (
              <span className="text-xs text-[#526075] line-through tabular-nums whitespace-nowrap">
                {formatPKR(book.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-emerald-700 whitespace-nowrap">
            In Stock
          </span>
        </div>

        {/* Functional Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => addToCart(book, 1)}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#E85D22] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#CF4E17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D22] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Add to Cart</span>
          </button>
          <a
            href={bookUrl}
            onClick={(e) => {
              e.preventDefault();
              navigate(bookUrl);
            }}
            className="inline-flex items-center justify-center rounded-md border border-[#E3E7EE] bg-white px-3 py-2.5 text-xs font-semibold text-[#0F1E36] transition-colors hover:border-[#0F1E36] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F1E36] whitespace-nowrap shrink-0"
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  );
}
