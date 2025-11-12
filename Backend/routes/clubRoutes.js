import express from 'express';
import { getAllClubs, getClubDetails } from '../controllers/clubController.js';

const router = express.Router();

// ✅ Public route to get all clubs
router.get('/', getAllClubs);

// ✅ Public route to get a single club's details and its events
router.get('/:clubId', getClubDetails);

export default router;