const mongoose = require('mongoose')

const SavedSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    savedAt: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Saved', SavedSchema)

