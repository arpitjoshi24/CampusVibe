// Backend/models/TimeTable.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const TimeTable = sequelize.define('TimeTable', { // This is the "Group"
  timeTableId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  courseId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Course
  year: { type: DataTypes.INTEGER, allowNull: false },
  section: { type: DataTypes.STRING, allowNull: false },
}, {
  uniqueKeys: {
    unique_timetable: {
      fields: ['courseId', 'year', 'section']
    }
  }
});
export default TimeTable;