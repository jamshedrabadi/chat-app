const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const authenticateUser = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.status(401).send({ message: 'User token not found' });
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedUserInfo = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedUserInfo.id).select('-password'); // wihtout password
        next();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in authenticateUser', error);
        return res.status(401).send({ message: 'User token not authorized' });
    }
};

module.exports = {
    authenticateUser,
};
