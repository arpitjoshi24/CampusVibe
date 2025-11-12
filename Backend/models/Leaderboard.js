// Backend/models/Leaderboard.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Leaderboard = sequelize.define('Leaderboard', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  eventId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Event
  competitorId: { type: DataTypes.STRING, allowNull: false }, // teamId or studentId
  competitorType: { type: DataTypes.STRING, allowNull: false }, // 'Team' or 'Individual'
  marks: { type: DataTypes.INTEGER, defaultValue: 0 },
  rank: { type: DataTypes.INTEGER },
});
export default Leaderboard;