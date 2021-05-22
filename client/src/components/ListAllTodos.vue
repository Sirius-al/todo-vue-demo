<template>
  <div>
      <v-list>
        <!-- <v-list-item-group v-model="settings" multiple active-class=""> -->
            <ListItem v-for="todo in getAllTodos" :key="todo._id" :todo="todo" />
        <!-- </v-list-item-group> -->
    </v-list>
  </div>
</template>

<script>
import ListItem from './ListItem';
import { mapGetters, mapActions } from 'vuex';

export default {

  name: "ListAllTodos",
  data: () => ({
      settings: []
  }),
    computed: {
    ...mapGetters([
        'getAllTodos',
    ])
  
  },
  components: {
    ListItem,
  },
  methods: {
    ...mapActions([
        'fetchTodos',
    ]),
  },
  updated() {
    this.fetchTodos()
  }
};
</script>

<style>
</style>