const User = require('../models/user.model.js');
const { generateToken } = require('../config/token.js');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, img } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ message: 'Request validation error' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const user = await User.create({ name, email, password, img });
        if (!user) {
            return res.status(400).send({ message: 'Error creating user' });
        }
        return res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            img: user.img,
            token: generateToken(user._id),
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in registerUser', error);
        return res.status(400).send({ message: 'Error in registerUser' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: 'Request validation error' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid user' });
        }
        if (!await user.matchPassword(password)) {
            return res.status(400).send({ message: 'Incorrect password' });
        }
        return res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            img: user.img,
            token: generateToken(user._id),
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in loginUser', error);
        return res.status(400).send({ message: 'Error in loginUser' });
    }
};

const searchUsers = async (req, res) => {
    try {
        const { search } = req.query;
        const keyword = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                ],
            }
            : {};
        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); // all except current user
        // const users = await User.find(keyword); // all except current user
        return res.status(200).send(users);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in searchUsers', error);
        return res.status(400).send({ message: 'Error in searchUsers' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    searchUsers,
};
