const express = require('express');
const router = express.Router();
// const authController = require('../controllers/authController');
const contactController = require('../../controllers/contactsController');

router
	.route('/')
	.get(contactController.getContacts)
	.put(contactController.addContact);

module.exports = router;
