// Backend/models/Student.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Student = sequelize.define('Student', {
  studentId: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  classRollNo: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  section: { type: DataTypes.STRING, allowNull: false },
  courseId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Course
});
export default Student;