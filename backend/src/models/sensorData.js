const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  sessionId: String,
  machineId: String,
  operatorId: String,
  timestamp: Date,
  bucketLoad: Number,
  cycleTime: Number,
  excavationRate: Number,
  fuelConsumption: Number,
  engineTemperature: Number,
  hydraulicPressure: Number,
  vibrationLevel: Number,
  operatorSeatbelt: Boolean,
  proximityAlert: Boolean
}, { collection: 'sensorData' });  // Use the exact collection name

module.exports = mongoose.model('SensorData', sensorDataSchema);
