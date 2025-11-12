import db from '../models/index.js'; // ✅ CORRECTED: Default import
import { sendResourceRequestMail } from '../utils/mailer.js';

export const addEventRequirement = async (req, res) => {
  const { eventId } = req.params;
  const { items } = req.body; // Expecting: items = [{ resourceId: 1, quantity: 10 }, { resourceId: 5, quantity: 100 }]
  const organizer = req.user; 
  const t = await db.sequelize.transaction();

  try {
    const event = await db.Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const requirementPromises = items.map(item => 
      db.EventRequirement.create({
        eventId,
        resourceId: item.resourceId,
        quantity: item.quantity,
        status: 'Pending',
      }, { transaction: t })
    );
    const createdRequirements = await Promise.all(requirementPromises);

    const resourceIds = items.map(item => item.resourceId);
    const resources = await db.Resource.findAll({
      where: { resourceId: resourceIds },
      include: [{ model: db.Employee, as: 'Incharge', attributes: ['email', 'name'] }]
    });

    const mailMap = new Map();
    for (const reqItem of createdRequirements) {
      const resource = resources.find(r => r.resourceId === reqItem.resourceId);
      if (resource && resource.Incharge) {
        const inchargeEmail = resource.Incharge.email;
        const inchargeName = resource.Incharge.name;
        
        if (!mailMap.has(inchargeEmail)) {
          mailMap.set(inchargeEmail, { inchargeName, items: [] });
        }
        
        mailMap.get(inchargeEmail).items.push({
          name: resource.resourceName,
          quantity: reqItem.quantity,
        });
      }
    }

    const mailPromises = [];
    const organizerUser = await db.User.findByPk(organizer.id); // Get organizer's email
    
    for (const [inchargeEmail, data] of mailMap.entries()) {
      mailPromises.push(
        sendResourceRequestMail({
          inchargeEmail: inchargeEmail,
          inchargeName: data.inchargeName,
          organizerName: organizerUser.email, 
          event,
          items: data.items,
        })
      );
    }
    await Promise.all(mailPromises);
    
    await t.commit();
    res.status(201).json({ message: 'Requirements submitted and emails sent.', data: createdRequirements });

  } catch (error) {
    await t.rollback();
    console.error('Error submitting requirements:', error);
    res.status(500).json({ message: 'Error submitting requirements' });
  }
};