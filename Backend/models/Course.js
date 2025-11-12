// Backend/models/Course.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Course = sequelize.define('Course', { // This is the Program (e.g., B.Tech)
  courseId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  courseName: { type: DataTypes.STRING, allowNull: false, unique: true },
  departmentId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Department
});
export default Course;