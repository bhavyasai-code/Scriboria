import React from 'react';
import { ArrowRight, BookOpen, Star, Sparkles, PencilLine, HelpCircle, Truck, RefreshCcw, ShieldCheck, CheckCircle } from 'lucide-react';
import { Product, Category } from '../../types';
import { formatPrice, SHIPPING_THRESHOLD } from '../../utils/currency';

interface HomeProps {
  products: Product[];
  categories: Category[];
  setCurrentTab: (tab: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectCategory: (catId: string) => void;
}

export default function Home({
  products,
  categories,
  setCurrentTab,
  onSelectProduct,
  onAddToCart,
  onSelectCategory,
}: HomeProps) {
  // Simple promo state countdown timer for 40 hours or so
  const [timeLeft, setTimeLeft] = React.useState({ hours: 14, minutes: 32, seconds: 45 });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 }; // Restart loop
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  const testimonials = [
    {
      name: 'Sophia Vance',
      role: 'Creative Writer & Editor',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      comment: 'The vegetable-tanned journal leather smells like a Tuscan museum. My fountain pen glides instantly with zero ink bleeding.'
    },
    {
      name: 'Liam S.',
      role: 'Productivity Architect',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      comment: 'Scriboria undated weekly master cron is bullet proof. It structures my chaotic days so organically without feeling too clinical.'
    },
    {
      name: 'Evelyn Sterling',
      role: 'Watercolor Scribe',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'The pure Kolinsky brush carries endless water weight while staying perfectly pin-point sharp on heavy cold-press cotton-rag.'
    }
  ];

  return (
    <div className="space-y-20 pb-20 animate-fade-in">
      {/* 1. Hero Block Section */}
      <section className="relative w-full overflow-hidden bg-brand-ivory dark:bg-[#070b10] border-b border-brand-navy/5 dark:border-dark-border py-12 md:py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Hero copywriting text */}
          <div className="space-y-6 text-left">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-brand-gold bg-brand-gold/10 px-3.5 py-1.5 rounded-full inline-block">
              CURATED EXCELLENCE &amp; FOCUS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-brand-text dark:text-white leading-[1.1] m-0">
              Books to <span className="italic block mt-1">Read</span>
              Stationery to <span className="italic text-brand-blue block mt-1">Create.</span>
            </h1>
            <p className="text-sm sm:text-base text-brand-muted dark:text-dark-muted font-sans leading-relaxed max-w-xl">
              Explore a thoughtfully curated collection of books, notebooks, journals, planners, pens, and creative essentials designed to inspire every reader and creator.
            </p>
            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setCurrentTab('shop')}
                className="bg-brand-navy hover:bg-brand-blue text-white dark:bg-brand-gold dark:text-brand-navy dark:hover:bg-brand-blue dark:hover:text-white py-3.5 px-8 rounded-lg text-xs uppercase tracking-widest font-extrabold shadow-lg transition-colors cursor-pointer"
                id="hero-shop-btn"
              >
                Shop Now
              </button>
              <button
                onClick={() => setCurrentTab('categories')}
                className="border border-brand-navy hover:bg-brand-navy hover:text-white dark:border-brand-gold dark:text-brand-gold dark:hover:bg-brand-gold dark:hover:text-brand-navy py-3.5 px-8 rounded-lg text-xs uppercase tracking-widest font-extrabold transition-all cursor-pointer"
                id="hero-explore-btn"
              >
                Explore Collections
              </button>
            </div>
          </div>

