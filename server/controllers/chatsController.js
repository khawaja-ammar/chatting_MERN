const User = require('../model/User');

const getChats = async (req, res) => {
	// console.log('getting all chats');
	if (!req?.params?.id)
		return res.status(400).json({ message: 'Contact required' });

	let user;
	try {
		user = await User.findOne({ username: req.user }).exec();
	} catch (err) {
		return res.status(400).json({ message: 'Invalid User' });
	}

	const arr = [];
	if (user.contacts.length == 0)
		return res.status(200).json({ message: 'No contacts' });

	let index = 0;
	let check = false;

	while (index < user.contacts.length) {
		if (user.contacts[index].username == req.params.id) {
			check = true;
			break;
		}
		index++;
	}
	if (!check)
		return res.status(200).json({ message: 'Person not in your contacts' });

	if (!user.contacts[index]?.chat) return res.status(200).json({ message: [] });

	const chats = [];
	user.contacts[index].chat.forEach((msg) => {
		const item = {
			creator: msg.creator,
			time: msg.time,
			content: msg.content,
		};
		chats.push(item);
	});
	res.status(200).json({ message: chats });

	// res.status(200).json({ message: 'Contacts List OK', contacts: arr });
};

module.exports = { getChats };
