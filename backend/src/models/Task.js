const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName : String,
    startTime : Date,
    endTime : Date,
    machineID : String,
    operatorID : String,
    duration : Date,
    status : String,
    location : String
});

module.exports = mongoose.model("Task", taskSchema);