const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks for the authenticated user
router.get('/tasks', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Add a new task
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, dueDate, userId } = req.body;
    const task = new Task({ title, description, dueDate, user: userId });
    await task.save();
    res.status(201).json({ message: 'Task added successfully', task });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add task' });
  }
});

// Get all tasks for a user
router.get('/tasks/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

module.exports = router;
