const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController'); // Adjust path as needed

// Define the POST route for sending emails
router.post('/', emailController.sendEmail);

module.exports = router;