          {/* Right Hero immersive visual scene */}
          <div className="relative group aspect-video lg:aspect-square bg-brand-gold/10 dark:bg-dark-card/50 rounded-2xl overflow-hidden shadow-2xl border border-brand-navy/10 dark:border-dark-border">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-102 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=85&w=1024')" }}
            />
            {/* Dark tintoverlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent opacity-85" />
            
            {/* Floating Product Spotlight overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border-l-[3px] border-brand-gold flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-brand-muted dark:text-dark-muted font-bold">Featured Spotlight</p>
                <p className="text-xs sm:text-sm font-serif font-bold text-brand-navy dark:text-white">Bespoke Solid Brass Desk Organizer</p>
                <p className="text-xs text-brand-gold font-bold font-mono mt-0.5">{formatPrice(649)}</p>
              </div>
              <button
                onClick={() => {
                  const item = products.find(p => p.sku === 'SC-OF-110');
                  if (item) onSelectProduct(item);
                }}
                className="p-2.5 bg-brand-gold text-brand-navy font-bold rounded-lg hover:bg-brand-navy hover:text-white transition-colors cursor-pointer"
                title="View Spotlight Article"
                id="spotlight-view-btn"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-gold">Curated Corners</span>
          <h2 className="text-3xl font-serif font-bold text-brand-navy dark:text-white">Browse Collections</h2>
          <p className="text-xs sm:text-sm text-brand-muted dark:text-dark-muted max-w-lg mx-auto">Explore high-quality creative companions tailored specifically for your lifestyle and habits.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer bg-white dark:bg-dark-card rounded-xl border border-brand-navy/5 dark:border-dark-border p-4 hover-lift text-center transition-colors"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-brand-ivory dark:bg-dark-bg/40 mb-3.5 border border-brand-navy/5 dark:border-dark-border">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h4 className="text-xs sm:text-sm font-heading font-semibold text-brand-text dark:text-dark-text group-hover:text-brand-blue dark:group-hover:text-brand-gold transition-colors line-clamp-1">
                {cat.name}
              </h4>
              <p className="text-[10px] text-brand-muted dark:text-dark-muted mt-0.5">{cat.count}+ Essentials</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bestsellers Block Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 mb-8 text-left">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-gold block">Selected Bestsellers</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">The Scriboria Classics</h2>
          </div>
          <button
            onClick={() => setCurrentTab('shop')}
            className="text-xs uppercase tracking-widest font-extrabold text-brand-navy dark:text-brand-gold hover:text-brand-blue hover:translate-x-1 transition-all border-b border-brand-navy dark:border-brand-gold pb-0.5"
            id="view-all-bestsellers-btn"
          >
            View Entire Shop
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="group cursor-pointer bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-xl p-4 hover-lift flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/5] bg-brand-ivory dark:bg-dark-bg/50 rounded-lg overflow-hidden mb-4">
                  <img src={prod.image} alt={prod.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 text-[9px] uppercase tracking-wider font-extrabold bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy px-2 py-0.5 rounded">
                    Classic
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-gold block">{prod.category}</span>
                <h4 className="text-xs sm:text-sm font-heading font-semibold text-brand-text dark:text-white truncate pt-0.5">{prod.name}</h4>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-brand-navy/5 dark:border-dark-border/40">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                  <span className="text-xs font-semibold text-brand-text dark:text-white">{prod.rating}</span>
                </div>
                <span className="text-sm font-serif font-bold text-brand-navy dark:text-brand-gold">{formatPrice(prod.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Promotional countdown timer Section */}
      <section className="bg-brand-navy dark:bg-dark-card text-white py-14 overflow-hidden border-y border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Promo offer text details */}
          <div className="space-y-4 text-left">
            <span className="text-brand-gold text-xs uppercase tracking-widest font-extrabold block">Limited Time Flash Sale</span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">Save Up to 40% on Premium Stationery</h3>
            <p className="text-sm text-brand-ivory/80 dark:text-dark-muted max-w-md">
              Secure elegant linen cover bullet diaries, solid raw copper writing utensils, and bespoke mahogany watercolor brush sets with incredible discounts.
            </p>

            {/* Countdown layout */}
            <div className="flex items-center gap-4 pt-4 text-center select-none">
              <div className="bg-white/10 p-3 rounded-lg w-16">
                <span className="text-xl sm:text-2xl font-mono font-bold text-brand-gold block m-0">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#E8E4DB]">Hours</span>
              </div>
              <span className="text-brand-gold font-mono font-bold text-lg">:</span>
              <div className="bg-white/10 p-3 rounded-lg w-16">
                <span className="text-xl sm:text-2xl font-mono font-bold text-brand-gold block m-0">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#E8E4DB]">Mins</span>
              </div>
              <span className="text-brand-gold font-mono font-bold text-lg">:</span>
              <div className="bg-white/10 p-3 rounded-lg w-16">
                <span className="text-xl sm:text-2xl font-mono font-bold text-brand-gold block m-0">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#E8E4DB]">Secs</span>
              </div>
            </div>
          </div>

