const User = require('../model/User');

const getContacts = async (req, res) => {
	console.log('getting all contacts');

	let user;
	try {
		user = await User.findOne({ username: req.user }).exec();
	} catch (err) {
		return res.status(400).json({ message: 'Invalid User' });
	}

	const arr = [];
	if (user.contacts.length == 0)
		return res.status(200).json({ message: 'No contacts' });
	user.contacts.forEach((contact) => {
		arr.push(contact.username);
	});

	res.status(200).json({ message: 'Contacts List OK', contacts: arr });
};

const addContact = async (req, res) => {
	console.log('adding contact');
	if (!req?.body?.contact) {
		return res.status(400).json({ message: 'Contact Name Required' });
	}
	let user;
	try {
		user = await User.findOne({ username: req.user }).exec();
	} catch (err) {
		return res.status(400).json({ message: 'Invalid User' });
	}
	//Is contact valid?
	try {
		const addContact = await User.findOne({
			username: req.body.contact,
		}).exec();
		if (!addContact) {
			return res
				.status(400)
				.json({ message: 'Invalid Contact; does not exist' });
		}
	} catch (err) {
		return res.status(400).json({ message: 'Invalid Contact; does not exist' });
	}

	// if contact doesn't already exist
	if (
		!user.contacts.find((contact) => {
			if (contact.username == req.body.contact) return true;
		})
	) {
		console.log(user.contacts);
		const entry = {
			username: req.body.contact,
		};

		user.contacts.push(entry);
		try {
			const result = await user.save();
			return res.status(200).json({ message: 'Contact Added' });
		} catch (err) {
			return res.status(500).json({ message: 'Cannot update in DB' });
		}
	} else {
		return res.status(409).json({ message: 'Contact Already Exists' });
	}
};
const delContact = async (req, res) => {};

module.exports = { getContacts, addContact, delContact };
