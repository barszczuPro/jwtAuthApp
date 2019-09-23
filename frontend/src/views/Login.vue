<template lang="pug">
    v-content
      v-container(fluid, fill-height)
        v-layout(align-center, justify-center)
          v-flex(xs12, sm8, md4)
            v-card.elevation-12
              v-toolbar(dark)
                v-toolbar-title auth
              v-card-text
                v-form(
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  )
                  v-text-field(
                    v-for="(item, index) in inputs"
                    :key="index"
                    @keyup.enter="loginMethod"
                    v-model='item.value',
                    :prepend-icon='item.prependIcon',
                    :name='item.name',
                    :label='item.label',
                    :type='item.type'
                    :rules="item.nameRules"
                    :required='item.required')
              v-card-actions
                v-spacer
                v-btn(@click="loginMethod") Login
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      valid: true,
      inputs: {
        login: {
          name: "login",
          label: "Login",
          type: "text",
          value: "",
          nameRules: [
            v => !!v || "E-mail is required",
            v => /.+@.+/.test(v) || "E-mail must be valid"
          ],
          prependIcon: "person",
          required: true
        },
        password: {
          name: "password",
          label: "Password",
          type: "password",
          value: "",
          nameRules: [v => !!v || "Password is required"],
          prependIcon: "lock",
          required: true
        }
      }
    };
  },
  methods: {
    ...mapActions("auth", ["authenticationUser"]),
    loginMethod() {
      if (this.$refs.form.validate()) {
        this.authenticationUser({
          email: this.inputs.login.value,
          password: this.inputs.password.value
        })
          .then(() => {
            this.$router.push({ name: "dashboard" });
          })
          .catch(() => {
            this.$notify({
              group: "notify",
              type: "error",
              text: "Incorrect login/password"
            });
          });
      }
    }
  }
};
</script>
