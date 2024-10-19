require('dotenv').config(); 
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const Company = require('../models/companyModel');
const jwt = require('jsonwebtoken');

// Load environment variables
const { NM_USER, NM_PASS, NM_FROM, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NM_USER, // Use environment variables for sensitive info
    pass: NM_PASS,
  },
});

// Configure Twilio client
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Function to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Company Registration Route
const companyRegistration = async (req, res) => {
  const { name, phone, companyName, companyEmail, employeeSize } = req.body;

  // Generate OTPs
  const emailOtp = generateOTP();
  const mobileOtp = generateOTP();

  // Save OTPs and company info in the database
  const company = new Company({
    name,
    phone,
    companyName,
    companyEmail,
    employeeSize,
    emailOtp,
    mobileOtp,
    otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
  });

  try {
    await company.save();

    // Send OTP via email
    await transporter.sendMail({
      from: NM_FROM,
      to: companyEmail,
      subject: 'Your Email OTP for Company Registration',
      text: `Your OTP for email verification is ${emailOtp}.`,
    });

    // Send OTP via SMS
    await client.messages.create({
      body: `Your OTP for mobile verification is ${mobileOtp}`,
      from: TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(200).json({ message: 'OTP sent to email and phone.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
};

// Company OTP Verification Route
const companyVerification = async (req, res) => {
  const { phone, emailOtp, mobileOtp } = req.body;
  console.log(req.body);

  const company = await Company.findOne({ phone });
  console.log(company);
  

  if (!company || company.otpExpiresAt < new Date()) {
    return res.status(400).json({ message: 'OTP has expired or does not exist.' });
  }
  
  console.log(company.emailOtp, emailOtp, company.emailOtp == emailOtp);
  // Verify email OTP
  if (emailOtp) {
    console.log("Checking email otp");

    if (company.emailOtp == emailOtp) {
      company.emailVerified = true;
      await company.save();
      return res.status(200).json({ message: 'Email OTP verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid Email OTP.' });
    }
  }

  // Verify mobile OTP
  if (mobileOtp) {
    
    if (company.mobileOtp == mobileOtp) {
      company.mobileVerified = true;
      company.verified = true;
      await company.save();
      const token = await jwt.sign({ _id: company._id, phone: company.phone }, process.env.secret_key, { expiresIn: '7d' });
      return res.status(200).json({
        message: 'Mobile OTP verified successfully',
        token: token,
        company: { phone: company.phone, name: company.name },
      }); 
    } else {
      return res.status(400).json({ message: 'Invalid Mobile OTP.' });
    }
  }

};

module.exports = { companyRegistration, companyVerification };
