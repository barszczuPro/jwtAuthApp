<template lang="pug">
  .create-user
    | Create new user
    v-form(ref='form', v-model='valid', lazy-validation)
      v-text-field(
        v-for="(item, index) in fields"
        :key="index"
        v-model='item.value',
        :type="item.type"
        :rules='item.rules',
        :label='item.label',
        :required="item.required"
        @keyup.enter="registerUserMethod()")
      v-btn.mr-4(:disabled='!valid',
        color='primary',
        @click='registerUserMethod()')
        | Create
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CreateUserComponent",
  data() {
    return {
      valid: true,
      fields: {
        name: {
          value: "",
          type: "text",
          rules: [v => !!v || "Name is required"],
          label: "Name",
          required: true
        },
        email: {
          value: "",
          type: "text",
          rules: [
            v => !!v || "E-mail is required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
          ],
          label: "E-mail",
          required: true
        },
        password: {
          value: "",
          type: "password",
          rules: [v => !!v || "Password is required"],
          label: "Password",
          required: true
        }
      }
    };
  },
  methods: {
    ...mapActions("auth", ["registerUser", "fetchUsersList"]),
    registerUserMethod() {
      const { name, email, password } = this.fields;
      if (this.$refs.form.validate()) {
        this.registerUser({
          email: email.value,
          password: password.value,
          name: name.value
        })
          .then(() => {
            this.$notify({
              group: "notify",
              type: "success",
              text: "Created user"
            });
            this.fetchUsersList();
          })
          .catch(() => {
            this.$notify({
              group: "notify",
              type: "error",
              text: "User creation failed"
            });
          });
      }
    }
  }
};
</script>
