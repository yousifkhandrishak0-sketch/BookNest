import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface BookCoverImageProps {
  src: string;
  alt: string;
  title: string;
  author: string;
  className?: string;
  lazy?: boolean;
}

export function BookCoverImage({
  src,
  alt,
  title,
  author,
  className = '',
  lazy = true,
}: BookCoverImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0F1E36] to-[#1A2F52] p-6 text-center text-white ${className}`}
        role="img"
        aria-label={alt}
      >
        <BookOpen className="mb-3 h-8 w-8 text-[#E85D22]" aria-hidden="true" />
        <p className="font-display text-base font-semibold leading-snug">{title}</p>
        <p className="mt-2 text-xs text-slate-300">{author}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
