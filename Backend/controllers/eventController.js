import Event from '../models/Event.js';

export const addEvent = async (req, res) => {
  try {
    const { eventName, eventDesc, eventDate, venue, eventMode, organizer } = req.body;

    // ✅ Build banner URL if file uploaded
    const bannerUrl = req.file
      ? `/uploads/${req.file.filename}`
      : '';

    const newEvent = await Event.create({
      eventName,
      eventDesc,
      eventDate,
      venue,
      eventMode,
      organizer,
      bannerUrl,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ message: 'Error adding event' });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};
