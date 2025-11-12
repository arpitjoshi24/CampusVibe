import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // --- NEW FIELDS FROM OUR ERD ---
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Guest', // Admin, Organizer, SubOrganizer, Guest
  },
  accessExpiryDate: {
    type: DataTypes.DATE,
    allowNull: true, // Null = permanent (for Admins)
  },
  eventCreationLimit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  mustChangePassword: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// Hash password before saving
User.beforeSave(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Method to check password
User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default User;