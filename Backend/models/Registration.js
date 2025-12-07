import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Registration = sequelize.define("Registration", {
  studentId: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.STRING, allowNull: false },
  eventName: { type: DataTypes.STRING, allowNull: false },
});

export default Registration;
