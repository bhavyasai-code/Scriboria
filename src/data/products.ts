import { Product, Category, FAQItem, BlogPost } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'books',
    name: 'Books',
    slug: 'books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80',
    description: 'Literature, self-culture, creative writing guides, and art histories designed to expand perspectives.',
    count: 450,
  },
  {
    id: 'journals',
    name: 'Journals',
    slug: 'journals',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    description: 'Leather-bound heirlooms and heavy-weight thread-sewn books for raw thoughts and drawings.',
    count: 180,
  },
  {
    id: 'planners',
    name: 'Planners',
    slug: 'planners',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
    description: 'Systematic daily grids, productivity layouts, and undated planners to structure chaotic schedules.',
    count: 120,
  },
  {
    id: 'pens',
    name: 'Pens & Writing',
    slug: 'pens',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80',
    description: 'Fine-engineered brass fountain pens, archival pigment fineliners, and solid metal writing instruments.',
    count: 310,
  },
  {
    id: 'art-supplies',
    name: 'Art Supplies',
    slug: 'art-supplies',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
    description: 'Handmade pans of pan watercolors, professional brushes, and heavy weight cold-press cotton sheets.',
    count: 240,
  },
  {
    id: 'office',
    name: 'Study & Office',
    slug: 'office',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    description: 'Modular brass desk accessories, warm-hue lighting, and high-quality utility trays.',
    count: 154,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'b-01',
    name: 'The Creative Act: A Way of Being',
    tagline: 'A gentle, profound guide on living with inspiration.',
    category: 'books',
    price: 299.00,
    originalPrice: 399.00,
    rating: 4.9,
    reviewCount: 148,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'An inspiring philosophical study on the artistic mindset, curated for writers, artists, and creators who seek deep meaning in daily creative habits. It speaks of focus, nature, listening, and developing one’s connection with life.',
    specifications: {
      'Author': 'Rick Rubin',
      'Publisher': 'Scriboria Press (Licensed)',
      'Format': 'Hardcover, cloth bound',
      'Pages': '432 Pages',
      'Language': 'English',
      'ISBN': '978-3-16-148410-0'
    },
    features: [
      'Premium linen gold-stamped hardcover binding',
      'Printed on FSC-certified acid-free heavy natural paper',
      'Woven integrated silk ribbon bookmark',
      'Elegant typographic layout with spacious reading margins'
    ],
    inStock: true,
    sku: 'SC-BK-001',
    discountPercentage: 15,
    isBestSeller: true
  },
  {
    id: 'b-02',
    name: 'Chamber of Letters: Anthology of Modern Literature',
    tagline: 'An elegant curation of prose and vintage poetry.',
    category: 'books',
    price: 199.00,
    rating: 4.8,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
    description: 'A beautiful collection of classic letters, modernist memoirs, and intimate short pieces exploring the physical art of written communication, from Cicero to Woolf. Includes illustrations of authentic historical letters.',
    specifications: {
      'Editor': 'Scriboria Literary Guild',
      'Format': 'Softcover with French flaps',
      'Pages': '310 Pages',
      'Year': '2025'
    },
    features: [
      'Includes 15 fully restored high-fidelity vintage letters inserts',
      'Specially designed custom drop-cap typography font',
      'Scented page finish reminiscent of cedar wood and parchment'
    ],
    inStock: true,
    sku: 'SC-BK-002',
    isNewArrival: true
  },
  {
    id: 'j-01',
    name: 'Scriboria Heritage Leather Journal',
    tagline: 'Hand-sewn vegetable tanned leather that ages gracefully with time.',
    category: 'journals',
    price: 599.00,
    originalPrice: 799.00,
    rating: 5.0,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Crafted in collaboration with artisanal leather studios in Tuscany, this classic wrap-around journal uses 100% genuine full-grain leather, hand-rubbed with natural dye. Thick, bleed-proof lay-flat pages make it a supreme pleasure for both heavy ink fountain pens and sketch watercolors.',
    specifications: {
      'Material': 'Vegetable-tanned full-grain Tuscan leather',
      'Paper': '140 GSM Acid-free cotton-rag blend, premium off-white warm color',
      'Format': 'A5 Size (5.8 x 8.3 inches)',
      'Ruling': 'Blank leaves with lay-flat hand binding',
      'Leaves': '240 Pages (120 sheets)'
    },
    features: [
      'Natural grain that develops a unique vintage honey patina',
      'Water-resistant secure wraparound raw leather strap',
      'Tested to guarantee zero bleeding, ghosting, or feathering with iron-gall ink',
      'Heavy cardboard luxury gift drawer package box included'
    ],
    inStock: true,
    sku: 'SC-JN-010',
    discountPercentage: 20,
    isBestSeller: true
  },
  {
    id: 'j-02',
    name: 'Minimalist Grid Bullet Notebook',
    tagline: 'Pristine pages customized for organized thinkers.',
    category: 'journals',
    price: 249.00,
    rating: 4.7,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=80',
    description: 'A structural notebooks featuring discrete, subtle light-gray dot-grids spaced exactly at 5mm. Made with Japanese styling principles, it has a flexible pebble gray linen cover and absolute lie-flat spine.',
    specifications: {
      'Cover': 'Flexible double-woven linen yarn',
      'Paper': '120 GSM ultra-smooth wood pulp cream paper',
      'Size': 'A5 Medium',
      'Dot Grid': '5.0mm subtle spacing'
    },
    features: [
      'Ink-proof satin coating ensures maximum ink gliding speed',
      'Includes dual satin bookmarks in pure navy and warm gold',
      'Back pocket to securely hold stickers, stamps, and tickets'
    ],
    inStock: true,
    sku: 'SC-JN-012',
    isNewArrival: false
  },
  {
    id: 'p-01',
    name: 'The Master-Plan: Undated Weekly Chronicle',
    tagline: 'Structure your days beautifully on your own terms.',
    category: 'planners',
    price: 349.00,
    rating: 4.9,
    reviewCount: 118,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80',
    description: 'A minimalist planning standard. Free of rigid calendar dates, this undated weekly and monthly planner lets you take productive breaks or start fresh anytime without wasting paper space. Includes daily task blocks, habit tracking grids, and quarterly review cards.',
    specifications: {
      'Binding': 'Spine cloth-taped thread bound',
      'Size': '7.2 x 10.1 inches (Extended Scholar)',
      'Duration': '12 Months (52 weeks, undated)',
      'Layout': 'Left-side weekly spread, right-side dot grid notes'
    },
    features: [
      'Gilded edges with warm-gold leafing',
      '180-degree absolute flat layout, no spring-back spine',
      'Features custom monthly index tabs sticker sheets',
      'Specially designed gratitude and focus prompts'
    ],
    inStock: true,
    sku: 'SC-PL-020',
    isBestSeller: true
  },
  {
    id: 'p-02',
    name: 'Aura Daily Goal Planner',
    tagline: 'Align your mental energy with daily action items.',
    category: 'planners',
    price: 299.00,
    rating: 4.6,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&auto=format&fit=crop&q=80',
    description: 'Specifically engineered for creative practitioners and busy students. Breaks down your days into hourly blocks (6:00 AM to 10:00 PM), priority triangles, mind-mapping canvas spaces, and daily hydration bars.',
    specifications: {
      'Format': 'Daily single page layout (365 pages)',
      'Paper': '100 GSM FSC archival paper',
      'Colors': 'Ivory White / Crimson Tan'
    },
    features: [
      'Rigid recycled board hard-cover bound in heavy bookcloth',
      'Acid-free ink testing ensures zero dry-time latency',
      'Features 12 inspiring hand-lettered creator divider pages'
    ],
    inStock: true,
    sku: 'SC-PL-022',
    isNewArrival: true
  },
  {
    id: 'w-01',
    name: 'Scriboria Imperator Brass Fountain Pen',
    tagline: 'The weight of permanence, writing your legacy.',
    category: 'pens',
    price: 799.00,
    originalPrice: 999.00,
    rating: 5.0,
    reviewCount: 224,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Machined from a single block of solid, heavy raw brass, the Imperator Pen is engineered for lifetime reliability. Over weeks of writing, the brass oxidizes to form a dark, tactile, highly personal bronze patina. Equipped with a custom 24k gold-plated Schmidt iridium medium nib from Germany.',
    specifications: {
      'Nib': 'Schmidt #6 Iridium Gold Plated (Medium / Fine option)',
      'Material': 'C3604 Solid Marine-grade Brass',
      'Filling': 'International ink converter (included) or cartridges',
      'Weight': '42.5 Grams (perfectly balanced)'
    },
    features: [
      'Pre-fitted deluxe piston rotary ink converter',
      'Secured screw-on cap mechanism with air-tight hermetic ink seal',
      'Comes with a hand-lacquered walnut wood display stand',
      'Lifetime brand warranty card included'
    ],
    inStock: true,
    sku: 'SC-PN-060',
    discountPercentage: 16,
    isBestSeller: true
  },
  {
    id: 'w-02',
    name: 'Aero-Carbon Archival Fineliner Set',
    tagline: 'Six grade widths designed for immaculate draftsman lines.',
    category: 'pens',
    price: 299.00,
    rating: 4.8,
    reviewCount: 160,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
    description: 'Filled with fade-proof, water-resistant archival pigment soot black ink. Perfect for intricate bullet journaling trackers, design blueprints, sketching, and crosshatching shading drafts.',
    specifications: {
      'Widths Included': '0.05mm, 0.1mm, 0.3mm, 0.5mm, 0.8mm, Brush',
      'Ink Base': 'Archival liquid Carbon Black pigment, pH neutral',
      'Housing': 'Recycled matte ABS body with pocket metal clip'
    },
    features: [
      'Instantly smear-proof on highly glossy papers and water washes',
      'Doughnut cap clip keeps internal needle points from dry bending',
      'Chemically stable ink does not wash off under heavy watercolor washes'
    ],
    inStock: true,
    sku: 'SC-PN-064',
    isNewArrival: true
  },
  {
    id: 'a-01',
    name: 'Tuscany Earth Honey Watercolors Grid',
    tagline: 'Deep, rich honey-formulated visual pigments.',
    category: 'art-supplies',
    price: 699.00,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
    description: 'Handmade by traditional Florence pigment masters. Formulated with authentic French acacia arabic gum and dark local chestnut mountain honey. Each pan is individually poured four separate times, resolving in incredibly high density block pigment paint.',
    specifications: {
      'Colors': '18 Full-Pans of bespoke ochres, siennas, cobalts, and deep indigo',
      'Palette': 'Solid metal black enamelled travel palette box with mixing wells'
    },
    features: [
      'Honey base guarantees soft wetting and rapid visual color re-activation',
      'Zero synthetic fillers or toxic cobalt/cadmium mineral replacements',
      'Comes wrapped with genuine cold-press cotton sampling swatch card'
    ],
    inStock: true,
    sku: 'SC-AR-090',
    isBestSeller: false
  },
  {
    id: 'a-02',
    name: 'Scriboria Silk-Weave Pure Kolinsky Brush Trio',
    tagline: 'Perfect precision spring and endless water storage reservoir.',
    category: 'art-supplies',
    price: 499.00,
    originalPrice: 599.00,
    rating: 4.8,
    reviewCount: 39,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
    description: 'Handcrafted brushes with genuine mahogany handles and hand-tied red sable fibers. Reverts back to a razor-perfect fine point upon every wet stroke of the canvas.',
    specifications: {
      'Sizes': 'Round Size #2, Round Size #6, Flat Mop Size #10',
      'Ferrules': 'Seamless silver-nickel plated, non-shedding press fit',
      'Handles': 'Double lacquered solid premium red-alder wood'
    },
    features: [
      'Outstanding needle-sharp tip controls microscopic detail drawing',
      'Ergonomically weighted center of gravity minimizes artist wrist fatigue',
      'Comes in a ventilated roll-up solid split-bamboo carry mat'
    ],
    inStock: true,
    sku: 'SC-AR-095',
    discountPercentage: 20
  },
  {
    id: 'o-01',
    name: 'Bespoke Solid Brass Desk Organizer',
    tagline: 'Weight, visual structure, and organization on your workstation.',
    category: 'office',
    price: 649.00,
    rating: 4.9,
    reviewCount: 84,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    description: 'CNC-milled solid copper and brass blocks. Features customized slot sizes to balance two of your exquisite fountain pens, high-priority planners, small steel rulers, paper slips, and standard paperclips.',
    specifications: {
      'Material': 'Solid C360 Brass block',
      'Dimensions': '6.4 x 3.2 x 1.4 inches',
      'Base Padding': 'Genuine non-slip green natural wool felt'
    },
    features: [
      'Heavy enough (1.2 kg) to double as a premium book paperweight',
      'Includes a dedicated slot to prop up your smartphone or tablet',
      'Oxidizes to develop a marvelous industrial studio character'
    ],
    inStock: true,
    sku: 'SC-OF-110',
    isBestSeller: true
  },
  {
    id: 'o-02',
    name: 'Amber Glass Studio Hourglass',
    tagline: 'A visual, tactile pacing device for analog focus cycles.',
    category: 'office',
    price: 399.00,
    rating: 4.7,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
    description: 'Pioneered for study blocks and focus cycles. Filled with magnetic, dark iron filings that stack in crystalline, fractal micro-sculptures as they glide through the narrow amber glass neck.',
    specifications: {
      'Timer Duration': '30 Minutes (+/- 45s margin of accuracy)',
      'Stand': 'Lacquered circular black oak magnet base block',
      'Glass': 'Borosilicate handblown tempered chemical glass'
    },
    features: [
      'Creates a dynamic, highly meditative physical ticking sculpture as grains land',
      'Perfect tool for practicing uninterrupted Deep Work or Pomodoro techniques',
      'Extremely elegant sculptural silhouette for modern workspaces'
    ],
    inStock: true,
    sku: 'SC-OF-115',
    isNewArrival: true
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'bl-01',
    title: 'The Lost Art of Epistolary: Why We Must Write Letters Again',
    excerpt: 'How writing physical letters on soft cotton paper restores high attention spans and fosters deep relationship networks.',
    content: `In our hyper-connected, modern digital square, communication is instant, friction-free, and increasingly thin. We dash off text messages, click robotic auto-replies, and stack emojis. But in this rush to delete typing time, we have lost the heavy, exquisite romance of the physical letter.
    
    Writing letters requires presence. You sit down with raw intention. You select a specific sheet of stationery, choose a fountain pen, and think deeply. No backspace keys exist; your ink records the unique rhythm and slight tremors of your actual hand. It is a slow conversation with both oneself and the reader.
    
    In this article, we trace the history of epistolary art: how great thinkers like Virginia Woolf, Franz Kafka, and Vincent van Gogh spent hours over their writing tables, pouring their visual imaginations into hand-addressed letters. We also practical tips on selecting your first set of envelope sheets, matching fountain pen ink widths, and creating wax-seal seals to stamp your personal mark.`,
    category: 'Writing Guides',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
    date: 'June 8, 2026',
    readTime: '6 min read',
    author: {
      name: 'Eleanor Vance',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      role: 'Scriboria Curating Editor'
    }
  },
  {
    id: 'bl-02',
    title: 'Structuring Productivity: Bullet Journaling Like a Zen Master',
    excerpt: 'Uncover the principles of analog planning, clean scheduling, and custom habit trackers to soothe mental static.',
    content: `Do your days feel like an overwhelming, fast-scrolling inbox? In our current screen-centric ecosystem, our minds are bombarded with digital alerts, reminders, and notifications. 
    
    To combat this, a quiet renaissance is taking place on the pages of thick, grid-spaced notebooks. Analog bullet journaling, created by Ryder Carroll, is not just about keeping a schedule; it’s a modern Zen practice built on deliberate organization and presence.
    
    Learn how to construct a unified index, master rapid logging strategies with intuitive symbols, and design weekly gratitude grids that do not demand hours of upkeep. We review why cream paper feels more restful for dry eyes, how a 5mm dot grid creates flexible structural margins, and the specific daily review rituals that turn a simple planner into a powerful anchor for long-term emotional well-being and productivity.`,
    category: 'Productivity',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop&q=80',
    date: 'June 3, 2026',
    readTime: '5 min read',
    author: {
      name: 'Kaito Sato',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      role: 'Creative Design Director'
    }
  },
  {
    id: 'bl-03',
    title: 'Understanding Paper Speeds: A Guide for Fountain Pen Enthusiasts',
    excerpt: 'Linen, wood fiber, and cotton weight analysis. How to pick paper that prevents ink bleeding, feathering, and ghosting.',
    content: `For stationery enthusiasts, the nib and ink are only two parts of the writing equation. The third—and often most overlooked—is the paper. 
    
    Have you ever filled a beautifully balanced brass fountain pen with deep navy ink, pressed it to a fresh page, only to watch the ink bloom uncontrollably like watercolor dye? This frustrating event is known as "feathering". When the ink pierces straight through to the back of the sheet, that’s "bleed".
    
    To help you curate the ultimate workspace, we tear down the science of paper manufacturing. We analyze fiber lengths, the impact of starch surface sizing coatings, the visual difference between cold-press and warm hot-press textures, and why paper with a high GSM (Grams per Square Meter) does not always guarantee high ink resistance. Learn the secrets of Japanese paper mills and how to pick the perfect book companion for your daily records.`,
    category: 'Stationery Reviews',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80',
    date: 'May 20, 2026',
    readTime: '8 min read',
    author: {
      name: 'Alexander Sterling',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      role: 'Master Archival Scribe'
    }
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'fq-01',
    question: 'Why does Scriboria utilize vegetable-tanned leather for its journals?',
    answer: 'Vegetable tanning is an ancient, natural artisanal process that relies on tree bark bark extracts and tannins rather than harsh toxic chromium chemicals. It requires highly skilled hands and takes up to 40 days to complete. The result is a leather that has rich organic aromas and actively patinas—darkening and conforming to your touch—over years of companionship, recording the physical geography of your everyday life.',
    category: 'Products'
  },
  {
    id: 'fq-02',
    question: 'Will writing ink bleed or feather on your notebook pages?',
    answer: 'Absolutely not. All of our journals and planners use premium high-weight paper (100 GSM to 140 GSM) sourced from ecological mills in Japan and Sweden. They are treated with a specialized surface sizing wash that blocks wet fountain pen ink from soaking deeply into fibers. This guarantees pristine linework, zero feathering, and complete safety when writing with double-broad nibs or watercolor washes.',
    category: 'Products'
  },
  {
    id: 'fq-03',
    question: 'How long does shipment take and what is the shipping cost?',
    answer: 'We offer free premium shipping on all orders above ₹1,500. Standard shipping is ₹150. Orders are packed inside high-grade cushioned aesthetic paper boards within 24 hours. Domestic delivery takes between 2 to 4 business days. Express shipping is also available on checkouts.',
    category: 'Shipping'
  },
  {
    id: 'fq-04',
    question: 'What is your return philosophy?',
    answer: 'We want you to feel complete resonance with your tools. If a book, pen, or art set does not inspire you, we happily accept returns in original, unused packaging within 30 days of arrival. Return shipping labels are printable in your customer dashboard entirely free of charge.',
    category: 'Policy'
  },
  {
    id: 'fq-05',
    question: 'Are Scriboria materials sustainably and ethically manufactured?',
    answer: 'Yes. Every supplier we partner with adheres to strict environmental standards. Our papers are certified by the FSC (Forest Stewardship Council) to secure zero deforestation. Our brass pens are designed to be reused indefinitely, replacing cheap single-use plastics with raw copper alloys that can be recycled or passed down through generations.',
    category: 'Sustainability'
  }
];
