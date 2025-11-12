// Backend/models/EventMember.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const EventMember = sequelize.define('EventMember', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  eventId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Event
  memberId: { type: DataTypes.STRING, allowNull: false }, // Can be studentId or employeeId
  memberType: { type: DataTypes.STRING, allowNull: false }, // 'Student' or 'Employee'
  role: { type: DataTypes.STRING, allowNull: false }, // Participant, Committee Member, Student Organiser, Employee Organiser
  checkedIn: { type: DataTypes.BOOLEAN, defaultValue: false },
  teamId: { type: DataTypes.INTEGER, allowNull: true }, // FK to Team
  transactionId: { type: DataTypes.STRING }, // For individual paid
  paymentScreenshotPath: { type: DataTypes.STRING }, // For individual paid
  paymentStatus: { type: DataTypes.STRING, defaultValue: 'Pending' }, // For individual paid
});
export default EventMember;