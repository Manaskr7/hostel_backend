const mongoose = require('mongoose');

const allotmentSchema = new mongoose.Schema({
    personal: {
      firstName: String,
      lastName: String,
      fatherName: String,
      motherName: String,
      dob: String,
      gender: String,
      pwd: String,
      address: String,
      district: String,
      state: String,
      country: String,
      mobile: String,
      altContact: String,
    },
    emergency: {
      contactFirstName: String,
      contactLastName: String,
      email: String,
      mobile: String,
    },
    academic: {
      rollNumber: String,
      regNumber: String,
      branch: String,
      semester: String,
    },
    hostel: {
      hostelName: String,
      roomNumber: String,
    },
    documents: {
      photo: String,
      aadhar: String,
      regSlip: String,
      hostelSlip: String,
      messSlip: String,
    }
  });

module.exports = mongoose.model('Allotment', allotmentSchema);
