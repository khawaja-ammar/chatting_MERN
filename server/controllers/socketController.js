const User = require('../model/User');

const addMessageDB = async (sender, receiver, msg) => {
    console.log(receiver, 'recvs from', sender, msg);
    let senderUser;
    try {
        senderUser = await User.findOne({ username: sender }).exec();
    } catch (err) {
        return 'Invalid User';
    }

    if (senderUser.contacts.length == 0) return 'No contacts';

    let indexSender = 0;
    let check = false;

    while (indexSender < senderUser.contacts.length) {
        if (senderUser.contacts[indexSender].username == receiver) {
            check = true;
            break;
        }
        indexSender++;
    }

    if (!check) return 'Person not in your contacts';

    let receiverUser;
    try {
        receiverUser = await User.findOne({ username: receiver }).exec();
    } catch (err) {
        return 'Contact does not exist';
    }

    let indexRecv = 0;
    check = false;

    while (indexRecv < receiverUser.contacts.length) {
        if (receiverUser.contacts[indexRecv].username == sender) {
            check = true;
            break;
        }
        indexRecv++;
    }

    if (!check) {
        //create contact
        const entry = {
            username: sender,
        };
        receiverUser.contacts.push(entry);
        try {
            const result = await receiverUser.save();
        } catch (err) {
            return 'Cannot reach User in DB';
        }
    }
    // Create Chatroom
    if (!senderUser.contacts[indexSender]?.chat) {
        senderUser.contacts[indexSender].chat = [];
    }
    if (!receiverUser.contacts[indexRecv]?.chat) {
        receiverUser.contacts[indexRecv].chat = [];
    }

    const chatMessage = {
        creator: sender,
        time: Date.now(),
        content: msg,
    };

    // SendMessage
    senderUser.contacts[indexSender].chat.push(chatMessage);
    receiverUser.contacts[indexRecv].chat.push(chatMessage);
    try {
        await senderUser.save();
        await receiverUser.save();
        return 'ok';
    } catch (err) {
        return 'DB Error';
    }
};

module.exports = {
    addMessageDB,
};
