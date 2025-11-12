// Backend/models/Resource.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Resource = sequelize.define('Resource', {
  resourceId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  resourceName: { type: DataTypes.STRING, allowNull: false, unique: true },
  category: { type: DataTypes.STRING },
  inchargeEmployeeId: { type: DataTypes.STRING, allowNull: false }, // FK to Employee
});
export default Resource;