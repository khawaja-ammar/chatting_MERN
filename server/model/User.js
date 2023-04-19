const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = require('./Contact');

// const msg = new Schema({
// 	creator: {
// 		type: String,
// 		required: true,
// 	},
// 	time: {
// 		type: Date,
// 		required: true,
// 	},
// 	content: {
// 		type: String,
// 		required: true,
// 	},
// });

// Group chats? add groupchatIDs in users which show active groups of User

// const contact = new Schema({
// 	username: {
// 		type: String,
// 		required: true,
// 	},
// 	chat: {
// 		type: [msg],
// 		default: undefined,
// 	},
// });

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: String,
    contacts: {
        type: [contactSchema],
        default: [],
    },
});

module.exports = mongoose.model('User', userSchema);
