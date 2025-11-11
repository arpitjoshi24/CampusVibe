import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize, { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import requirementRoutes from './routes/requirementRoutes.js';
import User from './models/User.js';
import Event from './models/Event.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ⬇️ Needed for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Database connection & sync
(async () => {
  try {
    await connectDB(); // connect to Neon
    await sequelize.sync({ alter: true });
    console.log('✅ Sequelize models synced with Neon DB');
  } catch (err) {
    console.error('❌ DB connection or sync failed:', err.message);
  }
})();

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/requirements', requirementRoutes);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('🚀 Backend server running with Neon PostgreSQL!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
