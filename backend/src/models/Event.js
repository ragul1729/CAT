const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Seatbelt Compliance', 'Proximity Hazard', 'Excessive Idling', 'Low Fuel', 'Sharp Turn at High Speed'],
    required: true
  },
  vehicleId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  
  details: {
    type: mongoose.Schema.Types.Mixed, 
    required: true 
  }
});

module.exports = mongoose.model('Event', eventSchema);
