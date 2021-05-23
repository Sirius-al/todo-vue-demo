<template>
    <div class="create_todo">
        <v-row align="baseline" justify="center" class="create_task_grid">
            <v-col cols="11" class="create_task_input">
                <v-form @submit="onSubmit">
                    <v-text-field label="Create Task" clearable placeholder="ex: need some groceries" @input="onInput" :value="inputtedValue"/>
                </v-form>
            </v-col>
            <v-col cols="1" class="create_task_btn">
                <v-btn color="primary" elevation="6" fab @click="onTodoAdd">
                    <v-icon dark> mdi-plus </v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

    export default {
        name: 'CreateTodo',
        data: () => ({
            inputtedValue: ''
        }),
        methods: {
            ...mapActions([
                'fetchTodos'
            ]),
            onInput(val) {
                this.inputtedValue = val;
            },
            async createTodo() {
                if (this.inputtedValue.length < 1) {
                  return
                }
                await axios.post('http://localhost:5000/api/todo', {title: this.inputtedValue})
                this.inputtedValue = ''
                this.fetchTodos()
            },
            onTodoAdd() {
                this.createTodo()
            },
            onSubmit(e) {
                e.preventDefault();
                this.createTodo()
            }
        },
    }
</script>

<style scoped>
    .create_todo {
        height: 5em;
        margin-bottom: 2em;
    }
     /* .create_task_input {
        margin-left: 50px
    } */
     .create_task_input .v-input {
        margin-left: 19px;
    }
    /*
    .create_task_grid {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .create_task_btn [

    ] */
</style>