const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

const password = process.argv[2]

const url = `mongodb+srv://sushmoy:${password}@cluster0.ipwbpuv.mongodb.net/noteapp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url).then(result => console.log('connected'))

const noteSchema = new mongoose.Schema({
  content: String,
  date: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'JS is coolllll!',
//   date: new Date(),
//   important: true,
// })

Note.find({important: true}).then(result => { // it will find every note as {} is empty
  result.forEach(note => {
    console.log(note);
  })
  mongoose.connection.close()
})

// note.save().then(result => {
//   console.log('note saved!')
//   console.log(result);
//   mongoose.connection.close()
// })