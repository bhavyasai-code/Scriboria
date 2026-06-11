import React from 'react';
import { ShoppingBag, CreditCard, Gift, ShieldAlert, BadgeCheck, Phone, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { CartItem, Product, Order } from '../../types';
import { formatPrice, SHIPPING_THRESHOLD, SHIPPING_FEE } from '../../utils/currency';

interface CheckoutProps {
  cart: CartItem[];
  cartSubtotal: number;
  discountPercentage: number;
  setDiscountPercentage: (val: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: Order) => void;
  setCurrentTab: (tab: string) => void;
}

export default function Checkout({
  cart,
  cartSubtotal,
  discountPercentage,
  setDiscountPercentage,
  onClearCart,
  onPlaceOrder,
  setCurrentTab,
}: CheckoutProps) {
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [couponCode, setCouponCode] = React.useState('');
  const [couponError, setCouponError] = React.useState('');
  const [couponSuccess, setCouponSuccess] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [completedOrder, setCompletedOrder] = React.useState<Order | null>(null);

  // Math totals
  const shippingFee = cartSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const discountAmount = cartSubtotal * (percentageToFraction(discountPercentage));
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  function percentageToFraction(pct: number) {
    return pct / 100;
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'SCRIBA40') {
      setDiscountPercentage(40);
      setCouponSuccess('✓ Welcome! 40% Off coupon code applied successfully!');
    } else if (code === 'CLUB10') {
      setDiscountPercentage(10);
      setCouponSuccess('✓ Scriboria Club 10% voucher code applied!');
    } else {
      setCouponError('Invalid voucher code. Try "SCRIBA40" or "CLUB10"');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    setTimeout(() => {
      const placed: Order = {
        id: `SC-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        status: 'processing',
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        })),
        total: finalTotal,
        shippingAddress: `${address}, ${city}, ZIP ${zip}`,
        paymentMethod: paymentMethod === 'card' ? 'Visa ending in 4242' : paymentMethod === 'upi' ? 'UPI Instant Pay' : 'Cash on Delivery'
      };

      onPlaceOrder(placed);
      setCompletedOrder(placed);
      onClearCart();
      setLoading(false);
    }, 1500);
  };

  // 1. Success Invoice Panel
  if (completedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in text-left">
        <div className="inline-block p-4 bg-brand-success/10 rounded-full text-brand-success text-5xl">
          ✓
        </div>
        <div className="space-y-2 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-gold">Order Dispatched</span>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-white m-0">Your Legacy Awaits</h1>
          <p className="text-xs text-brand-muted dark:text-dark-muted">Thank you for your trust. Scribes are preparing your custom packaging.</p>
        </div>

        {/* Invoice details */}
        <div className="bg-white dark:bg-dark-card border border-brand-navy/10 dark:border-dark-border rounded-2xl p-6 text-xs text-brand-text dark:text-dark-text space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-brand-navy/10 dark:border-dark-border">
            <span className="font-bold uppercase tracking-wider">Transaction Invoice ID</span>
            <span className="font-mono text-brand-gold font-bold">{completedOrder.id}</span>
          </div>

          <div className="space-y-2">
            <p className="font-bold uppercase tracking-wider text-[10px] text-brand-muted">Consignment contents:</p>
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="truncate max-w-[70%] italic">{item.name} <span className="font-bold">x{item.quantity}</span></span>
                <span className="font-mono">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-brand-navy/10 dark:border-dark-border space-y-1">
            <div className="flex justify-between">
              <span>FSC shipping board packaging</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between text-base font-bold text-brand-navy dark:text-brand-gold pt-1">
              <span>Consignment Total</span>
              <span className="font-mono">{formatPrice(completedOrder.total)}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-brand-navy/10 dark:border-dark-border/40 space-y-1.5 text-brand-muted dark:text-dark-muted">
            <p><strong>Full Consignment Destination:</strong> {completedOrder.shippingAddress}</p>
            <p><strong>Method selected:</strong> {completedOrder.paymentMethod}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => setCurrentTab('shop')}
            className="bg-brand-navy hover:bg-brand-blue text-white py-3 px-6 rounded-lg text-xs uppercase tracking-widest font-extrabold cursor-pointer"
          >
            Explore More Essentials
          </button>
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="border border-brand-navy py-3 px-6 rounded-lg text-xs uppercase tracking-widest font-extrabold cursor-pointer text-brand-navy dark:text-brand-gold dark:border-brand-gold"
          >
            Track Order Status
          </button>
        </div>
      </div>
    );
  }

  // 2. Empty card warning check
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6 text-left">
        <div className="text-4xl">🛒</div>
        <h2 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">Workspace Planners Empty</h2>
        <p className="text-xs text-brand-muted dark:text-dark-muted">Select leather journals, Schmidt iridium metal pens, or books before invoking secure checkouts.</p>
        <button
          onClick={() => setCurrentTab('shop')}
          className="bg-brand-gold text-brand-navy px-6 py-3 rounded-lg text-xs uppercase tracking-widest font-bold font-heading inline-block hover:bg-brand-navy hover:text-white transition-colors cursor-pointer"
        >
          Explore Scriboria Atelier
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-left">
      <div className="flex items-center gap-2 mb-8 text-xs font-semibold text-brand-muted hover:text-brand-navy cursor-pointer" onClick={() => setCurrentTab('shop')}>
        <ArrowLeft className="w-4 h-4" />
        <span>Return to curated shop</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Address form credentials & payment options */}
        <div className="lg:col-span-7">
          <form onSubmit={handleCheckoutSubmit} className="space-y-8" id="checkout-main-form">
            
            {/* Context credentials section */}
            <div className="bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-serif font-bold text-brand-navy dark:text-brand-gold border-b border-brand-navy/5 pb-3">
                Consignment Destination details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted dark:text-dark-muted">First name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="E.g. Alexander"
                    className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border rounded-lg py-2.5 px-3 text-xs text-brand-text dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted dark:text-dark-muted">Last name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Sterling"
                    className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border rounded-lg py-2.5 px-3 text-xs text-brand-text dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted dark:text-dark-muted">Despatched address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street and house index coordinate"
                  className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border rounded-lg py-2.5 px-3 text-xs text-brand-text dark:text-white focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted dark:text-dark-muted">City domicile</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Milan"
                    className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border rounded-lg py-2.5 px-3 text-xs text-brand-text dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted dark:text-dark-muted">ZIP postal code</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="20121"
                    className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border rounded-lg py-2.5 px-3 text-xs text-brand-text dark:text-white focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted dark:text-dark-muted">Primary Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+39 02 123456"
                    className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border rounded-lg py-2.5 px-3 text-xs text-brand-text dark:text-white focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted dark:text-dark-muted">Creative Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="scribe@domain.com"
                    className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border rounded-lg py-2.5 px-3 text-xs text-brand-text dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            {/* Secure PCIe Payment selection segment */}
            <div className="bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-serif font-bold text-brand-navy dark:text-brand-gold border-b border-brand-navy/5 pb-3">
                Secure payment selector
              </h2>

              <div className="space-y-3">
                {/* Option 1: Credit card */}
                <label className="flex items-start gap-3 p-4 border border-brand-navy/10 dark:border-dark-border rounded-xl cursor-pointer hover:bg-brand-navy/5 select-none text-left">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-brand-gold mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-brand-gold" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-brand-text dark:text-white">Credit / Debit Card secure</span>
                    </div>
                    <p className="text-[10px] text-brand-muted dark:text-dark-muted mt-1 leading-relaxed">
                      We support Visa, Mastercard, American Express, and major corporate debit credentials. Processing is fully encrypted.
                    </p>
                    {paymentMethod === 'card' && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in text-xs text-left">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            placeholder="Card digit key: 4242 4242 4242 4242"
                            className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border px-3 py-2 rounded text-xs font-mono"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="EXP Date: 12/28"
                            className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border px-3 py-2 rounded text-xs font-mono"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="CVC safety: 123"
                            className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border px-3 py-2 rounded text-xs font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Option 2: UPI / Digital */}
                <label className="flex items-start gap-3 p-4 border border-brand-navy/10 dark:border-dark-border rounded-xl cursor-pointer hover:bg-brand-navy/5 select-none text-left">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-brand-gold mt-1"
                  />
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-brand-text dark:text-white block">UPI / Google Pay / PhonePe / Paytm</span>
                      <p className="text-[10px] text-brand-muted dark:text-dark-muted mt-0.5">Instant secure redirect and quick validation scan.</p>
                    </div>
                    <span className="text-lg">📱</span>
                  </div>
                </label>

                {/* Option 3: Cash cod */}
                <label className="flex items-start gap-3 p-4 border border-brand-navy/10 dark:border-dark-border rounded-xl cursor-pointer hover:bg-brand-navy/5 select-none text-left">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-brand-gold mt-1"
                  />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-text dark:text-white block">Cash on Delivery (COD)</span>
                    <p className="text-[10px] text-brand-muted dark:text-dark-muted mt-0.5">Pay standard physical currency upon consignment arrival.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Actions Confirmation */}
            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full bg-brand-navy dark:bg-brand-gold dark:text-brand-navy hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white py-4 rounded-xl text-xs uppercase tracking-widest font-extrabold flex items-center justify-center gap-2 shadow-2xl cursor-pointer active:scale-95 transition-all"
              id="submit-order-checkout-btn"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  <span>Preparing Consignment Cargo...</span>
                </>
              ) : (
                <span>Confirm Purchase Consignment — {formatPrice(finalTotal)}</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Sticky summary catalog, voucher code coupon */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          
          {/* A. Summary listing list */}
          <div className="bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-2xl p-6 space-y-4 text-xs font-sans transition-colors duration-300">
            <h3 className="text-xs uppercase tracking-[0.25em] font-extrabold text-brand-navy dark:text-brand-gold border-b border-brand-navy/5 dark:border-dark-border pb-3">
              Consignment Ledger ({cart.reduce((t, i) => t + i.quantity, 0)})
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3.5 items-center">
                  <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="w-10 h-12 object-cover rounded" />
                  <div className="flex-1 overflow-hidden text-left">
                    <p className="font-semibold text-brand-text dark:text-white truncate" title={item.product.name}>{item.product.name}</p>
                    <p className="text-[10px] text-brand-muted dark:text-dark-muted font-mono">
                      {formatPrice(item.product.price)} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-serif font-bold text-brand-navy dark:text-brand-gold font-mono">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Promo voucher input */}
            <form onSubmit={handleApplyCoupon} className="pt-4 border-t border-brand-navy/5 dark:border-dark-border flex gap-2" id="coupon-apply-form">
              <input
                type="text"
                placeholder="PROMO CODE"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 dark:border-dark-border py-2 px-3 rounded text-xs placeholder:text-brand-muted/60 text-brand-text dark:text-white font-mono uppercase"
              />
              <button
                type="submit"
                className="bg-brand-navy hover:bg-brand-blue text-white py-2 px-4 rounded text-xs uppercase tracking-widest font-extrabold cursor-pointer"
                id="apply-coupon-submit-btn"
              >
                Apply
              </button>
            </form>
            {couponError && <p className="text-[10px] text-brand-sale font-semibold text-left animate-fade-in block">{couponError}</p>}
            {couponSuccess && <p className="text-[10px] text-brand-success font-semibold text-left animate-fade-in block">{couponSuccess}</p>}

            {/* Calculations lines */}
            <div className="pt-4 border-t border-brand-navy/5 dark:border-dark-border space-y-2 text-[11px] text-brand-muted dark:text-dark-muted text-left">
              <div className="flex justify-between">
                <span>Workshop subtotal</span>
                <span className="font-mono text-brand-text dark:text-white">{formatPrice(cartSubtotal)}</span>
              </div>
              {discountPercentage > 0 && (
                <div className="flex justify-between text-brand-sale font-bold">
                  <span>Scriboria Voucher ({discountPercentage}%)</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Cushioned safe shipment</span>
                <span className="font-mono text-brand-text dark:text-white">
                  {shippingFee === 0 ? `FREE above ${formatPrice(SHIPPING_THRESHOLD)}` : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-brand-navy dark:text-brand-gold pt-2 border-t border-brand-navy/5 dark:border-dark-border">
                <span>Consignment Balance</span>
                <span className="font-serif font-bold text-lg">{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>

          {/* Secure gateway validation badges */}
          <div className="flex items-center gap-2.5 p-3.5 bg-brand-navy/5 dark:bg-dark-card border border-brand-navy/10 rounded-xl text-[10px] text-brand-muted dark:text-dark-muted leading-relaxed text-left">
            <Gift className="w-5 h-5 text-brand-gold flex-shrink-0" />
            <p>
              Your physical packing ledger includes a beautiful Scriboria custom seal sticker and sample cotton cotton swatches entirely free of charge. Thank you for voting for analog focus habits.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
