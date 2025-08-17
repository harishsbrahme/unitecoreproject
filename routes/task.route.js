const express = require('express');
const router = express.Router();
const taskController = require('../controller/task.controller');
const validateTask = require('../middlewares/dataauthentication.middleware');

router.post('/tasks',validateTask, async (req, res) => {
    try {
        const taskdetails = req.body;
        const response = await taskController.createTask(taskdetails);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
router.get('/tasks', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { allTasks, page: currentPage, totalPages, totalTasks }  = await taskController.getTasks(page, limit);
        res.status(200).json({
            allTasks,
            pagination: {
                currentPage,
                totalPages,
                totalTasks,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})
router.get('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskDetails = await taskController.getTaskById(taskId);
        res.status(200).json(taskDetails);
    } catch (error) {
        res.status(404).json({ msg: 'Task not found', error: error.message });
    }
});

router.put('/tasks/:id',validateTask, async (req, res) => {
    try {
        const taskId=req.params.id;
        const taskdetails = req.body;
        const response = await taskController.updateTask(taskId,taskdetails);
        res.status(200).json(response);
    } catch (error) {
        if (error.message === 'Task not found') {
            return res.status(404).json({ msg: error.message });
        }
        res.status(500).json({ msg: error.message });
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskDetails = await taskController.deleteTaskById(taskId);
       
        res.status(200).json({msg:"Task deleted successfully!!!"});
    } catch (error) {
          if (error.message === 'Task not found') {
            res.status(404).json({ msg: error.message });
        } else {
            res.status(500).json({ msg: error.message });
        }
    }
});


router.get('/searchedTask', async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm || '';
        console.log(searchTerm,"searchTerm");
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const { tasks, totalPages, totalTasks } = await taskController.searchTasks(searchTerm, page, limit);

        res.status(200).json({
            tasks,
            pagination: {
                currentPage: page,
                totalPages,
                totalTasks,
                limit,
            },
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error searching tasks', error: error.message });
    }
});
module.exports = router;