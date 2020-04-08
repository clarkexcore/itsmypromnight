const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    }
});

const Entries = mongoose.model('entries', entrySchema);

module.exports = Entries;