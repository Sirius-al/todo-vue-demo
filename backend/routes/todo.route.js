const express = require('express');
const router = express.Router();

const { createTodo, deleteOneOrManyTodo, getAllTodos, updateTodo, updateTodoStatus } = require('../controllers/todo.controller')

router.get('/', getAllTodos)

router.post('/', createTodo)

router.patch('/:id', updateTodo)

router.patch('/status/:id', updateTodoStatus)

router.delete('/:id?', deleteOneOrManyTodo)

module.exports = router;