// Backend/models/Employee.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Employee = sequelize.define('Employee', {
  employeeId: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  departmentId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Department
  isResourceIncharge: { type: DataTypes.BOOLEAN, defaultValue: false },
});
export default Employee;