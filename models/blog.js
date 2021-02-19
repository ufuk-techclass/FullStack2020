const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')


//Schema
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  id: String
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {

    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)