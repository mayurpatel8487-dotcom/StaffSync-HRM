const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeName: { type: String, required: true },
  department: { type: String },
  type: { type: String, enum: ['Sick Leave', 'Casual Leave', 'Paid Time Off', 'Emergency'], required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Leave', LeaveSchema);
