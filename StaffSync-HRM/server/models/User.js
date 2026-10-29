const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['HR', 'Manager', 'Employee'], default: 'Employee' },
  department: { type: String, default: 'General' },
  designation: { type: String, default: 'Staff' },
  status: { type: String, enum: ['Active', 'On Leave', 'Remote'], default: 'Active' },
  dateOfJoining: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
