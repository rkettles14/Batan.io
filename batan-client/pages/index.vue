<template>
  <b-container fluid class="container">
    <b-row align-v="center">
      <b-col>
        <span class="title">Welcome to Batan.io! Create an account to play or sign in!</span>
      </b-col>
    </b-row>
    <b-row align-v="center" class="logo-container">
      <b-col>
        <b-img class="center" src="/batanLogo.png"/>
      </b-col>
    </b-row>
    <b-row align-v="center">
      <b-col class="d-flex">
        <b-button
          class="success"
          @click.prevent="login()"
        >
          Sign Un / Login
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import BootstrapVue from 'bootstrap-vue'

export default Vue.extend({
  name: "FrontPage",
  props: {

  },
  methods: {
    login() {
      // todo the below line is giving me a warning. Figure out
      // how to access the auth
      // this.$auth.loginWith('auth0');
    }
  }
});
Vue.use(BootstrapVue);
</script>

<style>
.container {
  margin: 0 auto;
  min-height: calc(100vh - 3rem);
}

.title {
  font-family: 'Space Grotesk', sans-serif;
  display: block;
  text-align: center;
  font-weight: 500;
  font-size: 2rem;
  color: white;
  letter-spacing: 1px;
}

.logo-container {
  flex-grow: 1;
}

.success {
  margin: 0 auto;
  background-color: #00ffea;
  color: black;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
}
</style>
