const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/DiaryBook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB successfully!'))
.catch((err) => console.error('Error connecting to MongoDB:', err));


const DiarySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      sidecontent1: {
        type: String,
        default: ""
      },
      sidecontent2: {
        type: String,
        default: ""
      },
      sidecontent3: {
        type: String,
        default: ""
      },
      date: {
        type: String,
        required: true
      },
      mood: {
        type: [String], // Array of strings to store top 3 moods
        required: true
      }
})

module.exports = mongoose.model('diary',DiarySchema)