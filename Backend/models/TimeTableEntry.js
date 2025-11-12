// Backend/models/TimeTableEntry.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const TimeTableEntry = sequelize.define('TimeTableEntry', { // This is the "Schedule"
  entryId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  timeTableId: { type: DataTypes.INTEGER, allowNull: false }, // FK to TimeTable
  subjectId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Subject
  employeeId: { type: DataTypes.STRING, allowNull: false },  // FK to Employee
  day: { type: DataTypes.STRING, allowNull: false },
  timeSlot: { type: DataTypes.STRING, allowNull: false },
  roomNo: { type: DataTypes.STRING },
});
export default TimeTableEntry;