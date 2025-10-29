import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';
import sequelize from './config/db.js';
import User from './models/User.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Sync models
sequelize.sync({ alter: true }).then(() => {
  console.log('All models synced');
});

// Routes
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
