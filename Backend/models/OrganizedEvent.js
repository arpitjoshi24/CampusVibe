// Backend/models/OrganizedEvent.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const OrganizedEvent = sequelize.define('OrganizedEvent', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentId: { type: DataTypes.STRING, allowNull: false }, // FK to Student
  eventArchiveId: { type: DataTypes.INTEGER, allowNull: false }, // FK to EventArchive
});
export default OrganizedEvent;