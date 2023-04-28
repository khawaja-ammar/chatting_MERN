const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = require('./Message');

const contactSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    chat: {
        type: [messageSchema],
        default: undefined,
    },
    lastMessageTime: {
        type: Date,
    },
    lastMessageRead: Boolean,
});

// Add last message Date + read status

module.exports = contactSchema;
