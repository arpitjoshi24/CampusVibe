// Backend/models/EventRequest.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const EventRequest = sequelize.define('EventRequest', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  requestorEmail: { type: DataTypes.STRING, allowNull: false },
  eventDetails: { type: DataTypes.JSON },
  requestedEventCount: { type: DataTypes.INTEGER, defaultValue: 1 },
  status: { type: DataTypes.STRING, allowNull: false }, // Pending_Admin, Pending_Main_Organizer, Approved, Rejected
  requestType: { type: DataTypes.STRING, allowNull: false }, // Fest, Single
  scope: { type: DataTypes.STRING, allowNull: false }, // Individual, Part of Fest
  parentFestId: { type: DataTypes.INTEGER, allowNull: true }, // FK to Event
});
export default EventRequest;