          {/* Call to action card */}
          <div className="bg-white/5 border border-brand-gold/30 rounded-2xl p-6 sm:p-8 space-y-4 max-w-md mx-auto lg:mr-0">
            <h4 className="text-lg font-serif font-bold text-brand-gold">Use Promo Voucher Code</h4>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
              <span className="font-mono text-base font-extrabold tracking-widest text-white">SCRIBA40</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('SCRIBA40');
                  alert('Voucher Code Copied to Clipboard!');
                }}
                className="bg-brand-gold hover:bg-white text-brand-navy py-1.5 px-3 rounded text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer"
                id="copy-voucher-btn"
              >
                Copy
              </button>
            </div>
            <p className="text-[11px] text-[#E8E4DB] italic">
              *Applies automatically during checkout. Cannot be combined with any other rewards multipliers.
            </p>
            <button
              onClick={() => setCurrentTab('shop')}
              className="w-full bg-brand-gold hover:bg-white text-brand-navy py-3 px-4 rounded-lg text-xs uppercase tracking-widest font-extrabold transition-colors cursor-pointer"
              id="promo-shop-btn"
            >
              Browse Flash Deals
            </button>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Block Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 mb-8 text-left">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-gold block">Authentic Intros</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white font-medium">New Additions To The Library</h2>
          </div>
          <button
            onClick={() => setCurrentTab('shop')}
            className="text-xs uppercase tracking-widest font-extrabold text-brand-navy dark:text-brand-gold hover:text-brand-blue hover:translate-x-1 transition-all border-b border-brand-navy dark:border-brand-gold pb-0.5"
            id="view-all-new-arrivals-btn"
          >
            View Core Catalog
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="group cursor-pointer bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-xl p-4 hover-lift flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/5] bg-brand-ivory dark:bg-dark-bg/50 rounded-lg overflow-hidden mb-4">
                  <img src={prod.image} alt={prod.name} referrerPolicy="no-referrer" className="w-full h-full object-cover animate-fade-in" />
                  <span className="absolute top-2 left-2 text-[9px] uppercase tracking-wider font-extrabold bg-brand-blue text-white px-2 py-0.5 rounded">
                    Fresh
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-gold block">{prod.category}</span>
                <h4 className="text-xs sm:text-sm font-heading font-semibold text-brand-text dark:text-white truncate pt-0.5">{prod.name}</h4>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-brand-navy/5 dark:border-dark-border/40">
                <span className="text-[10px] text-brand-muted dark:text-dark-muted font-bold font-mono">100% Cotton Paper</span>
                <span className="text-sm font-serif font-bold text-brand-navy dark:text-brand-gold">{formatPrice(prod.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Why Choose Scriboria Features Row */}
      <section className="bg-white dark:bg-dark-card border-y border-brand-navy/5 dark:border-dark-border py-14 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12 text-left sm:text-center">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.2em] font-extrabold block">Our Promise</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">Why Scribes Love Scriboria</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-4 text-left sm:text-center">
              <div className="p-3 bg-brand-gold/10 inline-block rounded-full text-brand-gold">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-sm text-brand-text dark:text-white uppercase tracking-wider">Premium Quality Products</h4>
              <p className="text-xs text-brand-muted dark:text-dark-muted leading-relaxed max-w-sm mx-auto">
                No plastic blends. We preserve real full-grain Tuscan hides, Schmidt German iridium points, and Japanese pH-neutral wood pulp pages.
              </p>
            </div>
            <div className="space-y-3 p-4 text-left sm:text-center">
              <div className="p-3 bg-brand-gold/10 inline-block rounded-full text-brand-gold">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-sm text-brand-text dark:text-white uppercase tracking-wider">Punctual &amp; Free Shipping</h4>
              <p className="text-xs text-brand-muted dark:text-dark-muted leading-relaxed max-w-sm mx-auto">
                All books and stationery tools are layered inside double cushions to prevent visual cardboard corner bent of transit, shipping entirely free of charge above {formatPrice(SHIPPING_THRESHOLD)}.
              </p>
            </div>
            <div className="space-y-3 p-4 text-left sm:text-center">
              <div className="p-3 bg-brand-gold/10 inline-block rounded-full text-brand-gold">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-sm text-brand-text dark:text-white uppercase tracking-wider">Compassionate 30x days Returns</h4>
              <p className="text-xs text-brand-muted dark:text-dark-muted leading-relaxed max-w-sm mx-auto">
                If the aesthetic alignment is not absolute, return unused packaging within a full calendar month without being charged labels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Beautiful Customer Testimonial Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12 text-left sm:text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-gold block">Voices of Creators</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">What Inspires Scribes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-xl p-6 hover-lift text-left transition-colors duration-300"
            >
              <div className="flex my-2">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                ))}
              </div>
              <p className="text-xs italic text-brand-text dark:text-white leading-relaxed mb-6 font-sans">
                "{t.comment}"
              </p>
              <div className="flex items-center gap-3 border-t border-brand-navy/5 dark:border-dark-border/45 pt-4">
                <img src={t.avatar} alt={t.name} referrerPolicy="no-referrer" className="w-9 h-9 object-cover rounded-full" />
                <div>
                  <h5 className="text-xs font-heading font-bold text-brand-navy dark:text-brand-gold m-0">{t.name}</h5>
                  <p className="text-[10px] text-brand-muted dark:text-dark-muted m-0">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
