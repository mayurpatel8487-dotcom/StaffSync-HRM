const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const employees = await User.find().select('-password');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, role, department, designation, status } = req.body;
    const employee = new User({
      name,
      email,
      password: 'defaultPassword123',
      role: role || 'Employee',
      department,
      designation,
      status: status || 'Active'
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
