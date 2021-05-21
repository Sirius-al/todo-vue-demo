const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active'
    }
})

const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo