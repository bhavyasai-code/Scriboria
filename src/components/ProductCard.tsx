import React from 'react';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/currency';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}: ProductCardProps) {
  const discountAmount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-xl overflow-hidden hover-lift flex flex-col h-full transition-colors duration-300">
      {/* Photo Stage */}
      <div className="relative aspect-[4/5] bg-brand-ivory dark:bg-dark-bg/50 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Floating Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <span className="text-[9px] uppercase tracking-wider font-extrabold bg-brand-navy text-white px-2 py-1 rounded shadow-sm dark:bg-brand-gold dark:text-brand-navy">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="text-[9px] uppercase tracking-wider font-extrabold bg-brand-blue text-white px-2 py-1 rounded shadow-sm">
              New
            </span>
          )}
          {discountAmount > 0 && (
            <span className="text-[9px] uppercase tracking-wider font-extrabold bg-brand-sale text-white px-2 py-1 rounded shadow-sm">
              -{discountAmount}% OFF
            </span>
          )}
        </div>

        {/* Quick Wishlist Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md bg-white/95 dark:bg-dark-card/95 hover:scale-110 active:scale-95 transition-all text-brand-navy cursor-pointer ${
            isWishlisted ? 'text-brand-sale dark:text-brand-sale font-bold' : 'text-brand-muted dark:text-dark-muted hover:text-brand-navy dark:hover:text-white'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          id={`wishlist-toggle-${product.id}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover drawer panel containing Quick Add / Quick View buttons */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="flex-1 bg-white hover:bg-brand-gold hover:text-brand-navy text-brand-text py-2 px-3 rounded text-[11px] uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
            id={`quick-view-${product.id}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex-1 bg-brand-gold hover:bg-white hover:text-brand-navy text-brand-navy py-2 px-3 rounded text-[11px] uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
            id={`quick-add-${product.id}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Metadata Detail Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Category breadcrumb */}
          <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-gold dark:text-brand-gold block m-0">
            {product.category}
          </span>
          {/* Title */}
          <h4
            className="text-sm font-heading font-semibold text-brand-text dark:text-dark-text group-hover:text-brand-blue dark:group-hover:text-brand-gold transition-colors line-clamp-1 cursor-pointer"
            onClick={() => onSelectProduct(product)}
            title={product.name}
          >
            {product.name}
          </h4>
          {/* Subtle Tagline */}
          <p className="text-[11px] text-brand-muted dark:text-dark-muted line-clamp-1 italic">
            {product.tagline}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-navy/5 dark:border-dark-border">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
            <span className="text-secondary-label text-xs font-semibold text-brand-text dark:text-dark-text">
              {product.rating}
            </span>
            <span className="text-[10px] text-brand-muted dark:text-dark-muted">
              ({product.reviewCount})
            </span>
          </div>

          {/* Pricing log */}
          <div className="flex items-baseline gap-1.5">
            {product.originalPrice && (
              <span className="text-xs line-through text-brand-muted/70 dark:text-dark-muted/50 font-mono">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm font-serif font-bold text-brand-navy dark:text-brand-gold">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
