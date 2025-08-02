// mongoose
const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const MONGODB_URI = `mongodb+srv://sushmoy:${password}@cluster0.ipwbpuv.mongodb.net/noteapp?retryWrites=true&w=majority&appName=Cluster0`

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result => console.log('connected'))
    .catch(error => console.log('an error occured', error.message))

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    date: String,
    important: Boolean,
})

// remove the id and version property of mongo.js
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
// const Note = mongoose.model('Note', noteSchema)

module.exports = mongoose.model('Note', noteSchema)