const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://anhpham:${password}@cluster0.9gsjf.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('person', personSchema)
if (process.argv.length === 5) {
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    newPerson.save().then(result => {
        console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
        mongoose.connection.close()
    })
}
else {
    Person.find({}).then(result => {
    console.log('phonebook')
    result.forEach(person => {
        
        console.log(`${person.name} ${person.number}`)
    })
  mongoose.connection.close()
})
}
