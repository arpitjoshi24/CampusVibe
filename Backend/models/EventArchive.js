// Backend/models/EventArchive.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const EventArchive = sequelize.define('EventArchive', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  originalEventId: { type: DataTypes.INTEGER, allowNull: false },
  eventName: { type: DataTypes.STRING, allowNull: false },
  organizerName: { type: DataTypes.STRING }, // Storing name for posterity
  date: { type: DataTypes.DATE },
  venue: { type: DataTypes.STRING },
  participantCount: { type: DataTypes.INTEGER },
});
export default EventArchive;