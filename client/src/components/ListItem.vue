<template>
  <div>
    <div class="list_item_grid">
      <v-list-item class="list_item" :ripple="false" @click="onSelected">
        <template v-slot:default="{ active }">
          <v-list-item-action>
            <v-checkbox :input-value="active"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title :class="{ 'text-decoration-line-through' :Selected }" class="theText">
                some texts <span > active </span>
            </v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>
      <div :class="{ 'list_item_bgc' : Selected }">
        <v-btn icon color="red">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  data: () => ({
    Selected: false,
  }),
  methods: {
    onSelected() {
      this.Selected = !this.Selected;
    //   console.log(this.Selected);
    },
  },
};
</script>

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
</style>