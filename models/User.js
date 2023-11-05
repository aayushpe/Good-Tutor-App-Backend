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
    filters: [{
        type: String,
        default: "all"
    }],
    roles: [{
        type: String,
        default: "user"
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)