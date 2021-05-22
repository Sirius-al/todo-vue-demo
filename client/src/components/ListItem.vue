<template>
  <div>
    <div class="list_item_grid">
      <v-list-item :class="{ 'list_item': todo.status === 'completed'}" :ripple="false">
        <template v-slot:default>
          <v-list-item-action @click="onSelected" v-if="!inputField">
            <v-checkbox :input-value="todo.status==='completed'"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-if="!inputField" :class="{ 'text-decoration-line-through': todo.status === 'completed'}" class="theText" @click="updateTodo">
                {{todo.title}} <span v-if="todo.status === 'active'"> {{ todo.status }} </span>
            </v-list-item-title>
            <v-list-item-title v-if="inputField">
                <v-form @submit="onSubmit">
                  <v-text-field label="create todo" clearable placeholder="ex: need some groceries" @input="onInput" :value="inputtedValue"/>
                </v-form>
            </v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>
      <div :class="{ 'list_item_bgc' : todo.status === 'completed'}">
        <v-btn icon color="red" @click="onDeleteTodo">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<!-- Script Script Script Script Script Script Script Script -->
<!-- Script Script Script Script Script Script Script Script -->
<script>
import axios from 'axios'
import { mapActions } from 'vuex';

export default {
  name: "ListItem",
  props: {
    todo: Object,
    selected: Boolean
  },
  data: () => ({
    Selected: false,
    inputField: false,
    inputtedValue: ''
  }),
  methods: {
    ...mapActions([
      'fetchTodos',
    ]),
    async onSelected() {
      this.Selected = !this.Selected;
      await axios.patch(`http://localhost:5000/api/todo/status/${this.todo._id}`)
      this.$emit('statusChanged')
      this.fetchTodos()
    },
    updateTodo() {
      this.inputField = true;
    },
    onInput(e) {
      this.inputtedValue = e;
    },
    async onSubmit(e) {
      e.preventDefault();
      if (this.inputtedValue !== this.todo.title) {
        await axios.patch(`http://localhost:5000/api/todo/${this.todo._id}`, {title: this.inputtedValue})
      }
      this.inputField = false;

    },
    async onDeleteTodo() {
      await axios.delete(`http://localhost:5000/api/todo/${this.todo._id}`)
      this.fetchTodos()
    },
  },
  created() {
    this.inputtedValue = this.todo.title
    if (this.todo.status === 'completed') {
      this.Selected = true
    }
  },
};
</script>

<!-- Style Style Style Style Style Style Style Style Style-->
<!-- Style Style Style Style Style Style Style Style Style-->
<style scoped>
.list_item_grid {
  display: flex;
  align-items: center;
}
.list_item_bgc {
  background-color:  #e4e4e4 !important;
  height: 3em;
  padding-top: .4em;
}
.theText {
    color: rgb(17, 17, 17);
    font-size: 1.2rem;
}
.theText > span {
    color: rgb(148, 148, 148);
    font-size: .7rem;
    font-weight: 400;
    margin-left: 5em;
}
.list_item {
  background-color: #e4e4e4;
}
</style>