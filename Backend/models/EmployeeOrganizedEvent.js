// Backend/models/EmployeeOrganizedEvent.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const EmployeeOrganizedEvent = sequelize.define('EmployeeOrganizedEvent', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employeeId: { type: DataTypes.STRING, allowNull: false }, // FK to Employee
  eventArchiveId: { type: DataTypes.INTEGER, allowNull: false }, // FK to EventArchive
});
export default EmployeeOrganizedEvent;