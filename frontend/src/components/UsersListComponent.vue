<template lang="pug">
  v-card.mx-auto(tile)
    v-list
      v-subheader Users
      v-list-item-group
        v-list-item(v-for='(item, i) in usersList' :key='i')
          v-list-item-icon
            v-icon person
          v-list-item-content
            v-list-item-title(v-text='item.email')
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UsersListComponent",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["usersList"])
  },
  methods: {
    ...mapActions("auth", ["fetchUsersList"])
  },
  created() {
    this.fetchUsersList();
  }
};
</script>

<style></style>
