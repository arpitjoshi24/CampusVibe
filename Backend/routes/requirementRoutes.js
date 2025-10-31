import express from 'express';
import { addRequirement, getRequirements } from '../controllers/requirementController.js';

const router = express.Router();

router.post('/add', addRequirement);
router.get('/', getRequirements);

export default router;
