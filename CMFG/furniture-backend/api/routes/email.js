const express = require("express");
const router = express.Router();

const emailController = require('../controllers/emailController');

// Handle incoming POST requests to /orders

router.post("/",  emailController.send_email);

module.exports = router;