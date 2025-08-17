const validateTask = (req, res, next) => {
    const {status, priority } = req.body;
    const errors = [];
    if (priority && (priority < 1 || priority > 3)) {
        errors.push('Priority must be between 1 and 3.');
    }

     if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
        errors.push('Status must be one of the following: pending, in-progress, completed.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

module.exports = validateTask;