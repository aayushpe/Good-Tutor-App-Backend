const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "This user has not added a description yet"
    },
    rating: {
        type: Number,
        default: 5
    }
})

module.exports = mongoose.model('User', userSchema)