<template>
    <div class="create_todo">
        <v-row align="baseline" justify="center">
            <v-col cols="10">
                <v-form @submit="onSubmit">
                    <v-text-field label="create todo" clearable placeholder="ex: need some groceries" @input="onInput" :value="inputtedValue"/>
                </v-form>
            </v-col>
            <v-col cols="1">
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
    }
</style>