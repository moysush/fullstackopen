// mongodb
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

mongoose.connect(url).then(() => console.log('mongodb connected')).catch(error => console.log('there was an error: ', error))

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: function(v) {
                // Regex pattern: 
                // ^: start of string
                // \d{2,3}: 2 or 3 digits
                // -: literal dash
                // \d+: one or more digits
                // $: end of string
                return /^\d{2,3}-\d+$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number! Format should be XX-XXXXXX or XXX-XXXXXX`
        }
    }
})

// remove __v from the json in response
personSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)