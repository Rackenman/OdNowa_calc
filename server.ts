import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'GPR Wołomin 2025-2035' });
  });

  // AI Assistant Chat Proxy Endpoint using @google/genai SDK
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Brak wiadomości (message required).' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: 'Brak klucza GEMINI_API_KEY w konfiguracji. Możesz zadać to pytanie w oparciu o wbudowaną bazę wiedzy GPR.',
        });
      }

      const ai = getAiClient();
      
      const systemInstruction = `Jesteś oficjalnym Asystentem Eksperckim Gminnego Programu Rewitalizacji Wołomina 2025-2030 (z perspektywą do 2035) - GPR Wołomin 2.0.
Twoim zadaniem jest udzielanie precyzyjnych, życzliwych i wyczerpujących odpowiedzi po polsku w oparciu o fakty z dokumentu GPR Wołomina:
- Całkowity budżet: 118,16 mln zł (50% UE, 25.1% Gmina/krajowe, 24.9% prywatne).
- Obszar rewitalizacji: Centrum Wołomina (58,4 ha, ok. 4230 mieszkańców).
- Specjalna Strefa Rewitalizacji (SSR): Uchwała z 2024 r. na 10 lat.
- Główne inwestycje: Centrum Wiktoryn (po Globi, park&ride, mieszkania), dawny basen Mariańska, Ożywienie Placu 3 Maja (odbetonowanie, zieleń), Woonerfy (Kościelna, Mickiewicza, Warszawska), Muzeum Wołomina PKP, nowa siedziba OPS Wileńska 23, Rozbudowa CAW Stara Elektrownia, Program Wołomin ODNOWA, Remont dla Seniora, Program Podaj Cegłę.
Odpisuj zwięźle, profesjonalnie i strukturalnie w punktach, posługując się poprawną polszczyzną.`;

      const prompt = `Pytanie mieszkańca/użytkownika: "${message}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: systemInstruction + '\n\n' + prompt }] }
        ],
      });

      const replyText = response.text || 'Przepraszam, nie udało się wygenerować odpowiedzi.';
      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      return res.status(500).json({
        error: 'Błąd przetwarzania zapytania AI',
        details: err?.message || String(err),
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GPR Wołomin Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
