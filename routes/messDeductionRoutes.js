const express = require('express');
const router = express.Router();
const multer = require('multer');
const MessDeductionRequest = require('../models/MessDeductionRequest');

// Set up multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, JPEG, PNG allowed'), false);
    }
  }
});

// POST /messdeduction/mess
router.post('/mess', upload.single('document'), async (req, res) => {
  try {
    const {
      studentID,
      nameOfStudent,
      rollNumber,
      branchAndSem,
      roomNo,
      numberOfDays,
      fromDate,
      toDate,
      reason
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Document file is required' });
    }

    const newRequest = new MessDeductionRequest({
      studentID,
      nameOfStudent,
      rollNumber,
      branchAndSem,
      roomNo,
      numberOfDays,
      fromDate,
      toDate,
      reason,
      documents: {
        document: req.file.filename
      }
    });

    await newRequest.save();

    res.status(201).json({
      message: 'Mess deduction request submitted successfully',
      data: newRequest
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit request', error: err.message });
  }
});

module.exports = router;
