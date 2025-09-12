require('dotenv').config()
const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.env.password

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url).then(() => console.log('connected'))

const noteSchema = new mongoose.Schema({
  content: String,
  date: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  date: new Date(),
  important: true,
})

// Note.find({ important: true }).then(result => { // it will find every note as {} is empty
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

note.save().then(result => {
  console.log('note saved!')
  console.log(result);
  mongoose.connection.close()
})