const validateTask = (req, res, next) => {
    const {title,status, priority } = req.body;
       if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'Title is required and must be a string.' });
    }
    if (priority && (priority < 1 || priority > 3)) {
        return res.status(400).json({ message: 'Priority must be between 1 and 3.' });
    }

     if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Status must be one of "pending", "in-progress", or "completed".' });
    }

    next();
}

module.exports = validateTask;