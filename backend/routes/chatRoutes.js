import { Router } from 'express';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages array' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    });

    const reply = response.choices[0].message?.content;
    res.json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'Something went wrong with OpenAI' });
  }
});

export default router;

// This doesnt work unfortunately i need to pay so that it works