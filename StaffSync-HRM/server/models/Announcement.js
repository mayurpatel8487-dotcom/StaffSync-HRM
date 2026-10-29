const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'Notice' },
  postedBy: { type: String, default: 'HR Department' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', AnnouncementSchema);
