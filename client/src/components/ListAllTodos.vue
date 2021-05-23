<template>
  <div>
    <div class="total_items">
        <h5>{{ AllTodos.length > 0 ? AllTodos.length : getAllTodos.length }} Tasks </h5>
        <div class="filter_select">
          <v-select :items="items" label="Filter By Color" dense solo @change="filteredColor"></v-select>
        </div>
    </div>
      <v-list>
        <!-- <v-list-item-group v-model="settings" multiple active-class=""> -->
            <div v-if="AllTodos.length === 0">
              <ListItem v-for="todo in getAllTodos" :key="todo._id" :todo="todo" />
            </div>
            <div v-if="AllTodos.length > 0">
              <ListItem v-for="todo in AllTodos" :key="todo._id" :todo="todo" />
            </div>

        <!-- </v-list-item-group> -->
    </v-list>
  </div>
</template>

<script>
import ListItem from './ListItem';
import { mapGetters, mapActions } from 'vuex';

export default {

  name: "ListAllTodos",
  computed: {
    ...mapGetters([
        'getAllTodos',
    ])
  
  },
    data() {
    return {
      items: ['All', 'Green', 'Red', 'Blue', 'Yellow'],
      AllTodos: []
    }
  },
  components: {
    ListItem,
  },
  methods: {
    ...mapActions([
        'fetchTodos',
    ]),
    filteredColor(e) {
      if (e === "All") {
        return this.AllTodos = []
      }
        const filteredtodos = this.getAllTodos.filter(todo => todo.color === e.toLowerCase())
        this.AllTodos = filteredtodos
    }
  },
  updated() {
    this.fetchTodos()
  },
  onUnmounted() {
    return this.AllTodos = []
  }
};
</script>

<style scoped>
  .total_items{
    display: flex;
    justify-content: space-between;

  }
  .filter_select {
    width: 7em;
    margin-right: 6.5em;
  }
</style>