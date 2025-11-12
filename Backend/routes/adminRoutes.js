import express from 'express';
import { 
  getPendingAdminRequests, 
  approveEventRequest, 
  rejectEventRequest,
  clubController // <-- CORRECTED IMPORT (added this)
  // ... (all other Admin CRUD functions for Student, Employee, etc. will be imported here)
} from '../controllers/adminController.js';
// 'createClub' was removed from the import above
import { protect, isAdmin, checkPasswordChange } from '../middleware/authMiddleware.js';

const router = express.Router();

// This line is a MASTER middleware.
// It applies to EVERY route in this file.
// 1. 'protect': You must be logged in.
// 2. 'checkPasswordChange': You must have a valid password.
// 3. 'isAdmin': You must be an Admin.
router.use(protect, checkPasswordChange, isAdmin);

// --- Event Request Routes ---
router.get('/requests', getPendingAdminRequests);
router.post('/requests/:requestId/approve', approveEventRequest);
router.post('/requests/:requestId/reject', rejectEventRequest);

// --- Club Management Routes ---
router.post('/clubs', clubController.create); // <-- CORRECTED ROUTE
// (You would add router.put('/clubs/:id', clubController.update) etc. here)

// --- Academic Core CRUD Routes ---
// (You would add router.post('/students', ...), router.post('/employees', ...), etc. here)

export default router;