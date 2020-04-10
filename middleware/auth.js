const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Beater ', '');
        const decoded = jwt.verify(token, 'authorized');
        const user = Users.findOne({ _id: decoded._id, 'tokens.toke': token});

        if(!user){
            throw new Error();
        }

        req.token = token;
        req.user = user;

        next();

    } catch (e) {
        res.status(401).send({error: "Please Authenticate"});
    }
}

module.exports = auth;