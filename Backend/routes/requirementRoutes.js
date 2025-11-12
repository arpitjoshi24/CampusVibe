import express from 'express';
import { addEventRequirement } from '../controllers/requirementController.js';
import { protect, isOrganizer, checkPasswordChange } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ POST a requirement request (the "shopping cart")
// This is now linked to a specific event
// 1. 'protect': Are you logged in?
// 2. 'checkPasswordChange': Have you changed your temp password?
// 3. 'isOrganizer': Are you an Organizer or Admin?
router.post(
  '/:eventId',
  protect,
  checkPasswordChange,
  isOrganizer,
  addEventRequirement
);

// (We can add 'GET' routes later for Admins to see all requests)

export default router;