import express from 'express';
import { registerForEvent } from '../controllers/registrationController.js';
import { uploadScreenshot } from '../utils/fileUploads.js'; // <-- CORRECTED IMPORT

const router = express.Router();

// ✅ This is a PUBLIC route. No 'protect' middleware.
// This handles all 4 scenarios (Paid/Unpaid, Team/Individual)
// 'uploadScreenshot' handles the 'paymentScreenshot' file
router.post(
  '/:eventId/register',
  uploadScreenshot, // <-- CORRECTED HANDLER
  registerForEvent
);

export default router;