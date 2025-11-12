import db from '../models/index.js'; // ✅ CORRECTED: Default import
import { sendPaymentRejectedEmail } from '../utils/mailer.js';

// =================================================================
// ✅ 1. GET PENDING SUB-EVENT REQUESTS (for Main Organizer)
// =================================================================
export const getPendingSubEventRequests = async (req, res) => {
  const mainOrganizerId = req.user.id;
  try {
    const mainEvents = await db.Event.findAll({ 
      where: { organizerId: mainOrganizerId, parentId: null } 
    });
    const mainEventIds = mainEvents.map(e => e.id);

    const requests = await db.EventRequest.findAll({
      where: {
        parentFestId: mainEventIds,
        status: 'Pending_Main_Organizer',
      }
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// =================================================================
// ✅ 2. APPROVE SUB-EVENT REQUEST (Main Organizer Step 2)
// =================================================================
export const approveSubEventRequest = async (req, res) => {
  const { requestId } = req.params;
  try {
    // (Add logic to ensure req.user is the Main Organizer)
    const request = await db.EventRequest.findByPk(requestId);
    request.status = 'Approved';
    await request.save();
    // (Add logic to email the Sub-Organizer that they are fully approved)
    res.status(200).json({ message: 'Sub-event request approved.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// =================================================================
// ✅ 3. REJECT SUB-EVENT REQUEST (Main Organizer)
// =================================================================
export const rejectSubEventRequest = async (req, res) => {
  const { requestId } = req.params;
  const t = await db.sequelize.transaction();
  try {
    // (Add logic to ensure req.user is the Main Organizer)
    const request = await db.EventRequest.findByPk(requestId, { transaction: t });
    if (!request) {
      return res.status(404).json({ message: 'Request not found.' });
    }
    
    request.status = 'Rejected';
    await request.save({ transaction: t });

    const userToRevoke = await db.User.findOne({ where: { email: request.requestorEmail } });
    if (userToRevoke) {
      userToRevoke.role = 'Guest';
      await userToRevoke.save({ transaction: t });
    }
    
    await t.commit();
    // (Add logic to email the Sub-Organizer about the rejection)
    res.status(200).json({ message: 'Sub-event request rejected and user access revoked.' });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

// =================================================================
// ✅ 4. GET PENDING PAYMENT VERIFICATIONS
// =================================================================
export const getPendingVerifications = async (req, res) => {
  const { eventId } = req.params;
  try {
    const teams = await db.Team.findAll({ where: { eventId, paymentStatus: 'Pending' } });
    const individuals = await db.EventMember.findAll({
      where: { eventId, teamId: null, paymentStatus: 'Pending', role: 'Participant' }
    });
    res.status(200).json({ teams, individuals });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// =================================================================
// ✅ 5. VERIFY A PAYMENT (Organizer Button)
// =================================================================
export const verifyPayment = async (req, res) => {
  const { type, id } = req.body; // e.g., type: 'Team', id: 12
  try {
    let record;
    if (type === 'Team') {
      record = await db.Team.findByPk(id);
    } else {
      record = await db.EventMember.findByPk(id);
    }
    
    if (!record) return res.status(404).json({ message: 'Record not found' });
    
    record.paymentStatus = 'Verified';
    await record.save();
    // (Add logic to send "Payment Verified" email)
    res.status(200).json({ message: 'Payment verified.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// =================================================================
// ✅ 6. REJECT A PAYMENT (Organizer Button)
// =================================================================
export const rejectPayment = async (req, res) => {
  const { type, id, reason } = req.body; 
  try {
    let record;
    let studentEmail;
    let eventName;
    
    if (type === 'Team') {
      record = await db.Team.findByPk(id, { include: [db.Event, {model: db.Student, as: 'TeamLeader'}] });
      studentEmail = record.TeamLeader.email;
      eventName = record.Event.eventName;
    } else {
      record = await db.EventMember.findByPk(id, { include: [db.Event, db.Student] });
      studentEmail = record.Student.email;
      eventName = record.Event.eventName;
    }
    
    if (!record) return res.status(404).json({ message: 'Record not found' });

    await record.destroy(); // This will cascade delete members if it's a Team
    
    await sendPaymentRejectedEmail(studentEmail, eventName, reason);
    
    res.status(200).json({ message: 'Payment rejected and registration deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// =================================================================
// ✅ 7. BUILD TEAM (Add Student/Employee Organiser)
// =================================================================
export const addTeamMember = async (req, res) => {
  const { eventId } = req.params;
  const { memberId, memberType, role } = req.body; // e.g., "S123", "Student", "Student Organiser"
  
  if (!['Student Organiser', 'Committee Member', 'Employee Organiser'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role.' });
  }
  
  try {
    const newMember = await db.EventMember.create({
      eventId,
      memberId,
      memberType,
      role,
      paymentStatus: 'N/A' // Internal team members don't pay
    });
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =================================================================
// ✅ 8. UPDATE LEADERBOARD
// =================================================================
export const updateLeaderboard = async (req, res) => {
  const { eventId } = req.params;
  const { scores, showMarks } = req.body; // scores: [{ competitorId, competitorType, marks }]
  
  const t = await db.sequelize.transaction();
  try {
    await db.Event.update({ showLeaderboardMarks: showMarks }, { where: { id: eventId }, transaction: t });

    const scorePromises = scores.map(s => 
      db.Leaderboard.upsert({ 
        eventId,
        competitorId: s.competitorId,
        competitorType: s.competitorType,
        marks: s.marks
      }, { transaction: t })
    );
    await Promise.all(scorePromises);
    
    // (Add logic to re-calculate ranks)

    await t.commit();
    res.status(200).json({ message: 'Leaderboard updated.' });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};