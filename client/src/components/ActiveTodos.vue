<template>
    <div>
        <div class="mark_completed">
            <v-btn label="Mark all Completed" @click="markCompleted">Mark All Completed</v-btn>
        </div>
        <v-list>
            <ListItem 
                v-for="todo in getAllActiveTodos" :key="todo._id" 
                :todo="todo" @statusChanged="reRender"
                />
        </v-list>
    </div>
</template>

<script>
import ListItem from './ListItem';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

    export default {
        name: 'ActiveTodos',
        components: {
            ListItem
        },
        computed: {
            ...mapGetters([
                'getAllActiveTodos',
            ])
        },
        methods: {
            ...mapActions([
                'fetchActiveTodos'
            ]),
            reRender() {
                this.fetchActiveTodos()
            },
            async markCompleted() {
                const todos = this.getAllActiveTodos.map(todo => todo._id)
                await axios.patch(`http://localhost:5000/api/todo/mark-complete`, {todos})
                this.reRender()
            },
        },
        //! life-ecycle hooks
        created() {
            this.reRender()
        },
        updated() {
            this.reRender()
        },
    }
</script>

<style>
    .mark_completed {
        margin-left: 1em;
        margin-top: 2em;
        margin-bottom: 2em;
        text-align: center;
    }
</style>