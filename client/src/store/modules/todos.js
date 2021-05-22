import axios from 'axios';

const state = {
    todos: [],
    completedTodos: [],
    activeTodos: []
};

const getters = {
    getAllTodos: (state) => state.todos,
    getAllCompletedTodos: (state) => state.completedTodos,
    getAllActiveTodos: (state) => state.activeTodos,
};

const actions = {
    async fetchTodos({ commit }) { 
        const res = await axios.get('http://localhost:5000/api/todo')

        commit('setTodos', res.data.todos)
    },
    async fetchActiveTodos({ commit }) { 
        const res = await axios.get('http://localhost:5000/api/todo/active')

        commit('setActiveTodos', res.data.todos)
    },
    async fetchCompletedTodos({ commit }) { 
        const res = await axios.get('http://localhost:5000/api/todo/completed')

        commit('setCompletedTodos', res.data.todos)
    },

    // async updateTodo(context, id, title) { 
    //     await axios.patch(`http://localhost:5000/api/todo/${id}`, {title})
    //     // this.fetchTodos()
    // }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    setActiveTodos: (state, todos) => (state.activeTodos = todos),
    setCompletedTodos: (state, todos) => (state.completedTodos = todos),
};

export default {
    state,
    getters,
    actions, 
    mutations
}