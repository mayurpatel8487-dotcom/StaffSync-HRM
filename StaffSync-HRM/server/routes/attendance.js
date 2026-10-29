const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.get('/', async (req, res) => {
  try {
    const logs = await Attendance.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/punch', async (req, res) => {
  try {
    const { userId, userName, type } = req.body;
    const today = new Date().toISOString().split('T')[0];
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let record = await Attendance.findOne({ userId, date: today });
    if (!record) {
      record = new Attendance({
        userId,
        userName,
        date: today,
        checkIn: timeNow,
        status: 'Present'
      });
    } else {
      if (type === 'out') {
        record.checkOut = timeNow;
      }
    }
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
