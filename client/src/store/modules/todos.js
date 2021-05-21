// import axios from 'axios';

const state = {
    todos: [
        {
            id: 1,
            title: 'todo One'
        }, 
        {
            id: 1,
            title: 'todo Two'
        }
    ]
};

const getters = {
    getAllTodos: (state) => state.todos
};

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions, 
    mutations
}