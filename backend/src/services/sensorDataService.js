const SensorData = require('../models/sensorData');

// Get all sensor data
async function getAllSensorData() {
  try {
    return await SensorData.find({});
  } catch (err) {
    console.error('Error fetching all sensor data:', err);
    return [];
  }
}

// Calculate total excavation from all records
async function getTotalExcavation() {
  const allData = await getAllSensorData();
  const totalExcavated = allData.reduce((sum, record) => sum + record.bucketLoad, 0);
  return { totalExcavated, recordCount: allData.length };
}

module.exports = { getAllSensorData, getTotalExcavation };
