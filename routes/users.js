const express = require('express');
const Users = require('../models/users');
const auth = require('../middleware/auth');

const router = new express.Router();

// Add User
router.post('/users/add', auth, async(req, res) => {
    const user = new Users(req.body);

    try{
        await user.save();
        const token = await user.generateAuthToken();

        res.status(200).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

//Login User
router.post('/users/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await Users.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(500).send(e);
    }
});

// Logout
router.post('/logout', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();

        res.status(200).send();
    } catch(e) {
        res.status(500).send(e);
    }
});



module.exports = router;