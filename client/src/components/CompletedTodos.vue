<template>
  <div>
    <div class="mark_completed">
      <v-btn
        v-model="checkbox"
        label="Mark all Completed"
        @click="deleteAllCompletedTodos"
        >Clear Completed</v-btn
      >
    </div>
    <v-list>
      <ListItem
        v-for="todo in getAllCompletedTodos"
        :key="todo._id"
        :todo="todo"
        @statusChanged="reRender"
      />
    </v-list>
  </div>
</template>

<script>
import ListItem from './ListItem';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

    export default {
        name: "completedTodos",
        components: {
        ListItem
        },
        computed: {
            ...mapGetters([
                'getAllCompletedTodos',
            ])
        },
        methods: {
            ...mapActions([
                'fetchCompletedTodos'
            ]),
            reRender() {
                this.fetchCompletedTodos()
            },
            async deleteAllCompletedTodos() {
                const todos = this.getAllCompletedTodos.map(todo => todo._id)
                await axios.put(`http://localhost:5000/api/todo/`, {todos})
                this.reRender()
            },
        },
        created() {
            this.reRender()
        },
        updated() {
            this.reRender()
        },
    };
</script>

<style scoped>
</style>