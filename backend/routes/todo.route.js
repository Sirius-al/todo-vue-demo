const express = require('express');
const router = express.Router();

const { createTodo, deleteTodo, getAllTodos, updateTodo, updateTodoStatus, getAllActiveTodos, getAllCompletedTodos, markTodosCompleted, deleteMultipleTodos, updateTodoColor } = require('../controllers/todo.controller')

router.get('/', getAllTodos)

router.get('/active', getAllActiveTodos)

router.get('/completed', getAllCompletedTodos)

router.patch('/mark-complete', markTodosCompleted)

router.post('/', createTodo)

router.patch('/:id', updateTodo)

router.patch('/status/:id', updateTodoStatus)

router.patch('/color/:id', updateTodoColor)

router.delete('/:id', deleteTodo)

router.put('/', deleteMultipleTodos)

module.exports = router;