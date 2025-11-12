import sequelize from '../config/db.js';

// Import all models
import Student from './Student.js';
import Employee from './Employee.js';
import Department from './Department.js';
import Course from './Course.js';
import Subject from './Subject.js';
import TimeTable from './TimeTable.js';
import TimeTableEntry from './TimeTableEntry.js';
import Club from './Club.js';
import Resource from './Resource.js';
import User from './User.js';
import EventRequest from './EventRequest.js';
import Event from './Event.js';
import EventRequirement from './EventRequirement.js';
import Team from './Team.js';
import EventMember from './EventMember.js';
import Leaderboard from './Leaderboard.js';
import EventArchive from './EventArchive.js';
import ParticipatedEvent from './ParticipatedEvent.js';
import CommitteeEvent from './CommitteeEvent.js';
import OrganizedEvent from './OrganizedEvent.js';
import EmployeeOrganizedEvent from './EmployeeOrganizedEvent.js';

// Create an object to hold all models
const db = {
  sequelize,
  Student,
  Employee,
  Department,
  Course,
  Subject,
  TimeTable,
  TimeTableEntry,
  Club,
  Resource,
  User,
  EventRequest,
  Event,
  EventRequirement,
  Team,
  EventMember,
  Leaderboard,
  EventArchive,
  ParticipatedEvent,
  CommitteeEvent,
  OrganizedEvent,
  EmployeeOrganizedEvent,
};

// --- (Step 1) DEFINE ALL MODEL ASSOCIATIONS ---

// --- Zone 1: Academic Core Associations ---
Department.hasMany(Employee, { foreignKey: 'departmentId' });
Employee.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(Course, { foreignKey: 'departmentId' });
Course.belongsTo(Department, { foreignKey: 'departmentId' });
Employee.hasOne(Department, { as: 'HeadedDepartment', foreignKey: 'headEmployeeId' });
Department.belongsTo(Employee, { as: 'Head', foreignKey: 'headEmployeeId' });
Course.hasMany(Student, { foreignKey: 'courseId' });
Student.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Subject, { foreignKey: 'courseId' });
Subject.belongsTo(Course, { foreignKey: 'courseId' });
TimeTable.hasMany(TimeTableEntry, { foreignKey: 'timeTableId', onDelete: 'CASCADE' });
TimeTableEntry.belongsTo(TimeTable, { foreignKey: 'timeTableId' });
Course.hasOne(TimeTable, { foreignKey: 'courseId' });
TimeTable.belongsTo(Course, { foreignKey: 'courseId' });
Subject.hasMany(TimeTableEntry, { foreignKey: 'subjectId' });
TimeTableEntry.belongsTo(Subject, { foreignKey: 'subjectId' });
Employee.hasMany(TimeTableEntry, { foreignKey: 'employeeId' });
TimeTableEntry.belongsTo(Employee, { foreignKey: 'employeeId' });
Employee.hasMany(Resource, { foreignKey: 'inchargeEmployeeId' });
Resource.belongsTo(Employee, { as: 'Incharge', foreignKey: 'inchargeEmployeeId' });
Club.hasMany(Event, { foreignKey: 'clubId', allowNull: true, defaultValue: null });
Event.belongsTo(Club, { foreignKey: 'clubId' });

// --- Zone 2: Event Layer Associations ---
User.hasMany(Event, { foreignKey: 'organizerId' });
Event.belongsTo(User, { as: 'Organizer', foreignKey: 'organizerId' });
Event.hasMany(Event, { as: 'SubEvents', foreignKey: 'parentId', onDelete: 'CASCADE' });
Event.belongsTo(Event, { as: 'ParentEvent', foreignKey: 'parentId' });
Event.hasMany(EventRequest, { foreignKey: 'parentFestId' });
EventRequest.belongsTo(Event, { as: 'ParentFest', foreignKey: 'parentFestId' });
Event.hasMany(Team, { foreignKey: 'eventId', onDelete: 'CASCADE' });
Team.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(Leaderboard, { foreignKey: 'eventId', onDelete: 'CASCADE' });
Leaderboard.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(EventMember, { foreignKey: 'eventId', onDelete: 'CASCADE' });
EventMember.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(EventRequirement, { foreignKey: 'eventId', onDelete: 'CASCADE' });
EventRequirement.belongsTo(Event, { foreignKey: 'eventId' });
Resource.hasMany(EventRequirement, { foreignKey: 'resourceId' });
EventRequirement.belongsTo(Resource, { foreignKey: 'resourceId' });
Team.hasMany(EventMember, { foreignKey: 'teamId', onDelete: 'SET NULL', allowNull: true });
EventMember.belongsTo(Team, { foreignKey: 'teamId' });
Student.hasMany(Team, { as: 'LedTeams', foreignKey: 'teamLeaderStudentId' });
Team.belongsTo(Student, { as: 'TeamLeader', foreignKey: 'teamLeaderStudentId' });
Student.hasMany(EventMember, { foreignKey: 'memberId', constraints: false, scope: { memberType: 'Student' } });
EventMember.belongsTo(Student, { foreignKey: 'memberId', constraints: false });
Employee.hasMany(EventMember, { foreignKey: 'memberId', constraints: false, scope: { memberType: 'Employee' } });
EventMember.belongsTo(Employee, { foreignKey: 'memberId', constraints: false });

// --- Zone 3: Archive Layer Associations ---
EventArchive.hasMany(ParticipatedEvent, { foreignKey: 'eventArchiveId', onDelete: 'CASCADE' });
EventArchive.hasMany(CommitteeEvent, { foreignKey: 'eventArchiveId', onDelete: 'CASCADE' });
EventArchive.hasMany(OrganizedEvent, { foreignKey: 'eventArchiveId', onDelete: 'CASCADE' });
EventArchive.hasMany(EmployeeOrganizedEvent, { foreignKey: 'eventArchiveId', onDelete: 'CASCADE' });
ParticipatedEvent.belongsTo(EventArchive, { foreignKey: 'eventArchiveId' });
CommitteeEvent.belongsTo(EventArchive, { foreignKey: 'eventArchiveId' });
OrganizedEvent.belongsTo(EventArchive, { foreignKey: 'eventArchiveId' });
EmployeeOrganizedEvent.belongsTo(EventArchive, { foreignKey: 'eventArchiveId' });

Student.hasMany(ParticipatedEvent, { foreignKey: 'studentId' });
ParticipatedEvent.belongsTo(Student, { foreignKey: 'studentId' });
Student.hasMany(CommitteeEvent, { foreignKey: 'studentId' });
CommitteeEvent.belongsTo(Student, { foreignKey: 'studentId' });
Student.hasMany(OrganizedEvent, { foreignKey: 'studentId' });
OrganizedEvent.belongsTo(Student, { foreignKey: 'studentId' });
Employee.hasMany(EmployeeOrganizedEvent, { foreignKey: 'employeeId' });
EmployeeOrganizedEvent.belongsTo(Employee, { foreignKey: 'employeeId' });

// Export all models and sequelize instance
export default db;