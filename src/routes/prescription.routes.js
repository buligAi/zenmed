import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { createPrescription, getPrescriptions } from '../controllers/prescription.controller.js';

const router = express.Router();

router.use(protect);
router.post('/', createPrescription);
router.get('/', getPrescriptions);

export default router;