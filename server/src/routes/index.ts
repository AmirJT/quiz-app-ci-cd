import express from 'express';
const router = express.Router();
import apiRoutes from './api/index.js';

// ✅ Only serve API routes
router.use('/api', apiRoutes);

export default router;