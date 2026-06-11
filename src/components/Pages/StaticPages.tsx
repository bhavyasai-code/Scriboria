import React from 'react';
import { HelpCircle, Mail, Phone, MapPin, MessageSquare, Send, Sparkles, ReceiptText, ShieldCheck } from 'lucide-react';

interface StaticPagesProps {
  pageType: 'about' | 'contact' | 'faq' | 'shipping-return' | 'privacy-terms';
  onLaunchAdvisor: () => void;
}

export default function StaticPages({ pageType, onLaunchAdvisor }: StaticPagesProps) {
  const [contactName, setContactName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactMessage, setContactMessage] = React.useState('');
  const [contactSuccess, setContactSuccess] = React.useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactEmail.trim()) {
      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setTimeout(() => setContactSuccess(false), 5000);
    }
  };

  const faqItems = [
    {
      q: "What makes Scriboria FSC-Approved paper so unique?",
      a: "Our pages are sourced from ecological cotton seed rags and certified sustainable forests in Tuscany. With an 85gsm to 120gsm sizing density and natural silk gelatin sizing, our pages remain completely impervious to wet fountain pen inks, prevention feathering or ghosting entirely."
    },
    {
      q: "How do I prime and clean my Brass Fountain Pen?",
      a: "Unscrew the primary barrel, soak the steel iridium feed in warm distilled water for five minutes to flush archival dust, pop the international standard cartridge, and enjoy. Copper and brass pieces naturally oxidize into a custom rustic patina over decades."
    },
    {
      q: "What is your complimentary cushioned transit promise?",
      a: "We wrap individual journals and books inside tissue layers and heavy eco-recyclable cardboard sleeves. There are no plastics or corner-denting transits guaranteed. Ships absolutely free of charge across India on orders over ₹1,500."
    },
    {
      q: "Do you support custom lettering engravings?",
      a: "Currently, our Tuscany leather items can be hand-embossed utilizing gold gold-leaf stampings at our Italian warehouses. Chat with our AI Bard curator using the floating bubble to request custom lettering coordinates!"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 animate-fade-in text-left">
      
      {/* 1. ABOUT US VIEW */}
      {pageType === 'about' && (
        <article className="space-y-8">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full inline-block">Our Italian Origins</span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white m-0">The Scriboria Legacy</h1>
          </div>

          <div className="aspect-video bg-brand-gold/5 rounded-2xl overflow-hidden relative border border-brand-navy/10">
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1024"
              alt="Scriboria Tuscany Mill and Desk"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-navy/35" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-base sm:text-lg font-serif italic text-center max-w-md px-4">
                "We do not inherit focus; we carve it on paper."
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-brand-text/90 dark:text-dark-text/90 font-sans">
            <p>
              Scriboria was established in Siena, Italy, under the shade of centuries-old olive orchards. Inspired by the meticulous, silent focus of library curators in Tuscan museums, we set out with a simple, humble mandate: <strong>to curate and create tangible physical assets that protect human attention from screen fatigue</strong>.
            </p>
            <p>
              We believe a blank diary is a sacred space. When you unscrew a solid raw copper fountain pen and glide an ink nib across certified wood-free cotton paper, your brain decelerates. This decelerating state is where mental clarity is restored, ideas are cataloged, and real art is curated.
            </p>
            <div className="p-6 bg-brand-navy/5 dark:bg-dark-card border-l-4 border-brand-gold rounded-r-xl italic font-serif">
              "We coordinate with organic tanneries that leverage Tuscan olive branch extracts and cedar extracts rather than toxic chromium acids. You aren’t merely purchasing stationery tools; you are preserving the analog tradition."
            </div>
          </div>
        </article>
      )}

      {/* 2. CONTACT US VIEW */}
      {pageType === 'contact' && (
        <div className="space-y-10">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full inline-block">Live coordinates</span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white m-0">Connect With Scriboria</h1>
            <p className="text-xs sm:text-sm text-brand-muted max-w-lg">Our curatorial offices respond inside twelve working hours. Connect securely below.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left coordinates */}
            <div className="md:col-span-5 bg-white dark:bg-dark-card border border-brand-navy/5 p-6 rounded-2xl space-y-6 text-xs text-left">
              <div>
                <p className="font-extrabold uppercase tracking-wider text-brand-gold mb-2">Our Tuscany Domicile</p>
                <div className="flex gap-2.5 items-start text-brand-text dark:text-dark-text">
                  <MapPin className="w-4.5 h-4.5 text-brand-gold flex-shrink-0" />
                  <span>Scriboria Atelier, 14 Via dell’Orto, Siena (53100), Tuscany, Italy</span>
                </div>
              </div>

              <div>
                <p className="font-extrabold uppercase tracking-wider text-brand-gold mb-2">Electronic support</p>
                <div className="flex gap-2.5 items-start text-brand-text dark:text-dark-text">
                  <Mail className="w-4.5 h-4.5 text-brand-gold flex-shrink-0" />
                  <span>curator@scriboria-atelier.com</span>
                </div>
              </div>

              <div>
                <p className="font-extrabold uppercase tracking-wider text-brand-gold mb-2">Telephone ledger</p>
                <div className="flex gap-2.5 items-start text-brand-text dark:text-dark-text">
                  <Phone className="w-4.5 h-4.5 text-brand-gold flex-shrink-0" />
                  <span>+39 0577 123 456 (Siena Mon-Fri)</span>
                </div>
              </div>

              {/* Instant advisor connector helper */}
              <div className="p-4 bg-brand-navy/5 dark:bg-dark-bg/60 rounded-xl space-y-3">
                <p className="font-bold text-brand-navy dark:text-white uppercase tracking-wider m-0">Instant Curator Advisor</p>
                <p className="text-[10px] text-brand-muted leading-relaxed m-0">
                  Skipping support tickets? Activate our Scriboria AI Bard assistant instantly using the floating launcher or click beneath:
                </p>
                <button
                  onClick={onLaunchAdvisor}
                  className="w-full bg-brand-navy dark:bg-brand-gold dark:text-brand-navy py-2 rounded font-extrabold uppercase tracking-wider hover:opacity-90 flex items-center justify-center gap-1.5 cursor-pointer text-[10px]"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Speak with Scriboria Bard</span>
                </button>
              </div>
            </div>

            {/* Right standard secure inputs form */}
            <div className="md:col-span-7 bg-white dark:bg-dark-card border border-brand-navy/5 p-6 sm:p-8 rounded-2xl">
              <form onSubmit={handleContactSubmit} className="space-y-4 text-left" id="contact-coordinates-form">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted">Creator's name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="E.g. Evelyn Sterling"
                    className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 rounded-lg p-2.5 text-xs text-brand-text dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted">Email domicile</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="scribe@domain.com"
                    className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 rounded-lg p-2.5 text-xs text-brand-text dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted">Inquiry letter brief</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe custom lettering stamp requests or book packaging concerns..."
                    className="w-full bg-brand-ivory dark:bg-dark-bg border border-brand-navy/10 rounded-lg p-2.5 text-xs text-brand-text dark:text-white focus:outline-none focus:border-brand-gold"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-navy dark:bg-brand-gold dark:text-brand-navy hover:bg-brand-blue py-3 rounded-lg text-xs uppercase tracking-widest font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 text-white"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Letter Courier</span>
                </button>

                {contactSuccess && (
                  <p className="text-xs text-brand-success font-medium text-center bg-brand-success/10 py-2 rounded animate-fade-in block">
                    ✓ Beautiful. Your dispatch is sealed. The Scriboria Scribes will reply shortly!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 3. COOP COLLAPSIBLE FAQS VIEW */}
      {pageType === 'faq' && (
        <div className="space-y-8 text-left">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full inline-block">Resolving mysteries</span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white m-0 font-medium">Frequently Asked FAQs</h1>
            <p className="text-xs sm:text-sm text-brand-muted">Explore answers on paper sizing weights, leather patina curation, and customized logistics.</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, id) => (
              <details
                key={id}
                className="group border border-brand-navy/10 dark:border-dark-border rounded-xl p-4 bg-white dark:bg-dark-card transition-colors duration-300"
              >
                <summary className="flex justify-between items-center text-xs sm:text-sm font-heading font-semibold text-brand-navy dark:text-white cursor-pointer select-none py-1 block">
                  <span>{item.q}</span>
                  <span className="text-brand-gold font-bold text-lg group-open:rotate-45 transform transition-transform duration-200">+</span>
                </summary>
                <p className="text-xs leading-relaxed text-brand-text/80 dark:text-dark-text/80 pt-3 border-t border-brand-navy/5 mt-2 font-sans">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* 4. Compliments Logistic shipping details */}
      {pageType === 'shipping-return' && (
        <article className="space-y-6 text-xs sm:text-sm text-left">
          <div className="space-y-2 border-b pb-4">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-brand-gold">Shipping Promise</span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">Cushioned Logistic Delivery</h1>
          </div>

          <div className="space-y-4 text-brand-text/90 dark:text-dark-text/90 leading-relaxed">
            <p>
              Every literature copy and full-grain leather companion journal departs our warehouse encapsulated in acid-free tissue sleeves and protected by high-density recyclable fluted cardboard cells. This ensures **zero bent corners** or **broken spine bindings** during global transit.
            </p>
            <p>
              Our courier dispatches arrive entirely **free of charge** above ₹1,500. For orders under this benchmark, we apply a single flat postage invoice of **₹150**.
            </p>
            <p><strong>30-Day Compassionate Refund Policy:</strong> If the physical weight, line spacing, or cedar scent fails to resonate with your analog habits, return unused materials within a full calendar month. Scribes will process refunds without asking tedious questionnaires.</p>
          </div>
        </article>
      )}

      {/* 5. PRIVACY TERMS LEDGER */}
      {pageType === 'privacy-terms' && (
        <article className="space-y-6 text-xs sm:text-sm text-left">
          <div className="space-y-2 border-b pb-4">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-brand-gold">Data Safety Statement</span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">Digital Privacy &amp; Scribe Terms</h1>
          </div>

          <div className="space-y-4 text-brand-text/90 dark:text-dark-text/90 leading-relaxed font-sans">
            <p>
              At Scriboria Studio, client data is treated as securely as locked museum vaults. We never package, rent, or lease your physical mailing coordinates or behavioral inquiries to tertiary marketing syndicates.
            </p>
            <p>
              Your payment credentials represent PCI-certified encrypted variables handled directly by Stripe's bank vaults. We maintain absolutely zero local records of your primary security numbers or EXP cards.
            </p>
            <div className="flex gap-2.5 items-center p-4 bg-brand-gold/10 text-brand-navy dark:text-brand-gold rounded-xl text-xs font-semibold">
              <ShieldCheck className="w-5 h-5" />
              <span>Registered under Siena Ecological Art Preservation Regulations. FSC-Certified.</span>
            </div>
          </div>
        </article>
      )}

    </div>
  );
}
