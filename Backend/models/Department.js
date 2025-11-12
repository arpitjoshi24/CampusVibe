// Backend/models/Department.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Department = sequelize.define('Department', {
  departmentId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  departmentName: { type: DataTypes.STRING, allowNull: false, unique: true },
  headEmployeeId: { type: DataTypes.STRING, allowNull: true }, // FK to Employee
});
export default Department;