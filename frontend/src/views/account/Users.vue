<template lang="pug">
  .users
    v-container(fluid)
      v-row(no-gutters)
        v-col.col-12.col-md-6.pa-2
          users-list-component
        v-col.col-12.col-md-6.pa-2
          create-user-component
</template>

<script>
import CreateUserComponent from "../../components/CreateUserComponent";
import UsersListComponent from "../../components/UsersListComponent";

export default {
  name: "Users",
  components: { UsersListComponent, CreateUserComponent },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.users {
  flex: 1;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;

  & > div {
    flex: 1;
  }

  &-list {
    display: flex;
    justify-content: center;
  }

  &-create {
    display: flex;
    justify-content: center;
  }
}
</style>
