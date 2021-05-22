const Todo = require("../models/todo.model")


exports.getAllActiveTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find()

        const activeTodos = todos.filter((todo) => todo.status === 'active')

        res.status(200).json({
            success: true,
            todos: activeTodos
        })
    } catch (err) {
        console.log(err)
    }
}

exports.getAllCompletedTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find()

        const activeTodos = todos.filter((todo) => todo.status === 'completed')

        res.status(200).json({
            success: true,
            todos: activeTodos
        })
    } catch (err) {
        console.log(err)
    }
}

exports.markTodosCompleted = async (req, res, next) => {
    try {

        const todos = req.body.todos

        todos.map(async (id) => {
            const todo = await Todo.findOne({_id: id})
            todo.status = 'completed'
            await todo.save()
        })


        res.status(200).json({
            success: true,
        })
    } catch (err) {
        console.log(err)
    }
}

exports.getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find()

        res.status(200).json({
            success: true,
            todos
        })
    } catch (err) {
        console.log(err)
    }
}


exports.createTodo = async (req, res, next) => {
    try {
        const { title } = req.body

        const todo = await Todo.create({title})

        res.status(201).json({
            success: true,
            todo
        })

    } catch (err) {
        console.log(err)
    }
}


exports.deleteTodo = async (req, res, next) => {
    try { 
        const id = req.params.id

        await Todo.deleteOne({_id: id})
        res.status(200).json({
            success: true,
            msg: 'deleted todo'
        })

    } catch (err) {
        console.log(err)
    }
}

exports.deleteMultipleTodos = async (req, res, next) => {
    try { 
        
        const todos = req.body.todos

        todos.map(async (id) => {
            console.log(id)
            await Todo.deleteOne({_id: id})
        })


        res.status(200).json({
            success: true,
            msg: 'deleted todos !',
        })
    } catch (err) {
        console.log(err)
    }
}


exports.updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const todo = await Todo.findOne({_id: id})

        todo.title = title
        await todo.save()

        res.status(201).json({
            success: true,
            todo
        })
        
    } catch (err) {

        console.log(err)
    }

}


exports.updateTodoStatus = async (req, res, next) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findOne({_id: id})

        if (todo.status === 'active') {
            todo.status = 'completed'
        } else {
            todo.status = 'active'
        }

        await todo.save()

        res.status(200).json({
            success: true,
            todo
        })
        
    } catch (err) {
        console.log(err)
    }

}