const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/DiaryBook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB successfully!'))
.catch((err) => console.error('Error connecting to MongoDB:', err));


const DiarySchema = mongoose.Schema({
    title:String,
    content:String,
    sidecontent1:String,
    sidecontent2:String,
    sidecontent3:String,
    date:String,
})

module.exports = mongoose.model('diary',DiarySchema)