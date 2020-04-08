const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    country: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Entries = mongoose.model('entries', entrySchema);

module.exports = Entries;