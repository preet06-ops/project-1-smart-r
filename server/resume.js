import { Router } from 'express';
import Resume from '../models/Resume.js';

const router = Router();

// ---------------------------------------------------------------------------
// POST /api/resumes — Create a new resume
// ---------------------------------------------------------------------------
router.post('/', async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(201).json(resume);
  } catch (err) {
    console.error('Error creating resume:', err.message);
    res.status(400).json({ error: 'Failed to create resume.', details: err.message });
  }
});

// ---------------------------------------------------------------------------
// GET /api/resumes — List all resumes (newest first)
// ---------------------------------------------------------------------------
router.get('/', async (_req, res) => {
  try {
    const resumes = await Resume.find().sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error('Error fetching resumes:', err.message);
    res.status(500).json({ error: 'Failed to fetch resumes.' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/resumes/:id — Get a single resume by ID
// ---------------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found.' });
    }
    res.json(resume);
  } catch (err) {
    console.error('Error fetching resume:', err.message);
    res.status(500).json({ error: 'Failed to fetch resume.', details: err.message });
  }
});

// ---------------------------------------------------------------------------
// PUT /api/resumes/:id — Update an existing resume
// ---------------------------------------------------------------------------
router.put('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // return the updated document
      runValidators: true,  // enforce schema validation on update
    });
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found.' });
    }
    res.json(resume);
  } catch (err) {
    console.error('Error updating resume:', err.message);
    res.status(400).json({ error: 'Failed to update resume.', details: err.message });
  }
});

// ---------------------------------------------------------------------------
// DELETE /api/resumes/:id — Delete a resume
// ---------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found.' });
    }
    res.json({ message: 'Resume deleted successfully.', id: req.params.id });
  } catch (err) {
    console.error('Error deleting resume:', err.message);
    res.status(500).json({ error: 'Failed to delete resume.', details: err.message });
  }
});

export default router;
