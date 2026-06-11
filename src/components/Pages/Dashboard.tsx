import React from 'react';
import { Award, ShoppingCart, Key, MapPin, Compass, Shield, User, Star, HelpCircle } from 'lucide-react';
import { Order, Product } from '../../types';
import { formatPrice } from '../../utils/currency';

interface DashboardProps {
  orders: Order[];
  rewardPoints: number;
  setCurrentTab: (tab: string) => void;
}

export default function Dashboard({ orders, rewardPoints, setCurrentTab }: DashboardProps) {
  const [activeSubTab, setActiveSubTab] = React.useState<'orders' | 'addresses' | 'scribe'>('orders');
  const [name, setName] = React.useState('Bhavyasai M.');
  const [addressSaved, setAddressSaved] = React.useState('14 Via dell’Orto, Siena, Tuscany, Italy');

  const savedAddressesList = [
    { id: 'addr-01', title: 'Main Siena Atelier (Default)', content: '14 Via dell’Orto, Siena, Tuscany, Italy (53100)', postcode: '53100' },
    { id: 'addr-02', title: 'Corporate Worksite', content: '25 Via Broletto, Milan, Italy (20121)', postcode: '20121' }
  ];

  const pointsEquivalentINR = formatPrice(rewardPoints / 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-left">
      <div className="space-y-2 mb-80 md:mb-10 text-left">
        <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-gold">Companion Hub</span>
        <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-white m-0">Bhavyasai’s Writing Room</h1>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-dark-muted max-w-xl">Review orders, manage stationery preferences, and track your Scriboria Club legacy points balance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Companion Profile details Card */}
        <div className="lg:col-span-4 bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-2xl p-6 space-y-6 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-gold/15 flex items-center justify-center font-serif text-2xl font-bold text-brand-gold">
              BM
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white m-0">{name}</h3>
              <p className="text-[10px] uppercase tracking-widest text-brand-gold font-extrabold m-0 mt-0.5">Scriboria Gold Companion</p>
            </div>
          </div>

          <div className="bg-brand-navy/5 dark:bg-dark-bg/60 p-4 rounded-xl space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-muted">Points Ledger Wallet</span>
              <Award className="w-4.5 h-4.5 text-brand-gold" />
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-brand-navy dark:text-brand-gold m-0">{rewardPoints} pts</p>
              <p className="text-[10px] text-brand-muted dark:text-dark-muted m-0">Equivalent to {pointsEquivalentINR} in shop discount store credit</p>
            </div>
          </div>

          {/* Scribe tier achievements */}
          <div className="space-y-3.5 text-xs">
            <p className="font-bold uppercase tracking-wider text-[10px] text-brand-navy dark:text-brand-gold border-b border-brand-navy/5 pb-2">Atelier Milestones</p>
            <div className="flex items-center gap-2">
              <span className="text-lg">✒️</span>
              <div>
                <p className="font-semibold text-brand-text dark:text-white">Ancient Scribe Active</p>
                <p className="text-[10px] text-brand-muted">You have curated 8 bespoke creative artifacts since registration</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📚</span>
              <div>
                <p className="font-semibold text-brand-text dark:text-white">Literature Guardian</p>
                <p className="text-[10px] text-brand-muted">You support FSC-approved ecological paper preservation programs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Tab container */}
        <div className="lg:col-span-8 space-y-6">
          {/* Sub-tabs header */}
          <div className="flex border-b border-brand-navy/5 dark:border-dark-border bg-white dark:bg-dark-card/30 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveSubTab('orders')}
              className={`flex-1 py-3 text-center text-xs uppercase tracking-widest font-extrabold rounded-lg cursor-pointer transition-all ${
                activeSubTab === 'orders'
                  ? 'bg-brand-navy text-white font-bold dark:bg-brand-gold dark:text-brand-navy'
                  : 'text-brand-muted dark:text-dark-muted hover:text-brand-navy hover:bg-brand-navy/5'
              }`}
            >
              Order Ledger ({orders.length})
            </button>
            <button
              onClick={() => setActiveSubTab('addresses')}
              className={`flex-1 py-3 text-center text-xs uppercase tracking-widest font-extrabold rounded-lg cursor-pointer transition-all ${
                activeSubTab === 'addresses'
                  ? 'bg-brand-navy text-white font-bold dark:bg-brand-gold dark:text-brand-navy'
                  : 'text-brand-muted dark:text-dark-muted hover:text-brand-navy hover:bg-brand-navy/5'
              }`}
            >
              Saved Domiciles
            </button>
            <button
              onClick={() => setActiveSubTab('scribe')}
              className={`flex-1 py-3 text-center text-xs uppercase tracking-widest font-extrabold rounded-lg cursor-pointer transition-all ${
                activeSubTab === 'scribe'
                  ? 'bg-brand-navy text-white font-bold dark:bg-brand-gold dark:text-brand-navy'
                  : 'text-brand-muted dark:text-dark-muted hover:text-brand-navy hover:bg-brand-navy/5'
              }`}
            >
              Scribe Preferences
            </button>
          </div>

          {/* Sub-tab contents */}
          <div className="bg-white dark:bg-dark-card border border-brand-navy/5 dark:border-dark-border rounded-2xl p-6 sm:p-8 min-h-[16rem] transition-colors duration-300">
            {activeSubTab === 'orders' && (
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="text-2xl">🗳️</div>
                    <p className="text-xs text-brand-muted dark:text-dark-muted">No historical transactions has been submitted yet.</p>
                    <button
                      onClick={() => setCurrentTab('shop')}
                      className="bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy px-5 py-2.5 rounded text-xs uppercase tracking-widest font-bold font-heading"
                    >
                      Curate Your First Artifact
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((or) => (
                      <div key={or.id} className="p-4 bg-brand-ivory dark:bg-dark-bg/60 border border-brand-navy/10 rounded-xl space-y-3 text-xs">
                        <div className="flex justify-between items-baseline flex-wrap gap-2">
                          <div>
                            <span className="font-bold text-brand-navy dark:text-white uppercase tracking-wider block">ID: {or.id}</span>
                            <span className="text-[10px] text-brand-muted dark:text-dark-muted">{or.date}</span>
                          </div>
                          <span className="bg-brand-gold/15 text-brand-gold uppercase text-[9px] font-bold tracking-wider rounded px-2.5 py-1">
                            {or.status}
                          </span>
                        </div>

                        {/* Items listed */}
                        <div className="border-t border-brand-navy/5 dark:border-dark-border/40 pt-2 space-y-1 text-xs">
                          {or.items.map((item, id) => (
                            <div key={id} className="flex justify-between">
                              <span className="truncate max-w-[80%] italic">
                                {item.name} <span className="font-bold font-sans">x{item.quantity}</span>
                              </span>
                              <span className="font-mono">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-brand-navy/5 dark:border-dark-border/40 pt-2 flex justify-between items-baseline font-bold text-brand-navy dark:text-brand-gold">
                          <span>Total Cash Dispatched:</span>
                          <span className="font-mono">{formatPrice(or.total)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSubTab === 'addresses' && (
              <div className="space-y-4">
                {savedAddressesList.map((adObj) => (
                  <div key={adObj.id} className="p-4 border border-brand-navy/10 dark:border-dark-border rounded-xl flex items-start gap-3 justify-between">
                    <div className="space-y-1.5 text-xs text-left">
                      <p className="font-bold text-brand-navy dark:text-brand-gold uppercase tracking-wider">{adObj.title}</p>
                      <p className="text-brand-text dark:text-dark-text">{adObj.content}</p>
                    </div>
                    <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  </div>
                ))}
                <button
                  onClick={() => alert('New Shipping coordinate entry form will trigger shortly.')}
                  className="w-full border border-dashed border-brand-navy/20 dark:border-dark-border py-3 text-center text-xs uppercase tracking-widest font-extrabold text-brand-navy dark:text-brand-gold hover:border-brand-gold rounded-xl transition-all"
                >
                  + Add New Domicile Address
                </button>
              </div>
            )}

            {activeSubTab === 'scribe' && (
              <div className="space-y-6 text-xs text-brand-text dark:text-dark-text text-left">
                <div className="space-y-2">
                  <h4 className="font-bold text-brand-navy dark:text-brand-gold uppercase tracking-wider m-0">Atelier Layout Nib sizing</h4>
                  <p className="text-[10px] text-brand-muted">Select Nib preference for brand order customization</p>
                  <div className="flex flex-wrap gap-2">
                    {['Extra Fine (EF)', 'Fine Nib (F)', 'Medium Nib (M) default', 'Broad Nib (B)', 'Flex calligraphy'].map((nib) => (
                      <button
                        key={nib}
                        onClick={() => alert(`Saved Preference: ${nib}`)}
                        className="py-1.5 px-3 border border-brand-navy/10 dark:border-dark-border/40 hover:border-brand-gold text-[10px] font-semibold text-brand-muted hover:text-brand-navy uppercase rounded-md"
                      >
                        {nib}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-brand-navy/5">
                  <h4 className="font-bold text-brand-navy dark:text-brand-gold uppercase tracking-wider m-0">Consignment ecological choices</h4>
                  <p className="text-[10px] text-brand-muted">We pack utilizing eco-wax bindings. Choose preferences:</p>
                  <label className="flex items-center gap-2 select-none cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-brand-gold" />
                    <span>Include raw cedarwood sample swatches</span>
                  </label>
                  <label className="flex items-center gap-2 select-none cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-brand-gold" />
                    <span>Send printed library index catalog monthly</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
