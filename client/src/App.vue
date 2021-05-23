<template>
    <v-app>
      <v-container class="">

        <v-tabs v-model="tab" align-with-title background-color="indigo accent-2" centered class="tab_bar">
          <v-tabs-slider color="white"></v-tabs-slider>

          <v-tab class="tab"> All todos </v-tab>
          <v-tab class="tab"> Active </v-tab>
          <v-tab class="tab"> Completed </v-tab>
        </v-tabs>
        <div class="date_and_time">
          <span>{{ moment(Date.now()).format('dddd, Q MMM') }}</span>
        </div>
        <v-tabs-items v-model="tab">
          <v-tab-item class="all_todos_tab">
            <CreateTodo />
            <ListAllTodos />
          </v-tab-item>
          <v-tab-item >
            <ActiveTodos />
          </v-tab-item>
          <v-tab-item >
            <CompletedTodos />
          </v-tab-item>
      </v-tabs-items>

      </v-container>
    </v-app>
    
</template>

<script>
import CreateTodo from './components/CreateTodo';
import ListAllTodos from './components/ListAllTodos';
import ActiveTodos from './components/ActiveTodos';
import CompletedTodos from './components/CompletedTodos';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    CreateTodo,
    ListAllTodos,
    ActiveTodos,
    CompletedTodos
  },

  computed: {
    ...mapGetters([
        'getAllTodos',
    ])

  },
  data: () => ({
    tab: null
  }),

  methods: {
    ...mapActions([
      'fetchTodos'
    ]),
  },

  created() {
    this.fetchTodos()
  },
};
</script>

<style scoped>
  .tab {
    color: white !important;
  }
  .tab_bar {
    border-radius: 10px;
  }
  .date_and_time {
    text-align: center;
    padding: 1em;
  }
  .date_and_time > span {
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>