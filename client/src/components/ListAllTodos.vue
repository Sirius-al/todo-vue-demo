<template>
  <div>
      <v-list>
        <v-list-item-group v-model="settings" multiple active-class="">
            <ListItem />
            <ListItem />
            <ListItem />
        </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import ListItem from './ListItem';

export default {
  name: "ListAllTodos",
  data: () => ({
      settings: []
  }),
  components: {
    ListItem,
  }
};
</script>

<style>
</style>