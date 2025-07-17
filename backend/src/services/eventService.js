const Event = require('../models/Event');

const createEvent = async (type, vehicleId, details) => {
  const event = new Event({ type, vehicleId, details });
  return await event.save();
};

const getAllEvents = async () => {
  return await Event.find().sort({ timestamp: -1 });
};

module.exports = { createEvent, getAllEvents };
