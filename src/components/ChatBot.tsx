import React from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, ShoppingBag, Eye, HelpCircle } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/currency';

interface ChatBotProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  recommendedIds?: string[];
  timestamp: Date;
}

export default function ChatBot({ onSelectProduct, onAddToCart }: ChatBotProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Warm greetings, seeker of the written word. I am **Scriboria AI Bard**, your virtual bookseller and writing companion. Tell me, are you looking to structure a chaotic schedule, paint your dreams in honey-watercolors, or find a brass instrument to record your legacy? I would be delighted to guide you.",
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || message;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setMessage('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history }),
      });

      if (!response.ok) {
        throw new Error('Server disengagement');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `assist-${Date.now()}`,
        role: 'assistant',
        text: data.reply,
        recommendedIds: data.recommendedProductIds || [],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        text: "I apologize, but my connections momentarily drifted. Let us continue our peaceful journey. We recommend exploring our featured **Scriboria Heritage Leather Journal** or solid brass writing utensils.",
        recommendedIds: ['j-01', 'w-01'],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const starters = [
    { label: "✒️ Executive Brass Pen", query: "Can you recommend a premium brass fountain pen and explain its writing balance?" },
    { label: "📓 Zen Daily Journaling", query: "How do I start a simple daily journaling routine with structured bullet planning?" },
    { label: "🎨 Tuscany paints story", query: "Tell me about the honey-formulated watercolors and master badger/sable brushes." },
  ];

  return (
    <>
      {/* Floating Sparkles Bubble Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold"
        id="scriboria-ai-bard-launcher"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-xs uppercase tracking-widest font-extrabold font-heading block m-0">
          Ask Scriboria Bard
        </span>
      </button>

      {/* Slide-out Sidebar Panel */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-brand-ivory dark:bg-dark-bg border-l border-brand-navy/15 dark:border-dark-border shadow-2xl flex flex-col justify-between animate-fade-in transition-colors duration-300">
          
          {/* Header */}
          <div className="p-4 bg-brand-navy dark:bg-dark-card text-white flex items-center justify-between border-b border-brand-gold/30">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-brand-gold/20 rounded-full">
                <Sparkles className="w-4 h-4 text-brand-gold" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-serif font-bold tracking-wider text-brand-gold uppercase">Scriboria AI Bard</h4>
                <p className="text-[9px] uppercase tracking-widest text-[#E8E4DB]">Virtual Curator &amp; Advisor</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer"
              id="close-chat-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation Core panel */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Conversation list */}
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} space-y-1`}>
                
                {/* Meta details */}
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-brand-muted dark:text-dark-muted px-1">
                  <span>{m.role === 'user' ? 'You' : 'Scriboria Bard'}</span>
                  <span>•</span>
                  <span>{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {/* Msg text bubble */}
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[90%] font-sans whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-brand-navy text-white rounded-tr-none dark:bg-brand-blue'
                    : 'bg-white dark:bg-dark-card text-brand-text dark:text-dark-text border border-brand-navy/5 dark:border-dark-border rounded-tl-none markdown-body'
                }`}>
                  {m.text}
                </div>

                {/* Renders custom interactive product link cards if referenced */}
                {m.recommendedIds && m.recommendedIds.length > 0 && (
                  <div className="w-full flex flex-col gap-2.5 pt-2 max-w-[90%]">
                    <p className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">Suggested tools &amp; volumes:</p>
                    {m.recommendedIds.map(id => {
                      const prod = PRODUCTS.find(p => p.id === id);
                      if (!prod) return null;
                      return (
                        <div
                          key={prod.id}
                          className="flex gap-3 p-2 bg-white dark:bg-dark-card border border-brand-gold/30 rounded-xl shadow-xs animate-fade-in hover:border-brand-blue"
                        >
                          <img src={prod.image} alt={prod.name} referrerPolicy="no-referrer" className="w-12 h-14 object-cover rounded" />
                          <div className="flex-1 overflow-hidden flex flex-col justify-between">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-brand-gold truncate font-semibold">{prod.category}</p>
                              <p className="text-[11px] font-heading font-semibold text-brand-text dark:text-white truncate" title={prod.name}>{prod.name}</p>
                            </div>
                            <div className="flex items-center justify-between text-[11px] mt-1 pt-1 border-t border-brand-navy/5 dark:border-dark-border/40">
                              <span className="font-serif font-bold text-brand-navy dark:text-brand-gold">{formatPrice(prod.price)}</span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => onSelectProduct(prod)}
                                  className="text-[9px] font-bold text-brand-blue uppercase hover:underline flex items-center gap-0.5"
                                  id={`chat-detail-btn-${prod.id}`}
                                >
                                  <Eye className="w-3 h-3" /> Info
                                </button>
                                <button
                                  onClick={() => onAddToCart(prod)}
                                  className="text-[9px] font-bold text-brand-success uppercase hover:underline flex items-center gap-0.5"
                                  id={`chat-add-btn-${prod.id}`}
                                >
                                  <ShoppingBag className="w-3 h-3" /> Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Live thought generator status indicator */}
            {loading && (
              <div className="flex flex-col items-start space-y-1.5 animate-pulse">
                <div className="text-[9px] uppercase tracking-wider text-brand-muted">Scriboria Bard is reflecting...</div>
                <div className="p-3 bg-white dark:bg-dark-card border border-brand-gold/20 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] text-brand-muted">Refining copywriting logs...</span>
                </div>
              </div>
            )}
          </div>

          {/* User input box and preselection starters */}
          <div className="p-3 bg-white dark:bg-dark-card border-t border-brand-navy/10 dark:border-dark-border space-y-2.5">
            
            {/* Display starters only at the beginning or when idle */}
            {messages.length < 5 && (
              <div className="space-y-1 pb-1">
                <p className="text-[9px] uppercase tracking-wider text-brand-gold font-bold">Suggested discussions:</p>
                <div className="flex flex-col gap-1.5">
                  {starters.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(undefined, s.query)}
                      className="text-left py-1 px-2.5 rounded text-[10px] bg-brand-ivory dark:bg-dark-bg hover:bg-brand-gold/10 text-brand-navy dark:text-dark-text border border-brand-navy/5 dark:border-dark-border transition-colors truncate cursor-pointer"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSend} className="flex gap-2" id="chatbot-submit-form">
              <input
                type="text"
                required
                placeholder="Ask about paper grade widths, journals..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-brand-ivory dark:bg-dark-bg text-brand-text dark:text-white border border-brand-navy/10 dark:border-dark-border rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:border-brand-gold placeholder:italic placeholder:text-brand-muted/70"
                id="chatbot-msg-input"
              />
              <button
                type="submit"
                disabled={loading}
                className="p-2.5 bg-brand-navy hover:bg-brand-blue disabled:bg-brand-muted text-white rounded-lg transition-colors cursor-pointer"
                id="chatbot-send-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
