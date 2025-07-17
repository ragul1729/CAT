const eventService = require('../services/eventService');

const createEvent = async (req, res) => {
  const { type, vehicleId, details } = req.body;
  try {
    const event = await eventService.createEvent(type, vehicleId, details);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createEvent, getAllEvents };
