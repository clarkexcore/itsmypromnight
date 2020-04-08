const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if (value.toLowerCase().includes("password")){
                throw new Error("Your password contains password.. Don't be stupid!");
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

//Do not return Password and Tokens when returning a user.
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    
    return userObject;
}

//Generate Authentication Token
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'authorized', {expires:'72hrs'});

    user.tokens = user.tokens.concat({ token });
    await user.save();
    
    return token;
}

//Find user and match password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email} );

    if(!user){
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to Login');
    }

    return user;
}

//Hash the plain text password. 
userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})


//Save Model and Export
const Users = mongoose.model('users', userSchema);

module.exports = Users;


