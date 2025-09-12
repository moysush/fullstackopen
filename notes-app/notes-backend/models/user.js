const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        unique: true // this ensures the uniqueness of username
    },
    name: String,
    passwordHash: {
        type: String,
        minLength: 6
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // password should not be revealed
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User