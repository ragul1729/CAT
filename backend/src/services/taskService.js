const Task = require('../models/Task');

const getAllTasks = async () => {
    try{
        const tasks = await Task.find();
        return tasks;
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

