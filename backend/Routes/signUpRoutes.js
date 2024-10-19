const express = require('express');
const { companyRegistration, companyVerification } = require('../Controller/signUpController');

const router = express.Router();

router.post("/company-registration", companyRegistration);
router.post("/company-verification", companyVerification);

module.exports = router;