const taskService = require("../services/taskService");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(201).json(tasks);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Error while fetching courses' });
    }
};

const getTask = (req, res) => {
    const task = taskService.getTask(req.params.id);
    return task;
};

const createTask = async (req, res) => {
    try {
        const taskData = req.body;
        console.log("Task data received in backend: " ,taskData);
        const newtask = await taskService.createTask(taskData);
        console.log(newtask);
        res.status(201).json(newtask);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Error while creating task' });
    }
};

const updateTask = async (req, res) => {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    updatedTask ? res.json(updatedTask) : res.status(404).send('Task not found');
};

const deleteTask = async (req,res) => {
    const deletedTask  = await taskService.deleteTask (req.params.id);
    deletedTask ? res.json({message : "Deleted"}) : res.status(404).send('Task not found');
};

module.exports = {getAllTasks, getTask, createTask, updateTask, deleteTask};