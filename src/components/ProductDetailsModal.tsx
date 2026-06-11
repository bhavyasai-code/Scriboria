import React from 'react';
import { X, Star, Heart, ShoppingBag, ArrowRight, Share2, ShieldCheck, CheckCircle, RefreshCcw, Truck } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, SHIPPING_THRESHOLD } from '../utils/currency';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product) => void;
  relatedProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetailsModal({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  relatedProducts,
  onSelectProduct,
}: ProductDetailsModalProps) {
  const [activeImage, setActiveImage] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'specs' | 'reviews'>('overview');
  const [shared, setShared] = React.useState(false);

  React.useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setQuantity(1);
      setActiveTab('overview');
    }
  }, [product]);

  if (!product) return null;

  const handleShare = () => {
    setShared(true);
    navigator.clipboard.writeText(`${window.location.origin}/#sku-${product.sku}`);
    setTimeout(() => setShared(false), 3000);
  };

  const imagesList = product.additionalImages && product.additionalImages.length > 0
    ? product.additionalImages
    : [product.image];

  // Dummy reviews representing a highly polished premium collection
  const mockReviews = [
    {
      id: 'rev-01',
      name: 'Julian Vance',
      rating: 5,
      date: 'June 4, 2026',
      content: 'This exceeds all expectations. The paper sizing is pristine; my fountain pen glide is instantaneous and leaves an elegant physical ink trail with zero feathering.',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80'
    },
    {
      id: 'rev-02',
      name: 'Haruki S.',
      rating: 5,
      date: 'May 28, 2026',
      content: 'True Muji and Moleskine craftsmanship with premium leather scents. Excellent flat lay structure which is ideal for drawing raw drafts.',
      verified: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-ivory dark:bg-dark-bg w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-brand-navy/10 dark:border-dark-border max-h-[90vh] flex flex-col md:flex-row transition-all duration-300">
        
        {/* Left Side: Images & Slideshow */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between border-r border-brand-navy/10 dark:border-dark-border bg-white dark:bg-dark-card overflow-y-auto">
          <div>
            <div className="flex justify-between items-center mb-4 md:hidden">
              <span className="text-xs uppercase tracking-widest font-extrabold text-brand-gold">{product.category}</span>
              <button onClick={onClose} className="p-1 rounded-full bg-brand-navy/5 dark:bg-white/5 text-brand-navy dark:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Stage Image */}
            <div className="aspect-square bg-brand-ivory dark:bg-dark-bg rounded-lg overflow-hidden relative border border-brand-navy/5 dark:border-dark-border">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all"
              />
              {product.originalPrice && (
                <span className="absolute top-4 left-4 bg-brand-sale text-white text-[10px] uppercase tracking-wider font-extrabold px-2 py-1 rounded shadow">
                  Discount Offer
                </span>
              )}
            </div>

            {/* Thumbnails list */}
            {imagesList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded border-2 overflow-hidden flex-shrink-0 cursor-pointer ${
                      activeImage === img ? 'border-brand-gold' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Secure Trust Badges Block */}
          <div className="hidden md:grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-brand-navy/5 dark:border-dark-border text-[11px] text-brand-muted dark:text-dark-muted">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-gold" />
              <div>
                <p className="font-bold text-brand-navy dark:text-white uppercase tracking-wider">Free Shipping</p>
                <p>On orders above {formatPrice(SHIPPING_THRESHOLD)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCcw className="w-4 h-4 text-brand-gold" />
              <div>
                <p className="font-bold text-brand-navy dark:text-white uppercase tracking-wider">Easy Returns</p>
                <p>30 days return window</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <div>
                <p className="font-bold text-brand-navy dark:text-white uppercase tracking-wider">Secure Checkout</p>
                <p>PCI DSS certified gateway</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-brand-gold" />
              <div>
                <p className="font-bold text-brand-navy dark:text-white uppercase tracking-wider">Curated Origin</p>
                <p>Original brand packaging</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Copywriting details & Shopping carts actions */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Header control */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <span className="text-xs uppercase tracking-widest font-extrabold text-brand-gold">{product.category}</span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-brand-navy/10 dark:hover:bg-white/10 text-brand-navy dark:text-white transition-all cursor-pointer"
                id="close-modal-btn"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Title */}
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white tracking-tight">
              {product.name}
            </h2>
            <p className="text-sm italic text-brand-muted dark:text-dark-muted mt-1.5">{product.tagline}</p>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-brand-gold fill-brand-gold'
                        : 'text-brand-navy/10 dark:text-white/10'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-brand-text dark:text-dark-text mt-0.5">
                {product.rating} ({product.reviewCount} customer reviews)
              </span>
            </div>

            {/* Price line */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-brand-gold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm line-through text-brand-muted/70 dark:text-dark-muted/60 font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-bold text-brand-sale uppercase bg-brand-sale/10 px-2 py-0.5 rounded">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* SKU and Stock indicators */}
            <div className="grid grid-cols-2 gap-2 text-xs text-brand-muted dark:text-dark-muted mt-4 py-3 border-y border-brand-navy/5 dark:border-dark-border">
              <div>
                <span className="font-semibold uppercase tracking-wider text-brand-navy dark:text-white block">SKU Identity</span>
                <span className="font-mono">{product.sku}</span>
              </div>
              <div>
                <span className="font-semibold uppercase tracking-wider text-brand-navy dark:text-white block">Availability</span>
                <span className={product.inStock ? 'text-brand-success font-semibold' : 'text-brand-sale font-semibold'}>
                  {product.inStock ? '✓ Archival stock ready' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Tabs Controller */}
            <div className="flex border-b border-brand-navy/5 dark:border-dark-border mt-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-4 text-xs uppercase tracking-widest font-extrabold border-b-2 cursor-pointer transition-all ${
                  activeTab === 'overview'
                    ? 'border-brand-gold text-brand-navy dark:text-brand-gold'
                    : 'border-transparent text-brand-muted dark:text-dark-muted hover:text-brand-navy'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-2 px-4 text-xs uppercase tracking-widest font-extrabold border-b-2 cursor-pointer transition-all ${
                  activeTab === 'specs'
                    ? 'border-brand-gold text-brand-navy dark:text-brand-gold'
                    : 'border-transparent text-brand-muted dark:text-dark-muted hover:text-brand-navy'
                }`}
              >
                Archival Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-4 text-xs uppercase tracking-widest font-extrabold border-b-2 cursor-pointer transition-all ${
                  activeTab === 'reviews'
                    ? 'border-brand-gold text-brand-navy dark:text-brand-gold'
                    : 'border-transparent text-brand-muted dark:text-dark-muted hover:text-brand-navy'
                }`}
              >
                Creator Reviews
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-4 text-sm leading-relaxed max-h-[14rem] overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-3">
                  <p className="text-brand-text/90 dark:text-dark-text/90">{product.description}</p>
                  <ul className="space-y-2">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <span className="text-brand-gold text-base leading-none">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'specs' && (
                <table className="w-full text-xs text-left">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr key={idx} className="border-b border-brand-navy/5 dark:border-dark-border/40">
                        <td className="py-2.5 font-bold text-brand-navy dark:text-brand-gold capitalize w-1/3">{key}</td>
                        <td className="py-2.5 text-brand-text dark:text-dark-text">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {mockReviews.map((rev) => (
                    <div key={rev.id} className="p-3 bg-white dark:bg-dark-card rounded shadow-xs border border-brand-navy/5 dark:border-dark-border/40">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-extrabold text-brand-navy dark:text-brand-gold flex items-center gap-1">
                          {rev.name}
                          {rev.verified && <span className="bg-brand-success/10 text-brand-success text-[8px] font-bold uppercase rounded px-1">Verified Buyer</span>}
                        </span>
                        <span className="text-brand-muted dark:text-dark-muted text-[10px]">{rev.date}</span>
                      </div>
                      <div className="flex my-1">
                        {[...Array(rev.rating)].map((_, r) => (
                          <Star key={r} className="w-3 h-3 text-brand-gold fill-brand-gold" />
                        ))}
                      </div>
                      <p className="text-xs italic text-brand-text dark:text-dark-text mt-1">{rev.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Shopping controls */}
          <div className="mt-6 pt-6 border-t border-brand-navy/5 dark:border-dark-border space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity controller */}
              <div className="flex items-center border border-brand-navy/10 dark:border-dark-border bg-white dark:bg-dark-card rounded-lg p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 font-bold text-brand-navy dark:text-white cursor-pointer hover:bg-brand-navy/5 rounded"
                >
                  -
                </button>
                <span className="px-3 font-mono font-bold text-brand-navy dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 font-bold text-brand-navy dark:text-white cursor-pointer hover:bg-brand-navy/5 rounded"
                >
                  +
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex-1 flex gap-2">
                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    setQuantity(1);
                  }}
                  disabled={!product.inStock}
                  className="flex-1 bg-brand-navy hover:bg-brand-blue text-white disabled:bg-brand-muted dark:bg-brand-navy dark:hover:bg-brand-blue py-3 rounded-lg text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow cursor-pointer active:scale-95 transition-all"
                  id="modal-add-to-cart-btn"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={() => onBuyNow(product)}
                  disabled={!product.inStock}
                  className="flex-1 bg-brand-gold hover:bg-opacity-90 text-brand-navy disabled:bg-brand-muted py-3 rounded-lg text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow cursor-pointer active:scale-95 transition-all"
                  id="modal-buy-now-btn"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Wishlist toggle & Share link row */}
            <div className="flex items-center justify-between text-xs py-1">
              <button
                onClick={() => onToggleWishlist(product)}
                className="text-brand-navy dark:text-dark-text hover:text-brand-sale dark:hover:text-brand-sale flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
                id="modal-wishlist-btn"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-brand-sale' : ''}`} />
                <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={handleShare}
                className="text-brand-navy dark:text-dark-text hover:text-brand-blue dark:hover:text-brand-gold flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
                id="modal-share-btn"
              >
                <Share2 className="w-4 h-4" />
                <span>{shared ? 'Copied SKU Link!' : 'Copy SKU Reference'}</span>
              </button>
            </div>
          </div>

          {/* Related products recommendation row */}
          {relatedProducts.length > 0 && (
            <div className="mt-8 pt-6 border-t border-brand-navy/5 dark:border-dark-border hidden lg:block">
              <h5 className="text-xs uppercase tracking-[0.2em] font-extrabold text-brand-gold mb-3">Often Bought Together</h5>
              <div className="grid grid-cols-2 gap-3">
                {relatedProducts.slice(0, 2).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="flex items-center gap-3 p-2 bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded hover:border-brand-gold cursor-pointer transition-all"
                  >
                    <img src={rel.image} alt={rel.name} referrerPolicy="no-referrer" className="w-10 h-10 object-cover rounded" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-brand-text dark:text-white truncate">{rel.name}</p>
                      <p className="text-[10px] text-brand-gold font-bold font-mono">{formatPrice(rel.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
