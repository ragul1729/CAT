const { format, differenceInMinutes } = require('date-fns');
const Task = require('../models/Task');

const transformTask = (task) => {
  const start = new Date(task.startTime);
  const end = new Date(task.endTime);
  const durationInMinutes = differenceInMinutes(end, start);

  return {
    name: task.taskName,
    date: format(start, 'yyyy-MM-dd'),
    startTime: format(start, 'hh:mm a'),
    endTime: format(end, 'hh:mm a'),
    machineId: task.machineID,
    duration: durationInMinutes >= 60
      ? `${durationInMinutes / 60} hours`
      : `${durationInMinutes} minutes`,
    status: task.status.toLowerCase()
  };
};

const getAllTasks = async () => {
    try{
        const tasks = await Task.find();
        return tasks.map(transformTask);
    } catch(err){
        console.log("Error while fetching task : ", err);
        throw err;
    }
}

const getTask = async () => {
    return await Task.findById();
}

const createTask = async (data) => {
    try {
        console.log("Inside task service: ", data);
        const newTask = await Task.create(data);
        return newTask;
    } catch(err) {
        console.log("Error while creating task : ", err);
        throw err;
    }
}

const updateTask = async (id, data) => {
    return await Task.findByIdAndUpdate(id, data);
}

const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
}

module.exports = {getAllTasks, getTask, createTask, updateTask, deleteTask};

