import express from 'express';
import { sendAttendanceReport } from '../controllers/attendanceController.js';
import { protect, isOrganizer, checkPasswordChange } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Protected route for an Organizer to send the attendance report
router.post(
  '/:eventId/send-attendance',
  protect,
  checkPasswordChange,
  isOrganizer,
  sendAttendanceReport
);

export default router;