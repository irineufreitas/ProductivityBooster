const Task = require('../models/Task');

// Add a new task
exports.addTask = async (req, res) => {
  const { title, description, dueDate, completed, user } = req.body;

  try {
    const task = new Task({ title, description, dueDate, completed, user });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('user');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update Task
exports.updateTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  //delete Task
  exports.deleteTask = async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
