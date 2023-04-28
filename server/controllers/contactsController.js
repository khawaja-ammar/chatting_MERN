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
    if (user.contacts.length === 0) {
        return res.status(200).json({ message: 'No contacts', contacts: [] });
    }
    user.contacts.forEach((contact) => {
        // arr.push(contact.username)
        arr.push({
            username: contact.username,
            lastMessageTime: contact.lastMessageTime || null,
            lastMessageRead: contact.lastMessageRead || true,
        });
    });

    return res.status(200).json({ message: 'Contacts List OK', contacts: arr });
};

const addContact = async (req, res) => {
    console.log('adding contact');
    if (!req.body.contact) {
        return res.status(400).json({ message: 'Contact Name Required' });
    }
    let user;
    try {
        user = await User.findOne({ username: req.user }).exec();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid User' });
    }
    // Is contact valid?
    if (req.body.contact === req.user) {
        return res
            .status(400)
            .json({ message: 'Cannot add yourself as contact' });
    }

    try {
        const newContact = await User.findOne({
            username: req.body.contact,
        }).exec();
        if (!newContact) {
            return res
                .status(400)
                .json({ message: 'Invalid Contact; does not exist' });
        }
    } catch (err) {
        return res
            .status(400)
            .json({ message: 'Invalid Contact; does not exist' });
    }

    // if contact doesn't already exist
    if (
        !user.contacts.find((contact) => {
            if (contact.username === req.body.contact) {
                return true;
            }
            return false;
        })
    ) {
        // console.log(user.contacts);
        const entry = {
            username: req.body.contact,
        };

        user.contacts.push(entry);
        try {
            await user.save();
            return res.status(200).json({ message: 'Contact Added' });
        } catch (err) {
            return res.status(500).json({ message: 'Cannot update in DB' });
        }
    } else {
        return res.status(409).json({ message: 'Contact Already Exists' });
    }
};
// const delContact = async (req, res) => {};

module.exports = { getContacts, addContact };
