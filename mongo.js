const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://fs2020:${password}@cluster0.lhwqp.mongodb.net/new_app?retryWrites=true&w=majority`
//  `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

//Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

//Model
const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook: ')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: Date.now()
  })

  person.save().then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}

else {
  console.log('Please provide name and number as an argument: node mongo.js <password> <name> <number>')
  mongoose.connection.close()
}



