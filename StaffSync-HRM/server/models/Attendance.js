const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String },
  date: { type: String, required: true },
  checkIn: { type: String },
  checkOut: { type: String },
  status: { type: String, enum: ['Present', 'Absent', 'Half-Day', 'On Leave'], default: 'Present' }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
