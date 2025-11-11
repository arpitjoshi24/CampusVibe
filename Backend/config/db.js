import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Connect using DATABASE_URL (Neon connection string)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // required for Neon SSL
    },
  },
  logging: false, // disable SQL logs
});

// ✅ Optional test function
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to Neon PostgreSQL successfully!');
  } catch (error) {
    console.error('❌ Neon PostgreSQL connection error:', error);
    process.exit(1);
  }
};

export default sequelize;
