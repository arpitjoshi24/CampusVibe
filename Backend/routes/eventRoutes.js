import express from 'express';
import { addEvent, getEvents, getEventById, deleteEvent } from '../controllers/eventController.js';
import { protect, isOrganizer, checkPasswordChange } from '../middleware/authMiddleware.js';
import { uploadEventWizard } from '../utils/fileUploads.js'; // <-- CORRECTED IMPORT

const router = express.Router();

// --- PUBLIC ROUTES (for "Public User" lane) ---

// ✅ GET all events (for Eventpage.jsx)
router.get('/', getEvents);

// ✅ GET one event's details (for the "Unified Event Dashboard")
router.get('/:id', getEventById);

// --- PROTECTED ROUTES (for "Organizer" & "Admin" lanes) ---

// ✅ POST to create a new event (the "Add Event" wizard)
router.post(
  '/',
  protect,
  checkPasswordChange,
  isOrganizer,
  uploadEventWizard, // <-- CORRECTED HANDLER
  addEvent
);

// ✅ DELETE an event (Manual Deletion)
router.delete(
  '/:id',
  protect,
  checkPasswordChange,
  isOrganizer,
  deleteEvent
);

export default router;