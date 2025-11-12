// Backend/models/Team.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Team = sequelize.define('Team', {
  teamId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  eventId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Event
  teamName: { type: DataTypes.STRING, allowNull: false },
  teamLeaderStudentId: { type: DataTypes.STRING, allowNull: false }, // FK to Student
  transactionId: { type: DataTypes.STRING },
  paymentScreenshotPath: { type: DataTypes.STRING },
  paymentStatus: { type: DataTypes.STRING, defaultValue: 'Pending' }, // Pending, Verified
  customFormData: { type: DataTypes.JSON },
});
export default Team;