import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { addEvent, getEvents } from '../controllers/eventController.js';

const router = express.Router();

// 🧠 Setup Multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// 🧩 Routes
router.post('/', upload.single('banner'), addEvent);
router.get('/', getEvents);

export default router;
