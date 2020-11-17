<template>
  <nav class="navbar">
    <div class="">
      <NuxtLink to="/lobby" class="brand">
        <img id="logo" src="@/static/icon.png">
        <h1>Batan</h1>
      </NuxtLink>
    </div>
    <div v-if="$auth.loggedIn" class="nav-right">
      <select class="" name="" v-model="activeGame" v-if="games.length > 0">
        <option v-for="game in games" :key="game">
          {{ game }}
        </option>
      </select>
      <NuxtLink to="/profile">
        <img id="profile" :src="$auth.user.picture">
      </NuxtLink>
      <button @click.prevent="logout()">Log out</button>
    </div>
    <div v-else class="nav-right">
      <button @click.prevent="login()">Sign up or Log in</button>
    </div>
  </nav>
</template>

<script>
const axios = require('axios').default; // TODO: Move to store

export default {
  name: "Navbar",
  props: {

  },
  data() {
    return {
      games: ["game 1", "game2 "],   //TODO: move to vuex store
      activeGame: null
    }
  },
  methods: {
    login() {
      this.$auth.loginWith('auth0');
    },
    logout() {
      this.$auth.logout()
    },
    gameSelected() {
    }
  },
  watch: {
    activeGame: function() {
      // TODO: Update active game in vuex-store
      this.$router.push({
        path: '/game-screen'
      })
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      // TODO: Add check (profile not loaded), move profile load & state grab to store
      this.$axios.setToken(this.$auth.getToken('auth0'));
      this.$axios.get('http://localhost:3001/').then((response) => {
        console.log(response);
      });
      console.log("sending req")
    } else {
      console.log("not logged in")
    }
  }
}
</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

nav {
  width: 100%;
  background-color: black;
  color: white;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 3em;
}

.nav-right {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.nav-right * {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

select {
  font-size: 1.25rem;
  border-radius: 0.25em;
  background-color: white;
}

a {
  color: white;
  font-size: 2rem;
  font-family: Roboto, Ariel, sans-serif;
}

a:hover {
  text-decoration: none;
}

#logo {
  height: 2rem;
}

#profile {
  height: 2rem;
  border-radius: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
}

button {
  background-color: #f0f0f0;
  padding: 0.25rem;
  border-radius: 0.5rem;
}
</style>
