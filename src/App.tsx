import React from 'react';
import { ShoppingBag, Heart, Trash2, X, Sparkles, Star, Award, ChevronRight, Check, Newspaper } from 'lucide-react';
import { Product, Category, CartItem, Order } from './types';
import { PRODUCTS, CATEGORIES } from './data/products';
import { formatPrice, SHIPPING_THRESHOLD } from './utils/currency';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Pages/Home';
import Shop from './components/Pages/Shop';
import Checkout from './components/Pages/Checkout';
import Dashboard from './components/Pages/Dashboard';
import StaticPages from './components/Pages/StaticPages';
import ProductDetailsModal from './components/ProductDetailsModal';
import ChatBot from './components/ChatBot';

export default function App() {
  // Page Tab Controller state
  const [currentTab, setCurrentTab] = React.useState<string>('home');
  
  // Storage persist state loaders
  const [cart, setCart] = React.useState<CartItem[]>(() => {
    const saved = localStorage.getItem('scriboria_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = React.useState<Product[]>(() => {
    const saved = localStorage.getItem('scriboria_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = React.useState<Order[]>(() => {
    const saved = localStorage.getItem('scriboria_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [rewardPoints, setRewardPoints] = React.useState<number>(() => {
    const saved = localStorage.getItem('scriboria_reward_points');
    return saved ? parseInt(saved, 10) : 1500; // Baseline starting points
  });

  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('scriboria_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategoryId, setSelectedCategoryId] = React.useState('all');
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  
  // Panel triggers flags
  const [cartDrawerOpen, setCartDrawerOpen] = React.useState(false);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = React.useState(false);
  const [discountPercentage, setDiscountPercentage] = React.useState(0);

  // Synced local persistence triggers
  React.useEffect(() => {
    localStorage.setItem('scriboria_cart', JSON.stringify(cart));
  }, [cart]);

  React.useEffect(() => {
    localStorage.setItem('scriboria_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  React.useEffect(() => {
    localStorage.setItem('scriboria_orders', JSON.stringify(orders));
  }, [orders]);

  React.useEffect(() => {
    localStorage.setItem('scriboria_reward_points', String(rewardPoints));
  }, [rewardPoints]);

  React.useEffect(() => {
    localStorage.setItem('scriboria_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle SKU hash loading in URL (Dynamic routing mock)
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#sku-')) {
        const skuValue = hash.replace('#sku-', '');
        const matchingProd = PRODUCTS.find(p => p.sku === skuValue);
        if (matchingProd) {
          setSelectedProduct(matchingProd);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Shared Action Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, quantity }];
      }
    });
    // Open trigger for instant positive checkout affirmation
    setCartDrawerOpen(true);
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const nextVal = item.quantity + delta;
          return nextVal > 0 ? { ...item, quantity: nextVal } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleBuyNow = (product: Product) => {
    // Add item first
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity = Math.max(copy[existingIdx].quantity, 1);
        return copy;
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
    setSelectedProduct(null);
    setCartDrawerOpen(false);
    setCurrentTab('checkout');
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    // Increase points as custom loyalty rewards loop
    const gainedPoints = Math.round(newOrder.total * 10);
    setRewardPoints(prev => prev + gainedPoints);
    setDiscountPercentage(0); // Reset coupon rate
  };

  const handleLaunchAdvisor = () => {
    const launcher = document.getElementById('scriboria-ai-bard-launcher');
    if (launcher) launcher.click();
  };

  // Math subtotal
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Filter products for suggestions or search
  const categoriesList = CATEGORIES;
  const productsList = PRODUCTS;

  // Blog detailed articles data
  const blogPosts = [
    {
      id: 'blog-1',
      title: 'The Deceleration Practice: Mindful Hand-writing in a Digital Age',
      excerpt: 'Exploring the psychological focus loops unleashed when we decelerate and glide physical inks onto archival cotton sheets.',
      date: 'June 8, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80',
      author: 'Julian Vance'
    },
    {
      id: 'blog-2',
      title: 'The Chemistry of Florentine Honey-Formulated Watercolors',
      excerpt: 'How chestnut honey retains natural moisture coefficients, giving paints their intense, smooth, and eternal brilliance.',
      date: 'May 31, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80',
      author: 'Evelyn Sterling'
    },
    {
      id: 'blog-3',
      title: 'Fountain Pen Nib Curation: Fine vs Flex Calligraphy Nibs',
      excerpt: 'An archival guide to German iridium points, ink feed ratios, and matching paper weights to prevent common bleeding.',
      date: 'May 14, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&q=80',
      author: 'Sophia Vance'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-text dark:bg-[#070b10] dark:text-dark-text font-sans antialiased flex flex-col justify-between transition-colors duration-300">
      
      {/* 1. Header Navigation persistent layout */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cart={cart}
        wishlist={wishlist}
        theme={theme}
        toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenCartDrawer={() => setCartDrawerOpen(true)}
        onOpenWhislistDrawer={() => setWishlistDrawerOpen(true)}
      />

      {/* 2. Main Content Routing Router System */}
      <main className="flex-1">
        {/* A. HOME VIEW */}
        {currentTab === 'home' && (
          <Home
            products={productsList}
            categories={categoriesList}
            setCurrentTab={setCurrentTab}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onSelectCategory={(catId) => {
              setSelectedCategoryId(catId);
              setCurrentTab('shop');
            }}
          />
        )}

        {/* B. SHOP VIEW */}
        {currentTab === 'shop' && (
          <Shop
            products={productsList}
            categories={categoriesList}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={setSelectedProduct}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            globalSearchTerm={searchTerm}
            setGlobalSearchTerm={setSearchTerm}
          />
        )}

        {/* C. OFFERS & DEALS VIEW */}
        {currentTab === 'offers' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in text-left">
            <div className="text-center space-y-2 mb-12">
              <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full inline-block">Atelier Bargains</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white m-0">Offers &amp; Special Treatises</h1>
              <p className="text-xs sm:text-sm text-brand-muted max-w-lg mx-auto">Access exclusive promotional vouchers, flash discounts, and bonus points multipliers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: 40% discount */}
              <div className="bg-white dark:bg-dark-card border-l-[4px] border-brand-gold rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover-lift border border-brand-navy/5">
                <div className="space-y-3">
                  <span className="bg-brand-gold text-brand-navy text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">Flash Deal Act</span>
                  <p className="text-2xl font-serif font-bold text-brand-navy dark:text-brand-gold m-0">40% Off Premium Stationery</p>
                  <p className="text-xs text-brand-text/80 dark:text-dark-muted leading-relaxed">
                    Applies universally to selected notebooks, solid steel calligraphy kits, and solid solid brass rulers. Input coupon during single-page checkout.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-brand-navy/5 flex items-center justify-between gap-4 flex-wrap">
                  <span className="font-mono text-sm tracking-wider bg-brand-navy/5 dark:bg-white/5 py-1.5 px-3 rounded font-bold">SCRIBA40</span>
                  <button
                    onClick={() => {
                      setDiscountPercentage(40);
                      setCurrentTab('checkout');
                    }}
                    className="bg-brand-navy text-white hover:bg-brand-blue py-2 px-5 rounded text-xs uppercase tracking-widest font-extrabold cursor-pointer"
                  >
                    Activate Coupon
                  </button>
                </div>
              </div>

              {/* Card 2: Free calligraphy kit */}
              <div className="bg-white dark:bg-dark-card border-l-[4px] border-brand-blue rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover-lift border border-brand-navy/5">
                <div className="space-y-3">
                  <span className="bg-brand-blue text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">Club Bonus Voucher</span>
                  <p className="text-2xl font-serif font-bold text-brand-blue m-0">Complimentary Tuscan Ink Swatch</p>
                  <p className="text-xs text-brand-text/80 dark:text-dark-muted leading-relaxed">
                    Earn an elegant glass sample phial of sepia archival ink with any order exceeds {formatPrice(1000)}. Added automatically.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-brand-navy/5 flex items-center justify-between gap-4 flex-wrap">
                  <span className="font-mono text-sm tracking-wider bg-brand-navy/5 dark:bg-white/5 py-1.5 px-3 rounded font-bold">FREE-SEPIA</span>
                  <button
                    onClick={() => {
                      alert(`This complimentary offer triggers automatically in cart when subtotal is above ${formatPrice(1000)}!`);
                    }}
                    className="border border-brand-blue text-brand-blue py-2 px-5 rounded text-xs uppercase tracking-widest font-extrabold cursor-pointer"
                  >
                    Read Eligibility
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* D. BLOG STORIES SECTION VIEW */}
        {currentTab === 'blog' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in text-left">
            <div className="text-center space-y-2 mb-12">
              <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full inline-block">Scriboria Chronicles</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white m-0">The Deceleration Scribes</h1>
              <p className="text-xs sm:text-sm text-brand-muted max-w-lg mx-auto">Guides, editorial essays, and historical breakdowns detailing physical stationery design.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="group bg-white dark:bg-dark-card border border-brand-navy/5 rounded-2xl overflow-hidden hover-lift flex flex-col justify-between h-full">
                  <div>
                    <div className="aspect-video bg-brand-ivory overflow-hidden relative border-b">
                      <img src={post.image} alt={post.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-center text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white group-hover:text-brand-blue transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-brand-muted dark:text-dark-muted leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 border-t border-brand-navy/5 mt-4 flex justify-between items-center text-xs">
                    <span className="font-bold text-brand-navy dark:text-brand-gold">By {post.author}</span>
                    <button
                      onClick={() => alert(`Reading full editorial: "${post.title}" will open shortly!`)}
                      className="text-[11px] uppercase tracking-wider font-extrabold text-brand-blue flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Read Essay</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* E. LISTING CATEGORY VIEW */}
        {currentTab === 'categories' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in text-left">
            <div className="text-center space-y-2 mb-12">
              <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full inline-block">The Corners</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white m-0">Curated Workstation Categories</h1>
              <p className="text-xs sm:text-sm text-brand-muted max-w-lg mx-auto">Select a creative category to browse specific high-end volumes and materials.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categoriesList.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    setCurrentTab('shop');
                  }}
                  className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl hover-lift border border-brand-navy/10 transition-all duration-300"
                >
                  <img src={cat.image} alt={cat.name} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/40 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white text-left">
                    <span className="bg-brand-gold text-brand-navy text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                      Atelier Corner
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#E8E4DB] group-hover:text-brand-gold transition-colors">{cat.name}</h3>
                    <p className="text-xs text-brand-ivory/80 leading-relaxed line-clamp-2 italic">Curating high-end {cat.id} instruments for focused creators.</p>
                    <div className="flex items-center gap-1.5 text-xs text-brand-gold font-bold pt-2 uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300">
                      <span>Browse Corner ({cat.count}+ assets)</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* F. CHECKOUT VIEW */}
        {currentTab === 'checkout' && (
          <Checkout
            cart={cart}
            cartSubtotal={cartSubtotal}
            discountPercentage={discountPercentage}
            setDiscountPercentage={setDiscountPercentage}
            onClearCart={() => setCart([])}
            onPlaceOrder={handlePlaceOrder}
            setCurrentTab={setCurrentTab}
          />
        )}

        {/* G. DASHBOARD VIEW */}
        {currentTab === 'dashboard' && (
          <Dashboard
            orders={orders}
            rewardPoints={rewardPoints}
            setCurrentTab={setCurrentTab}
          />
        )}

        {/* H. ABOUT, FAQs, CONTACT US, POLICIES VIEWS */}
        {['about', 'contact', 'faq', 'shipping-return', 'privacy-terms'].includes(currentTab) && (
          <StaticPages
            pageType={currentTab as any}
            onLaunchAdvisor={handleLaunchAdvisor}
          />
        )}
      </main>

      {/* 3. Sliding Shopping Cart Drawer Overlay */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 dark:bg-black/85 backdrop-blur-sm flex justify-end">
          <div className="bg-brand-ivory dark:bg-dark-bg w-full max-w-md shadow-2xl p-6 flex flex-col justify-between h-full animate-fade-in text-left">
            
            {/* Header */}
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-brand-navy/10 dark:border-dark-border">
                <h3 className="text-xs uppercase tracking-widest font-extrabold text-brand-navy dark:text-brand-gold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Curator Portfolio Cart</span>
                </h3>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-brand-navy/10 text-brand-navy dark:text-white cursor-pointer"
                  id="close-cart-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items scroll */}
              <div className="space-y-4 overflow-y-auto max-h-[60vh] mt-6 pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <p className="text-xs text-brand-muted">No items in your curator portfolio yet.</p>
                    <button
                      onClick={() => {
                        setCartDrawerOpen(false);
                        setCurrentTab('shop');
                      }}
                      className="bg-brand-navy text-white text-[10px] uppercase tracking-widest font-bold font-heading py-2 px-4 rounded"
                    >
                      Curate Atelier Catalog
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-3 bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-xl">
                      <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="w-12 h-14 object-cover rounded" />
                      <div className="flex-1 overflow-hidden flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-xs font-heading font-semibold text-brand-text dark:text-white truncate" title={item.product.name}>
                            {item.product.name}
                          </p>
                          <button
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="text-brand-muted hover:text-brand-sale cursor-pointer"
                            title="Remove catalog ledger"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-brand-navy/5">
                          {/* Quantity adjustments */}
                          <div className="flex items-center gap-2 border bg-brand-ivory dark:bg-dark-bg p-0.5 rounded">
                            <button onClick={() => handleQuantityChange(item.product.id, -1)} className="px-2 font-bold cursor-pointer">-</button>
                            <span className="font-mono text-[11px] font-bold">{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item.product.id, 1)} className="px-2 font-bold cursor-pointer">+</button>
                          </div>
                          <span className="font-serif font-bold text-brand-navy dark:text-brand-gold font-mono">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Calculations subtotals CTA checkout */}
            {cart.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-brand-navy/10 dark:border-dark-border">
                <div className="flex justify-between items-baseline text-xs text-brand-muted">
                  <span>Portfolio Subtotal</span>
                  <span className="font-serif font-bold text-lg text-brand-navy dark:text-brand-gold font-mono">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartSubtotal < SHIPPING_THRESHOLD && (
                  <p className="text-[10px] text-brand-gold italic text-left block">
                    ✓ Add {formatPrice(SHIPPING_THRESHOLD - cartSubtotal)} more to unlock free cushioned postal shipping!
                  </p>
                )}
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    setCurrentTab('checkout');
                  }}
                  className="w-full bg-brand-navy hover:bg-brand-blue text-white dark:bg-brand-gold dark:text-brand-navy dark:hover:bg-brand-blue dark:hover:text-white py-4 rounded-xl text-xs uppercase tracking-widest font-extrabold shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  id="checkout-portfolio-cta"
                >
                  <span>Secure Checkout Consignment</span>
                </button>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="w-full border border-brand-navy/20 text-brand-navy dark:text-white py-3 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-brand-navy/5 text-center cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Sliding Wishlist Drawer Overlay */}
      {wishlistDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 dark:bg-black/85 backdrop-blur-sm flex justify-end">
          <div className="bg-brand-ivory dark:bg-dark-bg w-full max-w-md shadow-2xl p-6 flex flex-col justify-between h-full animate-fade-in text-left">
            
            {/* Header */}
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-brand-navy/10 dark:border-dark-border">
                <h3 className="text-xs uppercase tracking-widest font-extrabold text-brand-navy dark:text-brand-gold flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span>Curator Saved Wishlist</span>
                </h3>
                <button
                  onClick={() => setWishlistDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-brand-navy/10 text-brand-navy dark:text-white cursor-pointer"
                  id="close-wishlist-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items scroll */}
              <div className="space-y-4 overflow-y-auto max-h-[70vh] mt-6 pr-1">
                {wishlist.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <p className="text-xs text-brand-muted">No saved physical artifacts in wishlist yet.</p>
                    <button
                      onClick={() => {
                        setWishlistDrawerOpen(false);
                        setCurrentTab('shop');
                      }}
                      className="bg-brand-navy text-white text-[10px] uppercase tracking-widest font-bold py-2 px-4 rounded"
                    >
                      Browse Atelier Catalog
                    </button>
                  </div>
                ) : (
                  wishlist.map((prod) => (
                    <div key={prod.id} className="flex gap-4 p-3 bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-xl">
                      <img src={prod.image} alt={prod.name} referrerPolicy="no-referrer" className="w-12 h-14 object-cover rounded" />
                      <div className="flex-1 overflow-hidden flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <p className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">{prod.category}</p>
                            <p className="text-xs font-heading font-semibold text-brand-text dark:text-white truncate" title={prod.name}>
                              {prod.name}
                            </p>
                          </div>
                          <button
                            onClick={() => handleToggleWishlist(prod)}
                            className="text-brand-sale cursor-pointer"
                            title="Remove wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-brand-navy/5">
                          <span className="font-serif font-bold text-brand-navy dark:text-brand-gold font-mono">{formatPrice(prod.price)}</span>
                          <button
                            onClick={() => {
                              handleAddToCart(prod);
                              handleToggleWishlist(prod);
                            }}
                            className="bg-brand-gold hover:bg-brand-navy hover:text-white text-brand-navy py-1 px-2.5 rounded text-[10px] uppercase font-bold transition-colors cursor-pointer"
                          >
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom close CTA */}
            <div className="pt-6 border-t border-brand-navy/10 dark:border-dark-border">
              <button
                onClick={() => setWishlistDrawerOpen(false)}
                className="w-full bg-brand-navy hover:bg-brand-blue text-white py-3.5 rounded-xl text-xs uppercase tracking-widest font-extrabold cursor-pointer"
              >
                Close Wishlist Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Product Detail Spotlight overlays modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlist.some(w => w.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        relatedProducts={selectedProduct ? productsList.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id) : []}
        onSelectProduct={setSelectedProduct}
      />

      {/* 6. Scriboria AI Bard workspace chatbot side overlay */}
      <ChatBot
        onSelectProduct={(p) => {
          setSelectedProduct(p);
        }}
        onAddToCart={handleAddToCart}
      />

      {/* 7. Persistent beautiful Footer layout */}
      <Footer setCurrentTab={setCurrentTab} onSubscribe={(email) => console.log('Subscribed:', email)} />

    </div>
  );
}
