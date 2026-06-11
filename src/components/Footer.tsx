import React from 'react';
import { Mail, Instagram, Twitter, Compass, Printer, ArrowUp, HelpCircle } from 'lucide-react';
import ScriboriaLogo from './ScriboriaLogo';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onSubscribe: (email: string) => void;
}

export default function Footer({ setCurrentTab, onSubscribe }: FooterProps) {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy text-white transition-colors duration-300 dark:bg-dark-card border-t border-brand-gold/20">
      {/* Upper Footer: Branding & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-6 flex flex-col items-start text-left">
            <ScriboriaLogo variant="horizontal" size="custom" iconClassName="w-12 h-12" />
            <p className="text-white/60 dark:text-dark-muted text-xs leading-relaxed max-w-sm">
              We curate high-end vintage literature, vegetable-tanned journal heirlooms, fine German gold-plated Schmidt nib writing instruments, and ecological cotton-rag papers designed to elevate your mental clarity and daily focus.
            </p>
            {/* Social handles */}
            <div className="flex items-center gap-4 text-brand-gold pt-2">
              <a href="#" className="hover:text-white transition-colors p-1.5 bg-white/5 rounded-full" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors p-1.5 bg-white/5 rounded-full" title="Pinterest">
                <Compass className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors p-1.5 bg-white/5 rounded-full" title="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-gold mb-6">Collections</h4>
            <ul className="space-y-3 text-xs text-white/70 dark:text-dark-muted font-sans">
              <li><button onClick={() => setCurrentTab('books')} className="hover:text-brand-gold hover:translate-x-1 transition-all">Books &amp; Anthologies</button></li>
              <li><button onClick={() => setCurrentTab('journals')} className="hover:text-brand-gold hover:translate-x-1 transition-all">Artisanal Journals</button></li>
              <li><button onClick={() => setCurrentTab('planners')} className="hover:text-brand-gold hover:translate-x-1 transition-all">Organized Planners</button></li>
              <li><button onClick={() => setCurrentTab('pens')} className="hover:text-brand-gold hover:translate-x-1 transition-all">Brass Fountain Pens</button></li>
              <li><button onClick={() => setCurrentTab('art-supplies')} className="hover:text-brand-gold hover:translate-x-1 transition-all">Honey pigment Paints</button></li>
              <li><button onClick={() => setCurrentTab('office')} className="hover:text-brand-gold hover:translate-x-1 transition-all">Desk Sculptures</button></li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-gold mb-6">Customer Service</h4>
            <ul className="space-y-3 text-xs text-white/70 dark:text-dark-muted font-sans">
              <li><button onClick={() => setCurrentTab('faq')} className="hover:text-brand-gold">Frequently Asked FAQs</button></li>
              <li><button onClick={() => setCurrentTab('shipping-return')} className="hover:text-brand-gold">Shipping &amp; Free Returns</button></li>
              <li><button onClick={() => setCurrentTab('privacy-terms')} className="hover:text-brand-gold">Privacy Ledger</button></li>
              <li><button onClick={() => setCurrentTab('contact')} className="hover:text-brand-gold">Live Chat Support</button></li>
              <li><button onClick={() => setCurrentTab('about')} className="hover:text-brand-gold">Our Tuscany Story</button></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-gold">Join Scriboria Club</h4>
            <p className="text-xs text-white/70 dark:text-dark-muted leading-relaxed">
              Earn 10% off your initial shipment and secure advance notification of limited luxury editions.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2 pt-2" id="footer-newsletter-form">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your visual email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border-b border-brand-gold/30 py-2.5 px-3 rounded text-xs text-white focus:outline-none focus:border-brand-gold transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-gold hover:text-white transition-colors"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-brand-success font-medium animate-fade-in block">
                  ✓ Beautiful. An invitation has been dispatched!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Extreme Bottom Bar */}
      <div className="border-t border-white/10 dark:border-dark-border bg-brand-navy/60 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-white/50">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Scriboria Studio. Handcrafted for Creators. All rights preserved.
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-success inline-block"></span>
              <span>Online support online</span>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-1.5 hover:text-brand-gold transition-all hover:bg-white/5 rounded"
              id="scroll-to-top-btn"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
