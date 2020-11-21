<template>
  <nav class="navbar">
    <div class="">
      <NuxtLink to="/lobby" class="brand">
        <img id="logo" src="@/static/icon.png">
        <h1>Batan</h1>
      </NuxtLink>
    </div>
    <div v-if="$auth.loggedIn" class="nav-right">
      <b-dropdown variant="light" right :text="activeGame" :options="games">
        <b-dropdown-item v-for="game in games" :key="game" @click="gameSelected(game)">{{ game }}</b-dropdown-item>
      </b-dropdown>

      <b-dropdown id="profile-btn" right no-caret class="sm" style="background-color: black;">
        <div slot="button-content">
          <img id="profile" class="dropdown" :src="$auth.user.picture">
        </div>
        <b-dropdown-item :to="'/profile'" >Profile
        </b-dropdown-item>

        <b-dropdown-item-button @click.prevent="logout()">Log out</b-dropdown-item-button>
      </b-dropdown>
    </div>
    <div v-else class="nav-right">
      <b-button @click.prevent="login()" size="md" variant="light">Sign up or Log in</b-button>
    </div>
  </nav>
</template>

<script>
import Vue from 'vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

export default Vue.extend({
  name: "Navbar",
  props: {

  },
  data() {
    return {
    }
  },
  computed: {
    games() {
      return Object.keys(this.$store.state.games.games);
    },
    activeGame() {
      return this.$store.state.games.activeGame;
    }
  },
  methods: {
    login() {
      this.$auth.loginWith('auth0');
    },
    logout() {
      this.$auth.logout();
    },
    gameSelected(game) {
      this.$store.commit('games/changeGame', game);
      this.$router.push({
        path: '/game-screen'
      });
    }
  },
  watch: {
  },
  created() {
    if (this.$auth.loggedIn) {
      // TODO: Add check (profile not loaded), move profile load & state grab to store
      this.$axios.setToken(this.$auth.getToken('auth0'));
      this.$axios.get('http://localhost:3001/').then((response) => {
        // console.log(response);
      });
    } else {
      // console.log("not logged in")
    }
  }
});
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
</script>

<style lang="css" scoped>
h1 {
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
  width: 50%;
  justify-content: flex-end;
}
@media (min-width: 1000px) {
  .nav-right {
    width: 500px;
  }

}

.nav-right > * {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

a {
  margin: 0;
  padding: 0;
  color: black;
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
  color: white;
  font-size: 2rem;
  font-family: Roboto, Ariel, sans-serif;
}
</style>
