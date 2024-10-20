const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', 
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['junior', 'mid', 'senior'], 
    required: true,
  },
  candidates: [{
    type: String, 
    required: true,
  }],
  endDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true }); 

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
