const Task = require('../models/Task.model');

const createTask = async (taskDetails) => {
    if (!taskDetails.title || !taskDetails.priority) {
        throw new Error('Title and priority are required.');
    }
    const task = new Task(taskDetails);
    await task.save();
    return task;
};

const getTasks = async () => {
    const allTasks = await Task.find();
    return allTasks;
};

const getTaskById = async (taskId) => {
    const task = await Task.findOne({_id:taskId});
    return task;
};

const updateTask = async (taskId, taskDetails) => {
    const updatedTask = await Task.updateOne(
        { _id: taskId },
        { $set: taskDetails }
    );
    if (!updatedTask.matchedCount) {
        throw new Error('Task not found');
    }
    return updatedTask;
};

const deleteTaskById = async (taskId) => {
    const task = {};
    return task;
}




module.exports = {
    createTask: createTask,
    getTasks: getTasks,
    getTaskById: getTaskById,
    updateTask: updateTask,
    deleteTaskById: deleteTaskById
}