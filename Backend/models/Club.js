// Backend/models/Club.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Club = sequelize.define('Club', {
  clubId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  clubName: { type: DataTypes.STRING, allowNull: false, unique: true },
  clubDescription: { type: DataTypes.TEXT },
  clubLogoUrl: { type: DataTypes.STRING },
});
export default Club;