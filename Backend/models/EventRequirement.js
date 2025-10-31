import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const EventRequirement = sequelize.define('EventRequirement', {
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordinatorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordinatorEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordinatorPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requirements: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {
      electricity: false,
      soundSystem: false,
      projector: false,
      tables: false,
      chairs: false,
      wifi: false,
      others: '',
    },
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  approvalStatus: {
    type: DataTypes.STRING,
    defaultValue: 'Pending', // "Pending" | "Approved" | "Rejected"
  },
  assignedHeads: {
    type: DataTypes.JSON,
    defaultValue: {
      itHead: '',
      culturalHead: '',
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // ✅ Authorized department head email (new field)
  authorizedHeadEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Email of the authorized department head who receives notifications',
  },
  // ✅ Consultant email (sent from frontend)
  consultEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Consultant email address sent from frontend',
  },
});

export default EventRequirement;
