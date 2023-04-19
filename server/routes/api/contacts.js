const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/contactsController');

router
    .route('/')
    .get(contactController.getContacts)
    .put(contactController.addContact);
// DELETE

module.exports = router;
