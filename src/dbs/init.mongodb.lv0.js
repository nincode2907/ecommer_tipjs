const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://mongosv29:12345678x@cluster0.2e3y9hj.mongodb.net/?retryWrites=true&w=majority'

const init = () => {
    mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log('Error connecting to MongoDB')
    });
}

module.exports = {
    init
}