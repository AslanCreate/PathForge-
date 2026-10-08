import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Gemini client if API key is available
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. AI Auto-Tune endpoint
app.post('/api/autotune', async (req, res) => {
  const { currentPrompt, tags = [], grindHours = 15, workplaceVibe = 'early' } = req.body;
  if (!ai) {
    const tagList = tags.length ? tags.join(', ') : 'GenAI, Full-Stack LLMs, Reactive State';
    const autotuned = `I want to build hyper-scalable ${tagList} applications, design viral micro-interactions, and lead technical sprints at high-velocity startups shipping production agent loops weekly.`;
    return res.json({ autotunedText: autotuned, spicyLevel: 'MAX 🔥' });
  }

  try {
    const prompt = `You are the viral Gen-Z career calibrator for 'PathForge' (100% homie vibes, zero corporate BS). The user wrote: "${currentPrompt || 'I want to do AI and code'}". Selected vibe tags: ${tags.join(', ') || 'GenAI, Creative UI'}. Weekly grind: ${grindHours} hrs/week. Target workplace vibe: ${workplaceVibe}. Task: Rewrite their prompt into an ultra-punchy, high-leverage 1-2 sentence career mission statement. Requirements: - Sound like a passionate, ambitious builder in modern AI/tech (mention concrete skills like LLM agents, dynamic streaming, reactive UI, vector DBs, etc.). - Gen-Z builder dialect (sharp, confident, zero corporate jargon, authentic). - Keep length under 220 characters so it fits neatly in the calibrator textarea. Return ONLY the raw rewritten sentence. No quotes, no intro, no bullet points.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const autotuned = response.text ? response.text.trim().replace(/^["']|["']$/g, '') : currentPrompt;
    res.json({ autotunedText: autotuned, spicyLevel: 'MAX 🔥' });
  } catch (error) {
    console.error('Error during autotune:', error);
    const tagList = tags.length ? tags.join(', ') : 'GenAI Tools';
    const fallback = `I want to build high-leverage AI products with ${tagList}, craft buttery micro-interactions, and ship production agent loops at a seed-stage unicorn.`;
    res.json({ autotunedText: fallback, spicyLevel: 'MAX 🔥' });
  }
});

// 2. Ask Coach endpoint
app.post('/api/ask-coach', async (req, res) => {
  const { question, currentFocus = 'Streaming UI, Vercel AI SDK & Reactive State', userLvl = 8 } = req.body;
  if (!ai) {
    const homieReplies = [
      "Yo! The secret to rock-solid streaming UI is handling token jitter with an optimistic buffer and fallback error boundaries. You're crushing it — deploy that demo and flex in the Guild feed!",
      "Solid question! Don't overcomplicate your vector search: hybrid BM25 + dense embeddings in Qdrant will give you 95%+ precision without burning GPU cycles.",
      "Homie, hiring leads at seed-stage startups care about proof of work over 10-page resumes. A 40-second Loom showing instant streaming beats 5 LeetCode hard problems any day!"
    ];
    const picked = homieReplies[Math.floor(Math.random() * homieReplies.length)];
    return res.json({ advice: picked, xpBonus: 25 });
  }

  try {
    const prompt = `You are 'Forge Homie Coach' in PathForge, a gamified career platform for aspiring 2026 AI Product Engineers and Tech Founders. Tone: Warm, hype, authentic peer mentor ("homie vibes"), technically ultra-competent, highly pragmatic, zero corporate fluff. User Level: LVL ${userLvl}. Current Module: "${currentFocus}". User's query/situation: "${question}". Give a concise, super tactical, encouraging 2-3 sentence tip. Include a tangible technical or career insight (e.g. on SSE streams, error state handling, proof-of-work demos, or salary negotiation). Do not use generic assistant boilerplate. Sound like a senior engineer friend cheering them on.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ advice: response.text?.trim() || "Lock in today's mission and let's ship that demo!", xpBonus: 35 });
  } catch (err) {
    console.error('Error calling Ask Coach:', err);
    res.json({
      advice: "Keep the momentum rolling! Implement token timeout fallbacks first, then push to your public GitHub repo for instant recruiter attention.",
      xpBonus: 20
    });
  }
});

// 3. Diagnostic Auto-reroute endpoint
app.post('/api/diagnostic-reroute', async (req, res) => {
  const { topic = 'React Dynamic Streaming' } = req.body;
  if (!ai) {
    return res.json({
      question: "In Next.js 15 App Router with AI SDK, what header ensures intermediate chunks stream immediately without server buffer delays?",
      options: [
        "Content-Type: text/event-stream & X-Accel-Buffering: no",
        "Cache-Control: public, max-age=3600",
        "Transfer-Encoding: chunked (HTTP/1.0 legacy only)",
        "Accept: application/octet-stream"
      ],
      correctIndex: 0,
      rewardSkipMonths: 1.5
    });
  }

  try {
    const prompt = `Generate a single multiple-choice technical diagnostic question testing whether a student already masters "${topic}". Format as JSON with keys:
- "question": string (concise, practical real-world scenario)
- "options": array of 4 string choices
- "correctIndex": integer (0 to 3)
- "rewardSkipMonths": float (between 1.0 and 2.0)`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch {
    res.json({
      question: "Which pattern prevents token latency freezes when rendering streaming assistant text?",
      options: [
        "Chunk buffering with requestAnimationFrame and AbortController",
        "Synchronous JSON.parse on every raw byte",
        "Blocking window.prompt modal alert",
        "Static page re-renders via window.location.reload()"
      ],
      correctIndex: 0,
      rewardSkipMonths: 1.5
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PathForge Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
