import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import resumeRoutes from './routes/resume.js';
import aiRoutes from './routes/ai.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-builder';

// ---------------------------------------------------------------------------
// Express app setup
// ---------------------------------------------------------------------------
const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);

// Health-check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// ---------------------------------------------------------------------------
// MongoDB connection & server start
// ---------------------------------------------------------------------------
const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
    console.log('✅  Connected to MongoDB');
  } catch (err) {
    console.warn('⚠️  MongoDB connection failed — running without database.');
    console.warn(`   Reason: ${err.message}`);
    console.warn('   Resume CRUD endpoints will not work, but AI features remain available.');
  }

  app.listen(PORT, () => {
    console.log(`\n🚀  Smart Resume Builder API running on http://localhost:${PORT}`);
    console.log(`   Health check → http://localhost:${PORT}/api/health\n`);
  });
};

startServer();
