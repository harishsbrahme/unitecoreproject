const express = require('express');
const router = express.Router();
const taskController = require('../controller/task.controller')

router.post('/tasks', (req, res) => {
    try {
        const taskdetails = req.body;
        const response = taskController.createTask(taskdetails);
        res.statusCode(200).json(response);
    } catch (error) {
        res.statusCode(503).json({ msg: error.message });
    }
});
router.get('/tasks', (req, res) => {
    try {
        const taskDetails = taskController.getTasks();
        res.statusCode(200).json(taskDetails);
    } catch (error) {
        res.statusCode(503).json({ msg: error.message });
    }
})
router.get('/tasks/:id', (req, res) => {
    try {
        const taskId = req.params.id;
        const taskDetails = taskController.getTaskById(taskId);
        res.statusCode(200).json(taskDetails);
    } catch (error) {
        res.statusCode(503).json({ msg: error.message });
    }
});

router.put('/tasks/:id', (req, res) => {
    try {
        const taskId=req.params.id;
        const taskdetails = req.body;
        const response = taskController.updateTask(taskId,taskdetails);
        res.statusCode(200).json(response);
    } catch (error) {
        res.statusCode(503).json({ msg: error.message });
    }
});

router.delete('/tasks/:id', (req, res) => {
    try {
        const taskId = req.params.id;
        const taskDetails = taskController.deleteTaskById(taskId);
        res.statusCode(200).json({msg:"Task deleted successfully!!!"});
    } catch (error) {
        res.statusCode(503).json({ msg: error.message });
    }
});
