const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String, 
            required: true,
            trim: true,
            match:  [/.+@.+\..+/]
            // validation: 
        },
        thoughts: {
            type: String
        },
        friends: {
            type: String
        }
    }
);

const User = model('User', UserSchema);

module.exports = User;