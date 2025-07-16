const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Give password as an argument');
    process.exit(1)
}

mongoose.set('strictQuery', false)

// arguments
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://sushmoy:${password}@cluster0.ipwbpuv.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)

const personSchema = mongoose.Schema({
    Name: String,
    Number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    Name: name,
    Number: number
})


if (process.argv.length < 4) {
    // using Person directly because we have no use of person object here + it will only give us error
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        })
        mongoose.connection.close()
    })
} else {
    // saving the person
    person.save().then(result => {
        console.log(`added ${name}, number ${number} to the phonebook`)
        mongoose.connection.close()
    })
}