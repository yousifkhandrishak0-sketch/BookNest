import { useEffect } from 'react';
import { Award, BookOpen, ShieldCheck, Users } from 'lucide-react';
import { TESTIMONIALS } from '../data/books';
import { useRouter } from '../context/RouterContext';
import { applyPageSeo } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NewsletterSection } from '../components/NewsletterSection';

export function AboutPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    applyPageSeo({
      title: 'About Us | BookNest – Pakistan’s Modern Online Book Store',
      description:
        'Learn about BookNest’s mission, vision, and commitment to making authentic Computer Science, Academic, Fiction, and Islamic books accessible across Pakistan in PKR.',
      canonicalPath: '/about',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
      ],
    });
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'About Us' }]} />

        {/* Editorial Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E85D22]">
              About BookNest Pakistan
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1E36] leading-tight">
              Connecting Readers Across Pakistan With Books That Matter
            </h1>
            <p className="text-base text-[#526075] leading-relaxed">
              BookNest was founded to modernize online book shopping in Pakistan—bridging historic publishing hubs with university campuses, software houses, and home libraries in every province.
            </p>
            <p className="text-base text-[#526075] leading-relaxed">
              Whether you are sourcing an Algorithms textbook in Lahore, a Digital Marketing strategy guide in Karachi, or a clothbound Islamic history edition in Islamabad, we prioritize crisp print quality, transparent PKR pricing, and dependable Cash on Delivery.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="rounded-md bg-[#E85D22] px-6 py-3 text-sm font-semibold text-white hover:bg-[#CF4E17] transition-colors cursor-pointer"
              >
                Explore Our Catalog
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-72 sm:h-96 lg:h-full overflow-hidden rounded-xl border border-[#E3E7EE]">
              <img
                src="/src/assets/images/about_editorial_books_1795366985567.jpg"
                alt="Curated stack of hardcover books on a sunlit oak desk at BookNest"
                loading="eager"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <section className="rounded-lg border border-[#E3E7EE] bg-white p-8 space-y-3">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">Our Mission</h2>
            <p className="text-sm sm:text-base text-[#526075] leading-relaxed">
              To make authentic academic textbooks, programming handbooks, English novels, and scholarly books effortless and affordable to order online in Pakistan—eliminating fragmented local sourcing, opaque pricing, and damaged deliveries.
            </p>
          </section>

          <section className="rounded-lg border border-[#E3E7EE] bg-white p-8 space-y-3">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">Our Vision</h2>
            <p className="text-sm sm:text-base text-[#526075] leading-relaxed">
              To become Pakistan’s most trusted digital bookstore and reading community—empowering students, researchers, and lifelong learners from metropolitan centers to remote districts with equitable access to knowledge.
            </p>
          </section>
        </div>

        {/* Why Choose BookNest */}
        <section className="mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F1E36] mb-8">
            Why Readers Choose BookNest
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg border border-[#E3E7EE] bg-white p-6 space-y-2.5">
              <BookOpen className="h-6 w-6 text-[#E85D22]" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-[#0F1E36]">
                Curated Subject Depth
              </h3>
              <p className="text-sm text-[#526075] leading-relaxed">
                Every title across our 8 categories is vetted for edition accuracy, readable typography, and durable binding.
              </p>
            </div>
            <div className="rounded-lg border border-[#E3E7EE] bg-white p-6 space-y-2.5">
              <Award className="h-6 w-6 text-[#E85D22]" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-[#0F1E36]">
                Student-Friendly PKR Pricing
              </h3>
              <p className="text-sm text-[#526075] leading-relaxed">
                Consistent 20%–25% discounts off list prices plus dedicated campus promo codes like STUDENT15.
              </p>
            </div>
            <div className="rounded-lg border border-[#E3E7EE] bg-white p-6 space-y-2.5">
              <ShieldCheck className="h-6 w-6 text-[#E85D22]" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-[#0F1E36]">
                Protective Packaging
              </h3>
              <p className="text-sm text-[#526075] leading-relaxed">
                Corner-guarded kraft sleeves ensure hardcover spines and paperback corners reach your doorstep unscathed.
              </p>
            </div>
            <div className="rounded-lg border border-[#E3E7EE] bg-white p-6 space-y-2.5">
              <Users className="h-6 w-6 text-[#E85D22]" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-[#0F1E36]">
                Reader-First Satisfaction
              </h3>
              <p className="text-sm text-[#526075] leading-relaxed">
                Easy 7-day replacement guarantee for any misprint or transit issue anywhere in Pakistan.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-[#0F1E36] mb-6">
            Community Voices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.id}
                className="rounded-lg border border-[#E3E7EE] bg-white p-6 flex flex-col justify-between"
              >
                <blockquote className="text-sm text-[#0F1E36] leading-relaxed">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-[#E3E7EE]">
                  <p className="text-sm font-semibold text-[#0F1E36]">{t.name}</p>
                  <p className="text-xs text-[#526075]">
                    {t.role}, {t.organization} ({t.city})
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>

      <NewsletterSection />
    </div>
  );
}
