// Backend/models/Subject.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Subject = sequelize.define('Subject', { // This is the Class (e.g., Data Structures)
  subjectId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  subjectName: { type: DataTypes.STRING, allowNull: false },
  subjectCode: { type: DataTypes.STRING, allowNull: false, unique: true },
  courseId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Course
  year: { type: DataTypes.INTEGER, allowNull: false },
});
export default Subject;