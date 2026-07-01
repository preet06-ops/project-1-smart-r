import { Router } from 'express';
import { getResumeSuggestions } from '../services/geminiService.js';

const router = Router();

// ---------------------------------------------------------------------------
// POST /api/ai/suggest — Get AI-powered resume improvement suggestions
// ---------------------------------------------------------------------------
router.post('/suggest', async (req, res) => {
  try {
    const resumeData = req.body;

    if (!resumeData || Object.keys(resumeData).length === 0) {
      return res.status(400).json({ error: 'Resume data is required in the request body.' });
    }

    const suggestions = await getResumeSuggestions(resumeData);
    res.json({ suggestions });
  } catch (err) {
    console.error('AI suggestion error:', err.message);
    res.status(500).json({
      error: 'Failed to generate AI suggestions.',
      details: err.message,
    });
  }
});

export default router;
