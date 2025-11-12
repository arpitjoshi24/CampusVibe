import express from 'express';
import {
  getPendingSubEventRequests,
  approveSubEventRequest,
  getPendingVerifications,
  verifyPayment,
  rejectPayment
  // ... (routes for Build Team, Update Leaderboard, etc.)
} from '../controllers/organizerController.js';
import { protect, isOrganizer, checkPasswordChange } from '../middleware/authMiddleware.js';

const router = express.Router();

// This line is a MASTER middleware for all routes in this file
router.use(protect, checkPasswordChange, isOrganizer);

// --- Sub-Event Approval (for Main Organizers) ---
router.get('/requests/pending', getPendingSubEventRequests);
router.post('/requests/:requestId/approve', approveSubEventRequest); // Step 2 approval

// --- Payment Verification ---
router.get('/event/:eventId/verifications', getPendingVerifications);
router.post('/verify-payment', verifyPayment);
router.post('/reject-payment', rejectPayment);

// --- Team & Leaderboard Management ---
// (We will add routes here like POST /team/add-member, PUT /leaderboard/update, etc.)

export default router;