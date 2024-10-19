const Job = require("../models/jobModel");


const createJob = async (req, res) => {
  const { companyId, jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;

  try {
    const newJob = new Job({
      companyId,
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
    });

    await newJob.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Failed to create job.' });
  }
}

module.exports = { createJob }