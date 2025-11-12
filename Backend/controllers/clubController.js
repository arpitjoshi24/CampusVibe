import db from '../models/index.js'; // ✅ CORRECTED: Default import

// =================================================================
// ✅ 1. GET ALL CLUBS (Public)
// =================================================================
export const getAllClubs = async (req, res) => {
  try {
    const clubs = await db.Club.findAll({
      order: [['clubName', 'ASC']]
    });
    res.status(200).json(clubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// =================================================================
// ✅ 2. GET CLUB DETAILS (Public)
// =================================================================
export const getClubDetails = async (req, res) => {
  const { clubId } = req.params;
  try {
    const club = await db.Club.findByPk(clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Find all events associated with this club
    const events = await db.Event.findAll({
      where: { clubId: clubId },
      order: [['startTime', 'DESC']]
    });
    
    res.status(200).json({ club, events });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};