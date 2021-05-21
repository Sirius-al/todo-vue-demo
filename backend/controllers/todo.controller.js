const Todo = require("../models/todo.model")



exports.getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find()

        res.status(201).json({
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


exports.deleteOneOrManyTodo = async (req, res, next) => {
    try { 
        const id = req.params.id

        if (id) {
            await Todo.deleteOne({_id: id})
            return res.status(200).json({
                success: true,
                msg: 'deleted todo'
            })
        }
        
        const todos = req.body.todos

        todos.map(async (id) => {
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