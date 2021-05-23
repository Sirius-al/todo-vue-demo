<template>
  <div>
    <div class="list_item_grid">
      <v-list-item :class="{ 'list_item': todo.status === 'completed'}" :ripple="false">
        <template v-slot:default>
          <v-list-item-action @click="onSelected" v-if="!inputField">
            <v-checkbox :input-value="todo.status==='completed'"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-if="!inputField" :class="{ 'text-decoration-line-through': todo.status === 'completed'}" class="theText">
              <h5 @click="updateTodo">{{todo.title}}</h5>
              <div class="status">
                <span v-if="todo.status === 'active'"> {{ todo.status }} </span>
                <div class="color_div"  @click="updateColor">
                  <select name="colors" id="colors" @change="onSelectChange" class="v_select" v-if="colorUpdate && todo.status === 'active'">
                    <option value="0">select</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="yellow">Yellow</option>
                  </select>
                  <span :class="todo.color" class="color_span" v-if="colorUpdate === false"></span>
                </div>
                <span v-if="todo.createdAt"> {{ moment(todo.createdAt).format('hh:mm a') }} </span>
              </div>
            </v-list-item-title>
            <v-list-item-title v-if="inputField && todo.status === 'active'">
                <v-form @submit="onSubmit">
                  <v-text-field label="create todo" clearable placeholder="ex: need some groceries" @input="onInput" :value="inputtedValue"/>
                </v-form>
            </v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>
      <div :class="{ 'list_item_bgc' : todo.status === 'completed'}">
        <v-btn icon color="grey" @click="onDeleteTodo">
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
    colorUpdate: false,
    inputtedValue: '',
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
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
      if (this.todo.status === 'active') {
        this.inputField = true;
      }
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
    updateColor() {
      if (this.todo.status === 'active') {
        this.colorUpdate = true;
      }
    },
    async onDeleteTodo() {
      await axios.delete(`http://localhost:5000/api/todo/${this.todo._id}`)
      this.fetchTodos()
    },
    async onSelectChange(e) {
      const color = e.target.value
      await axios.patch(`http://localhost:5000/api/todo/color/${this.todo._id}`, {color})
      this.colorUpdate = false;
      this.fetchTodos()
    }
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
* {
  outline: 0;
}
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.theText h5 { 
    max-width: 40em;
    overflow-x: scroll;
}
.theText h5::-webkit-scrollbar { 
  display: none;
}
.theText span {
    color: rgb(148, 148, 148);
    font-size: .7rem;
    font-weight: 400;
    /* margin-left: 5em; */
}
.list_item {
  background-color: #e4e4e4;
}
.v_select {
  width: 4em;
  font-size: .9rem;
  color: rgb(148, 148, 148);
  border: none;
  padding: 3px 5px;
}
.status {
  display: flex;
  align-items: center;
}
.color_div {
  width: 9em !important;
  text-align: center !important;
  margin: 0 .5em;
}
.red{
  background-color: rgb(106, 0, 0);
  color: #ffffff !important;
  padding: 1px 74px;
  border-radius: 5px;
  cursor: pointer;
}
.green{
  background-color: rgb(0, 97, 3);
  color: #ffffff !important;
  padding: 1px 74px;
  border-radius: 5px;
  cursor: pointer;
}
.blue{
  background-color: rgb(0, 15, 100);
  color: #ffffff !important;
  padding: 1px 74px;
  border-radius: 5px;
  cursor: pointer;
}
.yellow{
  background-color: rgb(112, 105, 0);
  color: #ffffff !important;
  padding: 1px 74px;
  border-radius: 5px;
  cursor: pointer;
}

</style>