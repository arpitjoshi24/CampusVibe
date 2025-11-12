import db from '../models/index.js'; // ✅ CORRECTED: Default import
import { sendAttendanceReportEmail } from '../utils/mailer.js';
import { Op } from 'sequelize';

// =================================================================
// ✅ 1. SEND ATTENDANCE REPORT (Organizer Button)
// =================================================================
export const sendAttendanceReport = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await db.Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // 1. Get all *checked in* student attendees
    const attendees = await db.EventMember.findAll({
      where: { eventId, checkedIn: true, memberType: 'Student' },
      include: [{ model: db.Student, include: [db.Course] }]
    });

    // 2. Get the "Generalised Committee List"
    const committee = await db.EventMember.findAll({
      where: {
        eventId,
        memberType: 'Student',
        role: { [Op.or]: ['Student Organiser', 'Committee Member'] }
      },
      include: [{ model: db.Student, include: [db.Course] }]
    });

    // 3. Find all TimeTableEntries that conflict with the event
    const studentGroups = [...new Set(attendees.map(a => 
      `${a.Student.courseId}-${a.Student.year}-${a.Student.section}`
    ))];

    const timeTables = await db.TimeTable.findAll({
      where: {
        [Op.or]: studentGroups.map(g => {
          const [courseId, year, section] = g.split('-');
          return { courseId, year, section };
        })
      }
    });
    
    const timeTableIds = timeTables.map(t => t.timeTableId);

    const conflictingEntries = await db.TimeTableEntry.findAll({
      where: {
        timeTableId: timeTableIds,
        // This is a simplified logic. A real query would check
        // dayOfWeek and time-range overlap.
        // day: { [Op.in]: [/* days of event */] } 
      },
      include: [
        { model: db.TimeTable, include: [db.Course] },
        { model: db.Employee, attributes: ['email', 'name', 'employeeId'] },
        { model: db.Subject }
      ]
    });

    // 4. Map attendees to their conflicting classes
    const conflictMap = new Map(); // Key: employeeId, Value: { employee, classes: Map }
    
    for (const attendee of attendees) {
      const student = attendee.Student;
      
      const missedClasses = conflictingEntries.filter(entry => 
        entry.TimeTable.courseId === student.courseId &&
        entry.TimeTable.year === student.year &&
        entry.TimeTable.section === student.section
      );

      for (const entry of missedClasses) {
        const employee = entry.Employee;
        const employeeId = employee.employeeId;

        if (!conflictMap.has(employeeId)) {
          conflictMap.set(employeeId, {
            employee: employee,
            classes: new Map() 
          });
        }
        
        const employeeData = conflictMap.get(employeeId);
        const classKey = `${entry.TimeTable.Course.courseName} ${entry.TimeTable.year} ${entry.TimeTable.section} (${entry.Subject.subjectName})`;

        if (!employeeData.classes.has(classKey)) {
          employeeData.classes.set(classKey, {
            entry: entry,
            students: []
          });
        }
        
        employeeData.classes.get(classKey).students.push(student);
      }
    }

    // 5. Send one consolidated email per employee
    const mailPromises = [];
    for (const [employeeId, data] of conflictMap.entries()) {
      mailPromises.push(
        sendAttendanceReportEmail({
          employee: data.employee,
          event,
          classes: data.classes, 
          committeeList: committee,
        })
      );
    }

    await Promise.all(mailPromises);

    res.status(200).json({ message: `Attendance report sent to ${mailPromises.length} faculty members.` });

  } catch (error) {
    console.error('Error sending attendance report:', error);
    res.status(500).json({ message: 'Error sending attendance report' });
  }
};