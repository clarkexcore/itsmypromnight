const express = require('express');
const Entries = require('../models/entries');
const auth = require('../middleware/auth');

const router = new express.Router();

//Post new entry
router.post("/new-entry", async (req, res) => {
    const newEntry = new Entries(req.body.entry);
    try{
        await newEntry.save();
        res.status(200).send(newEntry);
    } catch (e){
        res.status(400).send(e);
    }
});




module.exports = router;