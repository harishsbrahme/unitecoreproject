const express = require('express');
const router = express.Router();
const taskController = require('../controller/task.controller');
const validateTask = require('../middlewares/dataauthentication.middleware');

router.post('/tasks',validateTask, async (req, res) => {
    try {
        const taskdetails = req.body;
        const response = await taskController.createTask(taskdetails);
        res.statusCode(200).json(response);
    } catch (error) {
        res.statusCode(503).json({ msg: error.message });
    }
});
router.get('/tasks', async (req, res) => {
    try {
        const taskDetails = await taskController.getTasks();
        res.statusCode(200).json(taskDetails);
    } catch (error) {
        res.statusCode(503).json({ msg: error.message });
    }
})
router.get('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskDetails = await taskController.getTaskById(taskId);
        res.statusCode(200).json(taskDetails);
    } catch (error) {
        res.statusCode(503).json({ msg: error.message });
    }
});

router.put('/tasks/:id',validateTask, async (req, res) => {
    try {
        const taskId=req.params.id;
        const taskdetails = req.body;
        const response = await taskController.updateTask(taskId,taskdetails);
        res.statusCode(200).json(response);
    } catch (error) {
        res.statusCode(503).json({ msg: error.message });
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskDetails = await taskController.deleteTaskById(taskId);
        res.statusCode(200).json({msg:"Task deleted successfully!!!"});
    } catch (error) {
        res.statusCode(503).json({ msg: error.message });
    }
});
module.exports = router;