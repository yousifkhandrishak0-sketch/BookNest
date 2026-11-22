import { Book } from '../types/bookstore';
import { computeAverageRating } from './format';

export interface SeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'product' | 'article';
  ogImage?: string;
  breadcrumbs?: { name: string; path: string }[];
  productBook?: Book;
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

export function applyPageSeo(config: SeoConfig) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://booknest.pk';
  const canonicalUrl = `${origin}${config.canonicalPath}`;
  const ogImage = config.ogImage
    ? config.ogImage.startsWith('http')
      ? config.ogImage
      : `${origin}${config.ogImage}`
    : `${origin}/src/assets/images/hero_bookstore_banner_1795366985355.jpg`;

  document.title = config.title;
  setMetaTag('name', 'description', config.description);
  setCanonical(canonicalUrl);

  setMetaTag('property', 'og:type', config.ogType || 'website');
  setMetaTag('property', 'og:title', config.title);
  setMetaTag('property', 'og:description', config.description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:image', ogImage);

  setMetaTag('name', 'twitter:title', config.title);
  setMetaTag('name', 'twitter:description', config.description);
  setMetaTag('name', 'twitter:image', ogImage);

  // Build Schema.org JSON-LD graph dynamically
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: 'BookNest',
      url: origin,
      description:
        'BookNest is an online book store in Pakistan offering Computer Science, Programming, Business, Fiction, Islamic, Self-Development, and Academic books in PKR.',
      areaServed: {
        '@type': 'Country',
        name: 'Pakistan',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'support@booknest.pk',
        areaServed: 'PK',
        availableLanguage: ['English', 'Urdu'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      name: 'BookNest – Online Book Store',
      url: origin,
      publisher: { '@id': `${origin}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${origin}/shop?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  if (config.breadcrumbs && config.breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: config.breadcrumbs.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: `${origin}${item.path}`,
      })),
    });
  }

  if (config.productBook) {
    const book = config.productBook;
    const { average, count } = computeAverageRating(book);
    const productSchema: Record<string, unknown> = {
      '@type': ['Product', 'Book'],
      name: book.title,
      image: book.coverImage.startsWith('http') ? book.coverImage : `${origin}${book.coverImage}`,
      description: book.seoDescription,
      isbn: book.isbn,
      author: {
        '@type': 'Person',
        name: book.author,
      },
      publisher: {
        '@type': 'Organization',
        name: book.publisher,
      },
      numberOfPages: book.pages,
      inLanguage: book.language,
      offers: {
        '@type': 'Offer',
        url: canonicalUrl,
        priceCurrency: 'PKR',
        price: book.discountedPrice,
        availability: book.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'BookNest',
        },
      },
    };

    // Only emit aggregateRating & review when genuine review records exist
    if (count > 0) {
      productSchema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: average,
        reviewCount: count,
        bestRating: 5,
        worstRating: 1,
      };
      productSchema.review = book.reviews.map((rev) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: rev.reviewerName,
        },
        datePublished: rev.date,
        reviewBody: rev.comment,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: rev.rating,
          bestRating: 5,
          worstRating: 1,
        },
      }));
    }

    graph.push(productSchema);
  }

  const ldJsonId = 'booknest-jsonld';
  let scriptEl = document.getElementById(ldJsonId) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = ldJsonId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
}
