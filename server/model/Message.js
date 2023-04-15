const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	creator: {
		type: String,
		required: true,
	},
	time: {
		type: Date,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
});

module.exports = messageSchema;
