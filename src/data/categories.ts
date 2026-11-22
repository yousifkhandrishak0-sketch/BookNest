import { Category } from '../types/bookstore';

export const CATEGORIES: Category[] = [
  {
    slug: 'computer-science',
    name: 'Computer Science',
    shortTitle: 'Computer Science',
    description:
      'Essential university textbooks and core reference volumes covering algorithms, data structures, operating systems, and computer architecture for Pakistani engineering students.',
    seoTitle: 'Computer Science Books Online in Pakistan | BookNest',
    seoDescription:
      'Buy Computer Science books online in Pakistan at BookNest. Shop algorithms, data structures, and system architecture textbooks in PKR with nationwide delivery.',
    featuredImage: '/src/assets/images/book_cs_algorithms_1795366984586.jpg',
    imageAlt: 'Hardcover Computer Science textbook on algorithms and data structures',
  },
  {
    slug: 'programming',
    name: 'Programming',
    shortTitle: 'Programming',
    description:
      'Practical software engineering handbooks on clean code architecture, modern C++, and production coding standards for developers and university CS majors.',
    seoTitle: 'Programming Books Online in Pakistan | BookNest',
    seoDescription:
      'Shop the best programming books online at affordable PKR prices. Clean Code, Modern C++, and software architecture delivered anywhere in Pakistan.',
    featuredImage: '/src/assets/images/book_prog_python_1795366985158.jpg',
    imageAlt: 'Modern C++ programming guide book on stone desk',
  },
  {
    slug: 'business-entrepreneurship',
    name: 'Business & Entrepreneurship',
    shortTitle: 'Business & Startups',
    description:
      'Strategic frameworks on digital marketing, startup scaling, brand leadership, and modern commerce tailored for founders, marketers, and MBA scholars.',
    seoTitle: 'Business & Entrepreneurship Books in Pakistan | BookNest',
    seoDescription:
      'Explore top business, startup, and digital marketing books online in Pakistan. Affordable editions in PKR with Cash on Delivery.',
    featuredImage: '/src/assets/images/book_biz_marketing_1795366988599.jpg',
    imageAlt: 'Strategic Harbor marketing strategy hardcover book',
  },
  {
    slug: 'science-technology',
    name: 'Science & Technology',
    shortTitle: 'Science & Tech',
    description:
      'Accessible explorations of astrophysics, cosmology, machine intelligence, and emerging scientific frontiers written by leading researchers.',
    seoTitle: 'Science & Technology Books Online | BookNest Pakistan',
    seoDescription:
      'Buy Science and Technology books online in Pakistan including Astrophysics and Artificial Intelligence editions at discounted PKR prices.',
    featuredImage: '/src/assets/images/book_sci_cosmos_1795366985322.jpg',
    imageAlt: 'Astrophysics: The Cosmos Unveiled hardcover edition',
  },
  {
    slug: 'novels-fiction',
    name: 'Novels & Fiction',
    shortTitle: 'Novels & Fiction',
    description:
      'Captivating literary fiction, contemporary drama, and thought-provoking dystopian classics curated for avid English fiction readers.',
    seoTitle: 'English Novels Online in Pakistan | BookNest Book Store',
    seoDescription:
      'Buy English novels online in Pakistan at BookNest. Shop literary classics and contemporary fiction in crisp paperback and clothbound editions.',
    featuredImage: '/src/assets/images/book_fic_kiterunner_1795366985297.jpg',
    imageAlt: 'The Winds of August literary fiction paperback novel',
  },
  {
    slug: 'islamic-books',
    name: 'Islamic Books',
    shortTitle: 'Islamic Books',
    description:
      'Scholarly Islamic history, Prophetic biography, and cultural heritage volumes in authentic English translations and fine clothbound bindings.',
    seoTitle: 'Islamic Books Online in Pakistan | BookNest',
    seoDescription:
      'Order authentic Islamic history and Seerah books online in Pakistan. Quality clothbound and paperback editions delivered in PKR.',
    featuredImage: '/src/assets/images/book_isl_nectar_1795366985237.jpg',
    imageAlt: 'History of the Islamic World gold-embossed green hardcover book',
  },
  {
    slug: 'self-development',
    name: 'Self-Development',
    shortTitle: 'Self-Development',
    description:
      'Evidence-based guides to deep focus, deliberate habit formation, mental clarity, and sustainable personal productivity.',
    seoTitle: 'Self-Development & Productivity Books in Pakistan | BookNest',
    seoDescription:
      'Shop best selling self-development and focus books online in Pakistan. Build lasting habits and deep work routines at affordable PKR prices.',
    featuredImage: '/src/assets/images/book_self_habits_1795366985474.jpg',
    imageAlt: 'Harmony in Motion personal growth hardcover book',
  },
  {
    slug: 'education-academic',
    name: 'Education & Academic Books',
    shortTitle: 'Education & Academic',
    description:
      'Peer-reviewed university methodology textbooks, academic writing manuals, and empirical research guides built for thesis and coursework excellence.',
    seoTitle: 'Academic Books Online in Pakistan | BookNest Store',
    seoDescription:
      'Buy academic books online in Pakistan for university students and researchers. Quantitative research and academic writing guides in PKR.',
    featuredImage: '/src/assets/images/book_edu_academic_1795366987346.jpg',
    imageAlt: 'Essential Academic Writing university press paperback',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
