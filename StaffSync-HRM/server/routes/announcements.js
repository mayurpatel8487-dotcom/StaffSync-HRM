const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, category, postedBy } = req.body;
    const announcement = new Announcement({ title, content, category, postedBy });
    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
