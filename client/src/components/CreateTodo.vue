<template>
    <div class="create_todo">
        <v-row align="baseline" justify="center">
            <v-col cols="10">
                <v-text-field label="create todo" clearable placeholder="ex: need some groceries" @input="onInput" :value="inputtedValue"/>
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
    export default {
        name: 'CreateTodo',
        data: () => ({
            inputtedValue: ''
        }),
        methods: {
            onInput(val) {
                this.inputtedValue = val;
            },
            onTodoAdd() {
                console.log(this.inputtedValue)
                this.inputtedValue = ''
            }
        },
    }
</script>

<style scoped>
    .create_todo {
        height: 5em;
    }
</style>