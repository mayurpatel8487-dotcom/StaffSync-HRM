const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');

router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, employeeName, department, type, startDate, endDate, reason } = req.body;
    const leave = new Leave({
      userId,
      employeeName,
      department,
      type,
      startDate,
      endDate,
      reason,
      status: 'Pending'
    });
    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
