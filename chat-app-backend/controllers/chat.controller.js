const Chat = require('../models/chat.model.js');
const User = require('../models/user.model.js');

const fetchChats = async (req, res) => {
    try {
        const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 });
        const chatsPopulated = await User.populate(chats, {
            path: 'latestMessage.sender',
            select: 'name email img',
        });
        return res.status(200).send(chatsPopulated);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in fetchChats', error);
        return res.status(400).send({ message: 'Error in fetchChats' });
    }
};

const accessChat = async (req, res) => {
    try {
        const { userId } = req.body;
        const chats = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate('users', '-password')
            .populate('latestMessage');
        const chatsPopulated = await User.populate(chats, {
            path: 'latestMessage.sender',
            select: 'name email img',
        });
        if (chatsPopulated.length) {
            return res.send(chatsPopulated[0]);
        }
        const chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId],
        };
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createdChat._id })
            .populate('users', '-password');
        return res.status(200).send(fullChat);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in accessChat', error);
        return res.status(400).send({ message: 'Error in accessChat' });
    }
};

const createGroupChat = async (req, res) => {
    try {
        const { name, users } = req.body;
        if (!name || !users) {
            return res.status(400).send({ message: 'Request validation error' });
        }
        const groupUsers = JSON.parse(users);
        if (groupUsers.length < 2) {
            return res.status(400).send({ message: 'Groups should have more than 2 users' });
        }
        groupUsers.push(req.user);
        const groupChat = await Chat.create({
            chatName: name,
            users: groupUsers,
            isGroupChat: true,
            groupAdmin: req.user,
        });
        const fullgroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');
        return res.status(200).send(fullgroupChat);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in createGroupChat', error);
        return res.status(400).send({ message: 'Error in createGroupChat' });
    }
};

const renameGroupChat = async (req, res) => {
    try {
        const { chatId, chatName } = req.body;
        const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');
        if (!updatedChat) {
            return res.status(400).send({ message: 'Group chat not found' });
        }
        return res.status(200).send(updatedChat);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in renameGroupChat', error);
        return res.status(400).send({ message: 'Error in renameGroupChat' });
    }
};

const addToGroupChat = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const addedToChat = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');
        if (!addedToChat) {
            return res.status(400).send({ message: 'Group chat not found' });
        }
        return res.status(200).send(addedToChat);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in addToGroupChat', error);
        return res.status(400).send({ message: 'Error in addToGroupChat' });
    }
};

const removeFromGroupChat = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const removedFromChat = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');
        if (!removedFromChat) {
            return res.status(400).send({ message: 'Group chat not found' });
        }
        return res.status(200).send(removedFromChat);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in removeFromGroupChat', error);
        return res.status(400).send({ message: 'Error in removeFromGroupChat' });
    }
};

module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroupChat,
    addToGroupChat,
    removeFromGroupChat,
};
