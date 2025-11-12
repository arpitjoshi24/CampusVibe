import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// 🧠 Setup Multer Storage
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the storage destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    // Create a unique filename
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// File filter for images
const imageFileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG, or WEBP is allowed!'), false);
  }
};

// --- Create 3 Separate Multer Instances ---

// 1. For the Event Wizard (Banner + QR Codes)
export const uploadEventWizard = multer({
  storage: storage,
  fileFilter: imageFileFilter,
}).fields([
  { name: 'banner', maxCount: 1 },
  { name: 'paymentQRCodes', maxCount: 5 } // Allow up to 5 QR codes
]);

// 2. For the Registration Form (Payment Screenshot)
export const uploadScreenshot = multer({
  storage: storage,
  fileFilter: imageFileFilter,
}).single('paymentScreenshot');

// 3. For any other single file upload (e.g., Club Logo)
export const uploadSingleImage = (fieldName) => {
  return multer({ storage: storage, fileFilter: imageFileFilter }).single(fieldName);
};