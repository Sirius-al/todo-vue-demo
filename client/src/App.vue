<template>
    <v-app>
      <v-container class="">

      <!-- <div class="todos">
        <h3>todos</h3>
        <div class="todo" v-for="todo in getAllTodos" :key="todo.id">
          {{ todo.title }}
        </div>
      </div> -->

        <!-- <v-row no-gutters flex justify="space-around">
          <v-col cols="4" >
            <v-card class="pa-2" outlined tile >
              column 1
            </v-card>
          </v-col>
          <v-spacer />
          <v-col cols="4" >
            <v-card class="pa-2" outlined tile >
              column 2
            </v-card>
          </v-col>
        </v-row> -->

        <v-tabs v-model="tab" align-with-title background-color="indigo accent-2" centered class="tab_bar">
          <v-tabs-slider color="white"></v-tabs-slider>

          <v-tab class="tab"> All todos </v-tab>
          <v-tab class="tab"> Active </v-tab>
          <v-tab class="tab"> Completed </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item class="all_todos_tab">
            <CreateTodo />
            <ListAllTodos />
          </v-tab-item>
          <v-tab-item >
            Active
          </v-tab-item>
          <v-tab-item >
            Completed
          </v-tab-item>
      </v-tabs-items>

      </v-container>
    </v-app>
    
</template>

<script>
import CreateTodo from './components/CreateTodo';
import ListAllTodos from './components/ListAllTodos';

import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    CreateTodo,
    ListAllTodos
  },

  computed: {
    ...mapGetters([
        'getAllTodos',
    ])

  },
  data: () => ({
    tab: null
  }),

};
</script>

<style scoped>
  body {
    background-color: rgb(46, 3, 146);
  }
  .tab {
    color: white !important;
  }
  .tab_bar {
    border-radius: 10px;
  }
</style>