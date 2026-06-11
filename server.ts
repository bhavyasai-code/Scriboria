import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { PRODUCTS, CATEGORIES } from './src/data/products.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry User-Agent as instructed in the gemini-api skill
let ai: GoogleGenAI | null = null;
const key = process.env.GEMINI_API_KEY;

if (key) {
  try {
    ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini API initialized successfully with User-Agent header.');
  } catch (error) {
    console.error('Failed to initialize Gemini API:', error);
  }
} else {
  console.log('No GEMINI_API_KEY environment variable found. Scriboria AI Bard will fall back to local rule-based intelligence.');
}

// REST API for products catalog
app.get('/api/products', (req: Request, res: Response) => {
  res.json(PRODUCTS);
});

app.get('/api/categories', (req: Request, res: Response) => {
  res.json(CATEGORIES);
});

// Scriboria AI Bard recommendation & support workspace API
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  const { message, history } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Message field is required.' });
    return;
  }

  const catalogSummary = PRODUCTS.map(p => ({
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    category: p.category,
    price: p.price,
    features: p.features,
    sku: p.sku,
    inStock: p.inStock,
  }));

  const systemPrompt = `You are "Scriboria AI Bard", the premium virtual bookseller, master copywriter, and creative advisor at Scriboria - the premium online destination for curated books, leather journals, luxury planners, solid brass writing instruments, handmade pigments, and study utilities.

Your tone is warm, exceptionally cultured, elegant, articulate, and welcoming. You speak with creative inspiration. Focus on creating deep resonance and encouraging intellectual growth. Refrain from slang or casual jargon.

Below is our actual real-time store catalog of products in JSON format:
${JSON.stringify(catalogSummary, null, 2)}

Your goals:
1. Help users discover the perfect reading volumes, writing habits, or journaling layouts.
2. Recommend ACTUAL real-time products from our catalog list above. Make sure to refer to them by their EXACT name, categories, prices, and highlight their unique premium features.
3. If recommended, cite the ID of the product(s) in your answer using double brackets, e.g. [[b-01]] or [[w-01]], so our system can render beautiful interactive cards for them.
4. Try to recommend exactly 1 or 2 specific products that fit their prompt. Introduce their materials (e.g. Tuscan leather, German iridium nib, handmade honey-formulated pigments).
5. Always respond in clean, beautifully structured markdown format with short elegant paragraphs.

Answer the user's message concisely. Keep your total answer under 250 words to maintain luxury punchiness.`;

  if (ai) {
    try {
      // Structure the chat history in the format recommended by @google/genai
      const contents = [];
      
      // Append past turns if available
      if (history && Array.isArray(history)) {
        history.slice(-6).forEach((turn: { role: string; text: string }) => {
          contents.push({
            role: turn.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: turn.text }]
          });
        });
      }
      
      // Append current user message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I apologize, but my thoughts faded for a moment. Let us continue exploring the beauty of Scriboria's craft.";
      
      // Extract recommended product IDs with regex: e.g. [[b-01]]
      const productMatches = reply.match(/\[\[([a-z0-9\-]+)\]\]/gi) || [];
      const recommendedProductIds = productMatches.map(m => m.replace(/[\[\]]/g, ''));

      res.json({
        reply,
        recommendedProductIds,
        mode: 'gemini'
      });
      return;
    } catch (err: any) {
      console.error('Gemini live call error:', err);
      // Fallback gracefully below
    }
  }

  // Graceful rule-based offline intelligence fallback if Gemini API throws or is not configured
  let reply = `Welcome to Scriboria. I am currently operating on local vintage memory, but I would love to guide you. `;
  const lowerMsg = message.toLowerCase();
  const recommendedProductIds: string[] = [];

  if (lowerMsg.includes('book') || lowerMsg.includes('read') || lowerMsg.includes('rubin')) {
    reply += `If you seek creative wisdom, I highly recommend our premium hardback copy of **"The Creative Act: A Way of Being" by Rick Rubin** ($32.00). It is clothbound and printed on natural acid-free leaves.\n\nAlternatively, you might enjoy the literary romance of our **"Chamber of Letters" Anthology** ($24.50).`;
    recommendedProductIds.push('b-01', 'b-02');
  } else if (lowerMsg.includes('pen') || lowerMsg.includes('write') || lowerMsg.includes('fountain') || lowerMsg.includes('ink')) {
    reply += `For writing your legacy, we recommend our masterfully weighted **Scriboria Imperator Brass Fountain Pen** ($125.00). Crafted from solid brass, it develops a deep personal character patina.\n\nOur **Aero-Carbon Archival Fineliner Set** ($24.00) is also brilliant for precise drafting.`;
    recommendedProductIds.push('w-01', 'w-02');
  } else if (lowerMsg.includes('journal') || lowerMsg.includes('note') || lowerMsg.includes('leather')) {
    reply += `Our crown jewel is the **Scriboria Heritage Leather Journal** ($68.00). Sourced from vegetable-tanned Tuscan leather, it lies completely flat for ink journalers.\n\nFor structured thoughts, consider our **Minimalist Grid Bullet Notebook** ($18.50).`;
    recommendedProductIds.push('j-01', 'j-02');
  } else if (lowerMsg.includes('plan') || lowerMsg.includes('schedule') || lowerMsg.includes('calendar') || lowerMsg.includes('organize')) {
    reply += `To conquer daily chaos, the **"Master-Plan" Undated Weekly Chronicle** ($29.00) is spectacular. It features a left-side weekly layout and a right-side dotted planning notes sheet.\n\nYou might also adore our **Bespoke Solid Brass Desk Organizer** ($74.00) to structure your tools.`;
    recommendedProductIds.push('p-01', 'o-01');
  } else if (lowerMsg.includes('art') || lowerMsg.includes('paint') || lowerMsg.includes('color') || lowerMsg.includes('brush')) {
    reply += `To paint your dreams, utilize the **Tuscany Earth Honey Watercolors Grid** ($85.00) containing 18 intense pans formulated with Florentine chestnut honey.\n\nPair it with our handmade **Pure Kolinsky Sable Brush Trio** ($52.00).`;
    recommendedProductIds.push('a-01', 'a-02');
  } else {
    reply += `Explore our beautifully curated corners: our hand-stitched **Heritage Leather Journal** ($68.00), our solid machined **Imperator Fountain Pen** ($125.00), or our undated **Master-Plan Weekly Chronicle** ($29.00).\n\nIf you tell me what you want to achieve or design, I can fetch the specific archival elements for you!`;
    recommendedProductIds.push('j-01', 'w-01', 'p-01');
  }

  res.json({
    reply,
    recommendedProductIds,
    mode: 'fallback'
  });
});

// Configure Vite or Static Production Serve
const staticSetup = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite mid-ware mounted for development.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static routers mounted.');
  }
};

staticSetup().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Scriboria server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to configure server routes:', err);
});
