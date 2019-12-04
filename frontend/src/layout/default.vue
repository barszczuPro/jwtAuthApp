<template lang="pug">
  v-app#inspire(dark)
    v-navigation-drawer(v-model='drawer' app clipped)
      v-list(dense)
        v-list-item(:to="{ name: `dashboard` }")
          v-list-item-action
            v-icon dashboard
          v-list-item-content
            v-list-item-title Dashboard
        v-list-item(:to="{ name: `account` }")
          v-list-item-action
            v-icon account_box
          v-list-item-content
            v-list-item-title My account
        v-list-item(:to="{ name: `users` }")
          v-list-item-action
            v-icon people
          v-list-item-content
            v-list-item-title Users
        v-list-item(@click='logoutUserMethod')
          v-list-item-action
            v-icon exit_to_app
          v-list-item-content
            v-list-item-title Log out
    v-app-bar(app clipped-left)
      v-app-bar-nav-icon(@click.stop='drawer = !drawer')
      v-toolbar-title jwtAuth
    v-content
      v-container(fluid, fill-height)
        v-layout(justify-center row fill-height)
          router-view
    v-footer(app)
      span &copy; 2019 jwtAuth
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Default",
  data() {
    return {
      drawer: true
    };
  },
  props: {
    source: String
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    logoutUserMethod() {
      this.logoutUser()
    }
  }
};
</script>
