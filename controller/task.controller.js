const Task = require('../models/Task.model');

const createTask = async (taskDetails) => {
    if (!taskDetails.title || !taskDetails.priority) {
        throw new Error('Title and priority are required.');
    }
    const task = new Task(taskDetails);
    await task.save();
    return task;
};

const getTasks = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const allTasks = await Task.find().skip(skip).limit(limit);
    const totalTasks = await Task.countDocuments(); 
    const totalPages = Math.ceil(totalTasks / limit); 
    return {
        allTasks,             
        page,              
        totalPages,        
        totalTasks
    };
};

const getTaskById = async (taskId) => {
    const task = await Task.findOne({_id:taskId});
    return task;
};

const updateTask = async (taskId, taskDetails) => {
    const updatedTask = await Task.updateOne(
        { _id: taskId },
        { $set: taskDetails },
        { new: true }
    );
    if (!updatedTask.matchedCount) {
        throw new Error('Task not found');
    }
    return updatedTask;
};

const deleteTaskById = async (taskId) => {
    const deletedTask = await Task.findByIdAndDelete(taskId); 
    if (!deletedTask) {
        throw new Error('Task not found');
    }
    return deletedTask; 
}




module.exports = {
    createTask: createTask,
    getTasks: getTasks,
    getTaskById: getTaskById,
    updateTask: updateTask,
    deleteTaskById: deleteTaskById
}