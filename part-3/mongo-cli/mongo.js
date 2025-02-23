const mongoose = require('mongoose')

// check args
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

// config db connection
const password = encodeURIComponent(process.argv[2])
const url = `mongodb+srv://yellokat:${password}@primary.1oviu.mongodb.net/?retryWrites=true&w=majority&appName=primary`
mongoose.set('strictQuery', false)

// database models
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

const args = process.argv
if (args.length === 3) {
    // connnect to db
    mongoose.connect(url)
    // retrieve all & close connection
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else if (args.length === 5) {
    // connect to db
    mongoose.connect(url)
    // add single & close connection
    const person = new Person({
        name: args[3],
        number: args[4],
    })
    person.save().then(result => {
        console.log(`added ${args[3]} ${args[4]} to phonebook`)

        mongoose.connection.close()
    })
} else {
    console.log(`usage : "node mongo.js <password>" or "node mongo.js <password> <name> <number>`)
    process.exit(1)
}


