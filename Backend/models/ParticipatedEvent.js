// Backend/models/ParticipatedEvent.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const ParticipatedEvent = sequelize.define('ParticipatedEvent', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentId: { type: DataTypes.STRING, allowNull: false }, // FK to Student
  eventArchiveId: { type: DataTypes.INTEGER, allowNull: false }, // FK to EventArchive
});
export default ParticipatedEvent;