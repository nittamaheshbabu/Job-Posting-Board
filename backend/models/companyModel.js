const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  phone: String,
  companyName: String,
  companyEmail: String,
  employeeSize: String,
  emailOtp: String,
  mobileOtp: String,
  emailVerified: { type: Boolean, default: false },
  mobileVerified: { type: Boolean, default: false },
  otpExpiresAt: { type: Date, required: true }, // OTP expiration time
});

module.exports = mongoose.model('Company', companySchema);
