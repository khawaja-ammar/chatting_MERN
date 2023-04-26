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

// ADD READ STATUS??
// MAYBE in contacts instead, the last unread message etc

module.exports = messageSchema;
