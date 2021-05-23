const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active'
    },
    color: {
        type: String,
        default: 'green'
    },
    createdAt: {
        type: String,
        default: new Date()
    }
})

const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo