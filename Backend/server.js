import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import User from './models/User.js';
import Event from './models/Event.js';

dotenv.config();

// Express setup
const app = express();
app.use(cors());
app.use(express.json());

// ⬇️ Needed for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced');
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  }
})();

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('🚀 Hackathon Server is Running!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
