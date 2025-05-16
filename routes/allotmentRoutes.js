const express = require('express');
const multer = require('multer');
const path = require('path');
const Allotment = require('../models/Allotment');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route: POST /api/allotments/allotment
router.post('/allotment', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'aadhar', maxCount: 1 },
  { name: 'regSlip', maxCount: 1 },
  { name: 'hostelSlip', maxCount: 1 },
  { name: 'messSlip', maxCount: 1 },
]), async (req, res) => {
  try {
    // Parse JSON-formatted string fields
    const { personal, emergency, academic, hostel } = JSON.parse(req.body.data);

    const documents = {
      photo: req.files['photo']?.[0]?.filename || '',
      aadhar: req.files['aadhar']?.[0]?.filename || '',
      regSlip: req.files['regSlip']?.[0]?.filename || '',
      hostelSlip: req.files['hostelSlip']?.[0]?.filename || '',
      messSlip: req.files['messSlip']?.[0]?.filename || ''
    };

    const allotment = new Allotment({
      personal,
      emergency,
      academic,
      hostel,
      documents
    });

    await allotment.save();
    res.status(201).json({ message: 'Allotment submitted successfully!' });
  } catch (err) {
    console.error('Error saving allotment:', err);
    res.status(500).json({ error: 'Failed to save allotment' });
  }
});

module.exports = router;
