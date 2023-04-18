const express = require('express');
const router = express.Router();
const chatsController = require('../../controllers/chatsController');

router.route('/:id').get(chatsController.getChats);

module.exports = router;
