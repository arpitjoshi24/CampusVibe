import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Event = sequelize.define('Event', {
  eventName: { type: DataTypes.STRING, allowNull: false },
  eventDesc: { type: DataTypes.TEXT, allowNull: false },
  eventDate: { type: DataTypes.DATE, allowNull: false },
  venue: { type: DataTypes.STRING, allowNull: false },
  eventMode: { type: DataTypes.STRING, allowNull: false }, // online/offline
  organizer: { type: DataTypes.STRING, allowNull: false },
  bannerUrl: { type: DataTypes.STRING, allowNull: true },
});

export default Event;
