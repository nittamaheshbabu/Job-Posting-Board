const express = require('express');
const Job = require('../models/jobModel');
const { createJob } = require('../Controller/jobsController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth);
router.post('/create-job', createJob);

module.exports = router;
