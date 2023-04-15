const express = require('express');
const router = express.Router();
// const authController = require('../controllers/authController');
const chatController = require('../../controllers/chatController');

router
	.route('/')
	.get(chatController.getContacts)
	.put(chatController.addContact);

module.exports = router;
