import React from 'react';
import { Search, SlidersHorizontal, Grid3X3, Filter, X, RefreshCw, Star } from 'lucide-react';
import { Product, Category } from '../../types';
import ProductCard from '../ProductCard';

interface ShopProps {
  products: Product[];
  categories: Category[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  selectedCategoryId: string;
  setSelectedCategoryId: (catId: string) => void;
  globalSearchTerm: string;
  setGlobalSearchTerm: (term: string) => void;
}

export default function Shop({
  products,
  categories,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  selectedCategoryId,
  setSelectedCategoryId,
  globalSearchTerm,
  setGlobalSearchTerm,
}: ShopProps) {
  // Local Filter states
  const [priceRange, setPriceRange] = React.useState<string>('all');
  const [minRating, setMinRating] = React.useState<number>(0);
  const [discountOnly, setDiscountOnly] = React.useState<boolean>(false);
  const [inStockOnly, setInStockOnly] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState<boolean>(false);

  const resetFilters = () => {
    setSelectedCategoryId('all');
    setPriceRange('all');
    setMinRating(0);
    setDiscountOnly(false);
    setInStockOnly(false);
    setGlobalSearchTerm('');
    setSortBy('featured');
  };

  // Filter pipeline
  const filteredProducts = products.filter(product => {
    // 1. Search term match
    if (globalSearchTerm.trim()) {
      const term = globalSearchTerm.toLowerCase();
      const matchName = product.name.toLowerCase().includes(term);
      const matchTag = product.tagline.toLowerCase().includes(term);
      const matchDesc = product.description.toLowerCase().includes(term);
      const matchSku = product.sku.toLowerCase().includes(term);
      if (!matchName && !matchTag && !matchDesc && !matchSku) return false;
    }

    // 2. Category match
    if (selectedCategoryId !== 'all' && product.category !== selectedCategoryId) {
      return false;
    }

    // 3. Price range match
    if (priceRange !== 'all') {
      if (priceRange === 'under-300' && product.price >= 300) return false;
      if (priceRange === '300-600' && (product.price < 300 || product.price > 600)) return false;
      if (priceRange === 'over-600' && product.price <= 600) return false;
    }

    // 4. Rating match
    if (product.rating < minRating) return false;

    // 5. Discount filter
    if (discountOnly && !product.originalPrice) return false;

    // 6. Availability stock filter
    if (inStockOnly && !product.inStock) return false;

    return true;
  });

  // Sort pipeline
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'bestselling':
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      case 'newest':
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      case 'rating':
        return b.rating - a.rating;
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'featured':
      default:
        // Featured default: mix bestseller or new arrival priority
        const aScore = (a.isBestSeller ? 2 : 0) + (a.isNewArrival ? 1 : 0);
        const bScore = (b.isBestSeller ? 2 : 0) + (b.isNewArrival ? 1 : 0);
        return bScore - aScore;
    }
  });

  const categoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    return products.filter(p => p.category === catId).length;
  };

  const popularSearches = [
    'Brass Fountain Pen',
    'Tuscany Leather Journal',
    'Weekly Planner',
    'FSC Certified Books',
    'Kolinsky brushes'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-left">
      
      {/* 1. Header Banner & Smart Search bar */}
      <section className="space-y-6 mb-12">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-gold">Pristine catalog</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white m-0">The Scriboria Atelier</h1>
          <p className="text-xs sm:text-sm text-brand-muted dark:text-dark-muted max-w-xl">Curate your workstation with durable tools engineered for long focus sessions and artistic inspiration.</p>
        </div>

        {/* Input + recommendations block */}
        <div className="p-4 bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-2xl flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-brand-muted">
              <Search className="w-4.5 h-4.5" />
            </span>
            <input
              type="text"
              value={globalSearchTerm}
              onChange={(e) => setGlobalSearchTerm(e.target.value)}
              placeholder="Query by product title, brand material SKU, or taglines..."
              className="w-full pl-10 pr-4 py-3 bg-brand-ivory dark:bg-dark-bg text-brand-text dark:text-white border border-brand-navy/10 dark:border-dark-border rounded-xl text-xs placeholder:text-brand-muted/70 placeholder:italic focus:outline-none focus:border-brand-blue dark:focus:border-brand-gold transition-colors"
              id="shop-search-input"
            />
            {globalSearchTerm && (
              <button
                onClick={() => setGlobalSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-navy cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {/* Quick Clear filters */}
          <button
            onClick={resetFilters}
            className="w-full md:w-auto px-5 py-3 border border-brand-navy/15 dark:border-dark-border rounded-xl text-xs uppercase tracking-wider font-extrabold text-brand-navy dark:text-brand-gold hover:bg-brand-navy hover:text-white dark:hover:bg-dark-border dark:hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="reset-filters-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Workshop Filters</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="text-brand-muted dark:text-dark-muted font-bold font-mono text-[10px] uppercase">Trending inquiries:</span>
          {popularSearches.map((term, i) => (
            <button
              key={i}
              onClick={() => setGlobalSearchTerm(term)}
              className="bg-brand-gold/10 hover:bg-brand-gold text-brand-navy text-[10px] uppercase font-bold py-1 px-3 rounded-full transition-colors cursor-pointer border border-brand-gold/15"
            >
              {term}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Controls Row (Stats, mobile trigger, sorting) */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-b border-brand-navy/10 dark:border-dark-border mb-8">
        <p className="text-xs text-brand-muted dark:text-dark-muted font-mono uppercase font-semibold">
          Revealing <span className="text-brand-navy dark:text-brand-gold font-bold">{sortedProducts.length}</span> of {products.length} archival essentials
        </p>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile Filter and layout Trigger */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-brand-navy dark:text-brand-gold p-2 border border-brand-navy/10 dark:border-dark-border rounded-lg cursor-pointer bg-white"
          >
            <SlidersHorizontal className="w-4.5 h-4.5" />
            <span>Refine Tools ({ (selectedCategoryId !== 'all' ? 1 : 0) + (priceRange !== 'all' ? 1 : 0) + (minRating > 0 ? 1 : 0) + (discountOnly ? 1 : 0) + (inStockOnly ? 1 : 0) })</span>
          </button>

          {/* Sort Controller */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted dark:text-dark-muted hidden sm:inline block m-0">Order By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-dark-card border border-brand-navy/10 dark:border-dark-border p-2 rounded-lg text-xs font-semibold text-brand-text dark:text-dark-text focus:outline-none focus:border-brand-gold transition-colors"
              id="sort-select-dropdown"
            >
              <option value="featured">Featured Curations</option>
              <option value="bestselling">Most Requested (Bestsellers)</option>
              <option value="newest">Fresh Additions (Newest)</option>
              <option value="rating">Highest Scribe Rating (Stars)</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="alphabetical">A-Z Alphabetical</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. Core Grid & Sidebar panel layout */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Side: Desktop Filter controls Sidebar */}
        <aside className="hidden md:block md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-2xl p-6 space-y-6 sticky top-28 transition-colors duration-300">
            <div className="flex items-center justify-between border-b border-brand-navy/5 dark:border-dark-border pb-3">
              <h3 className="text-xs uppercase tracking-[0.25em] font-extrabold text-brand-navy dark:text-brand-gold flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Refine Workspace</span>
              </h3>
            </div>

            {/* A. Category Filter */}
            <div className="space-y-2.5">
              <h4 className="text-[11px] uppercase tracking-widest font-extrabold text-brand-navy dark:text-white">Collections</h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategoryId('all')}
                  className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs transition-all text-left ${
                    selectedCategoryId === 'all'
                      ? 'bg-brand-navy text-white font-semibold dark:bg-brand-gold dark:text-brand-navy'
                      : 'text-brand-muted dark:text-dark-muted hover:bg-brand-navy/5'
                  }`}
                >
                  <span className="capitalize">All Catalog</span>
                  <span className="font-mono text-[10px]">{categoryCount('all')}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs transition-all text-left ${
                      selectedCategoryId === cat.id
                        ? 'bg-brand-navy text-white font-semibold dark:bg-brand-gold dark:text-brand-navy'
                        : 'text-brand-muted dark:text-dark-muted hover:bg-brand-navy/5'
                    }`}
                  >
                    <span className="capitalize">{cat.name}</span>
                    <span className="font-mono text-[10px]">{categoryCount(cat.id)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* B. Price Range filter */}
            <div className="space-y-2.5 pt-4 border-t border-brand-navy/5 dark:border-dark-border">
              <h4 className="text-[11px] uppercase tracking-widest font-extrabold text-brand-navy dark:text-white">Price Balance</h4>
              <div className="space-y-2 text-xs">
                {['all', 'under-300', '300-600', 'over-600'].map((rangeOption) => {
                  let label = 'Any Price';
                  if (rangeOption === 'under-300') label = 'Under ₹300';
                  if (rangeOption === '300-600') label = '₹300 to ₹600';
                  if (rangeOption === 'over-600') label = 'Over ₹600';

                  return (
                    <label key={rangeOption} className="flex items-center gap-2.5 text-brand-text dark:text-dark-text cursor-pointer hover:opacity-85 select-none">
                      <input
                        type="radio"
                        name="priceRangeRadio"
                        checked={priceRange === rangeOption}
                        onChange={() => setPriceRange(rangeOption)}
                        className="accent-brand-gold w-4 h-4"
                      />
                      <span>{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* C. Minimum Star Rating filter */}
            <div className="space-y-2.5 pt-4 border-t border-brand-navy/5 dark:border-dark-border">
              <h4 className="text-[11px] uppercase tracking-widest font-extrabold text-brand-navy dark:text-white">Stars Rating</h4>
              <div className="space-y-2 text-xs">
                {[0, 4.5, 4.0].map((starVal) => {
                  let label = 'Any Rating score';
                  if (starVal === 4.5) label = '4.5 ★ & Above';
                  if (starVal === 4.0) label = '4.0 ★ & Above';

                  return (
                    <label key={starVal} className="flex items-center gap-2.5 text-brand-text dark:text-dark-text cursor-pointer hover:opacity-85 select-none">
                      <input
                        type="radio"
                        name="ratingRadio"
                        checked={minRating === starVal}
                        onChange={() => setMinRating(starVal)}
                        className="accent-brand-gold w-4 h-4"
                      />
                      <span className="flex items-center gap-1">
                        {label} {starVal > 0 && <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* D. Additional Boolean Checks */}
            <div className="space-y-2.5 pt-4 border-t border-brand-navy/5 dark:border-dark-border">
              <h4 className="text-[11px] uppercase tracking-widest font-extrabold text-brand-navy dark:text-white">Workspace State</h4>
              <div className="space-y-3 text-xs">
                <label className="flex items-center gap-2.5 text-brand-text dark:text-dark-text cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={discountOnly}
                    onChange={(e) => setDiscountOnly(e.target.checked)}
                    className="accent-brand-gold w-4.5 h-4.5 rounded"
                  />
                  <span>Exclusive Special Offers</span>
                </label>
                <label className="flex items-center gap-2.5 text-brand-text dark:text-dark-text cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-brand-gold w-4.5 h-4.5 rounded"
                  />
                  <span>Show Only Available Stock</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side: core Product Cards responsive Grid */}
        <div className="col-span-1 md:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="p-16 bg-white dark:bg-dark-card rounded-2xl border border-brand-navy/5 dark:border-dark-border text-center space-y-4 animate-fade-in transition-colors duration-300">
              <div className="text-4xl text-brand-gold inline-block p-4 bg-brand-gold/10 rounded-full">🔍</div>
              <h3 className="text-lg font-serif font-bold text-brand-navy dark:text-white">No Archival Essentials Fit Your Filters</h3>
              <p className="text-xs text-brand-muted dark:text-dark-muted max-w-sm mx-auto">
                Try widening your inquiry parameters, typing less specific keywords, or selecting another collection.
              </p>
              <button
                onClick={resetFilters}
                className="bg-brand-navy text-white px-6 py-2 rounded text-xs uppercase tracking-widest font-extrabold cursor-pointer hover:bg-brand-blue"
              >
                Reveal All Assets
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isWishlisted={wishlist.some(w => w.id === prod.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Collapsible Mobile Filter Side Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 dark:bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="bg-brand-ivory dark:bg-dark-bg w-full max-w-xs p-6 shadow-2xl flex flex-col justify-between h-full animate-fade-in text-left">
            <div className="space-y-6 overflow-y-auto pr-1">
              {/* Header drawer controls */}
              <div className="flex justify-between items-center pb-3 border-b border-brand-navy/10 dark:border-dark-border">
                <h3 className="text-xs uppercase tracking-widest font-extrabold text-brand-navy dark:text-white">Filter Workshop</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-brand-navy/10 text-brand-navy dark:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Collections list */}
              <div className="space-y-2">
                <h4 className="text-[11px] uppercase tracking-wider font-extrabold text-brand-navy dark:text-white">Collections</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategoryId('all');
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full flex justify-between py-1 px-2 text-xs rounded ${
                      selectedCategoryId === 'all' ? 'bg-brand-navy text-white font-semibold' : 'text-brand-muted hover:bg-brand-navy/5'
                    }`}
                  >
                    <span>All Collections</span>
                    <span>({categoryCount('all')})</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryId(cat.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full flex justify-between py-1 px-2 text-xs rounded ${
                        selectedCategoryId === cat.id ? 'bg-brand-navy text-white font-semibold' : 'text-brand-muted hover:bg-brand-navy/5'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span>({categoryCount(cat.id)})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price level */}
              <div className="space-y-2.5 pt-4 border-t border-brand-navy/10">
                <h4 className="text-[11px] uppercase tracking-wider font-extrabold text-brand-navy dark:text-white">Price boundaries</h4>
                <div className="space-y-2 text-xs">
                  {['all', 'under-300', '300-600', 'over-600'].map((r) => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={priceRange === r}
                        onChange={() => {
                          setPriceRange(r);
                          setMobileFilterOpen(false);
                        }}
                        className="accent-brand-gold"
                      />
                      <span>
                        {r === 'all'
                          ? 'Any Price'
                          : r === 'under-300'
                          ? 'Under ₹300'
                          : r === '300-600'
                          ? '₹300 to ₹600'
                          : 'Over ₹600'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Advanced Boolean status checks */}
              <div className="space-y-2.5 pt-4 border-t border-brand-navy/10">
                <h4 className="text-[11px] uppercase tracking-wider font-extrabold text-brand-navy dark:text-white">Archival Filters</h4>
                <div className="space-y-2.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={discountOnly} onChange={(e) => setDiscountOnly(e.target.checked)} className="accent-brand-gold" />
                    <span>On Sale / Offer Items</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="accent-brand-gold" />
                    <span>In-Stock Only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Sticky Reset/Close block */}
            <div className="space-y-2 pt-4 border-t border-brand-navy/10">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full bg-brand-navy text-white text-xs uppercase tracking-widest font-extrabold py-3 rounded-lg"
              >
                Restart Session Filters
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full border border-brand-navy/20 text-brand-navy dark:text-white text-xs uppercase tracking-widest font-extrabold py-3 rounded-lg"
              >
                Close Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
