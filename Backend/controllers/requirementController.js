import EventRequirement from '../models/EventRequirement.js';
import { sendRequirementMail } from '../utils/mailer.js';

// 📨 POST: Add new requirement + Send email
export const addRequirement = async (req, res) => {
  try {
    // Save data in DB
    const newRequirement = await EventRequirement.create(req.body);

    // ✅ Send mail to consultant & authorized department head
    await sendRequirementMail(newRequirement);

    res.status(201).json({
      success: true,
      message: 'Requirement added and emails sent successfully.',
      data: newRequirement,
    });
  } catch (error) {
    console.error('❌ Error adding requirement:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding requirement or sending email',
      error: error.message,
    });
  }
};

// 🧾 GET: Fetch all requirements
export const getRequirements = async (req, res) => {
  try {
    const requirements = await EventRequirement.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements,
    });
  } catch (error) {
    console.error('❌ Error fetching requirements:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching requirements',
      error: error.message,
    });
  }
};
