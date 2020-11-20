<template>
  <b-container fluid class="container">
    <b-row align-v="center">
      <b-col>
        <span class="title">Welcome to Batan.io! Create an account to play or sign in!</span>
      </b-col>
    </b-row>
    <b-row align-v="center" class="logo-container">
      <b-col>
        <b-img src="@/static/batanLogo.png"/>
      </b-col>
    </b-row>
    <b-row align-v="center">
      <b-col class="d-flex">
        <b-button
          class="link"
          variant="success"
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
      this.$auth.loginWith('auth0');
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
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  text-align: center;
  font-weight: 300;
  font-size: 2rem;
  color: #35495e;
  letter-spacing: 1px;
}

.logo-container {
  flex-grow: 1;
}

.link {
  margin: 0 auto;
}
</style>
