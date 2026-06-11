import React from 'react';
import { Search, Heart, ShoppingBag, User, Sun, Moon, Menu, X, HelpCircle, Sparkles } from 'lucide-react';
import { CartItem, Product } from '../types';
import ScriboriaLogo from './ScriboriaLogo';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cart: CartItem[];
  wishlist: Product[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onOpenCartDrawer: () => void;
  onOpenWhislistDrawer: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  cart,
  wishlist,
  theme,
  toggleTheme,
  searchTerm,
  setSearchTerm,
  onOpenCartDrawer,
  onOpenWhislistDrawer,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'categories', label: 'Collections' },
    { id: 'offers', label: 'Offers' },
    { id: 'blog', label: 'Stories' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-ivory/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-brand-navy/10 dark:border-dark-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentTab('home')}
              className="text-left select-none focus:outline-none group focus-visible:ring-2 focus-visible:ring-brand-gold/50 rounded-lg p-1"
              id="sc-header-logo-btn"
            >
              <ScriboriaLogo variant="horizontal" size="custom" iconClassName="w-11 h-11" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-brand-muted dark:text-dark-muted">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`relative py-2 hover:text-brand-navy dark:hover:text-white transition-colors cursor-pointer ${
                  currentTab === item.id || (item.id === 'shop' && ['books', 'stationery', 'journals', 'planners', 'art-supplies', 'office'].includes(currentTab))
                    ? 'text-brand-navy dark:text-brand-gold font-bold'
                    : ''
                }`}
                id={`nav-item-${item.id}`}
              >
                {item.label}
                {(currentTab === item.id || (item.id === 'shop' && ['books', 'stationery', 'journals', 'planners', 'art-supplies', 'office'].includes(currentTab))) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold rounded-full animate-fade-in" />
                )}
              </button>
            ))}
          </nav>

          {/* Search, Wishlist, Cart & Profile Actions */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search input bar */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-brand-muted/70">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (currentTab !== 'shop') setCurrentTab('shop');
                }}
                placeholder="Search catalog..."
                className="w-56 pl-9 pr-4 py-2 bg-white dark:bg-dark-card border border-brand-navy/10 dark:border-dark-border rounded-full text-xs placeholder:text-brand-muted/60 dark:placeholder:text-dark-muted/60 focus:outline-none focus:border-brand-blue dark:focus:border-brand-gold italic text-brand-text dark:text-dark-text transition-all"
                id="header-search-input"
              />
            </div>

            <div className="flex items-center gap-4 text-brand-navy dark:text-dark-text">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                id="header-theme-toggle"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-brand-gold" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={onOpenWhislistDrawer}
                className="p-2 rounded-full hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors cursor-pointer relative"
                title="Wishlist"
                id="header-wishlist-toggle"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-brand-sale rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Icon */}
              <button
                onClick={onOpenCartDrawer}
                className="p-2 rounded-full hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors cursor-pointer relative"
                title="Cart"
                id="header-cart-toggle"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-brand-gold rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account */}
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`p-2 rounded-full hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1 ${
                  currentTab === 'dashboard' ? 'text-brand-gold' : ''
                }`}
                title="User Dashboard"
                id="header-dashboard-toggle"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Small Device Actions + Hamburger Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors text-brand-navy dark:text-dark-text cursor-pointer"
              id="header-theme-toggle-mobile"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onOpenWhislistDrawer}
              className="p-1.5 rounded-full hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors text-brand-navy dark:text-dark-text relative cursor-pointer"
              id="header-wishlist-toggle-mobile"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-sale text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={onOpenCartDrawer}
              className="p-1.5 rounded-full hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors text-brand-navy dark:text-dark-text relative cursor-pointer"
              id="header-cart-toggle-mobile"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors text-brand-navy dark:text-dark-text cursor-pointer"
              aria-label="Toggle mobile menu"
              id="header-menu-toggle-mobile"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-navy/10 dark:border-dark-border bg-white dark:bg-dark-card py-4 px-6 animate-fade-in transition-colors duration-300">
          {/* Mobile search bar */}
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-brand-muted/70">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (currentTab !== 'shop') setCurrentTab('shop');
              }}
              placeholder="Search catalog..."
              className="w-full pl-9 pr-4 py-2 bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border rounded-full text-xs placeholder:text-brand-muted/60 dark:placeholder:text-dark-muted/60 focus:outline-none italic text-brand-text dark:text-dark-text focus:border-brand-gold"
              id="header-search-input-mobile"
            />
          </div>

          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-left text-sm font-semibold tracking-wider uppercase ${
                  currentTab === item.id
                    ? 'text-brand-gold border-l-2 border-brand-gold pl-2'
                    : 'text-brand-muted dark:text-dark-muted hover:text-brand-navy dark:hover:text-white'
                }`}
                id={`nav-item-mobile-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setCurrentTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-left text-sm font-semibold tracking-wider uppercase flex items-center gap-2 ${
                currentTab === 'dashboard'
                  ? 'text-brand-gold border-l-2 border-brand-gold pl-2'
                  : 'text-brand-muted dark:text-dark-muted'
              }`}
              id="nav-item-mobile-dashboard"
            >
              <User className="w-4 h-4" /> Account Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
