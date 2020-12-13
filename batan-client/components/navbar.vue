<template>
  <nav class="navbar">
    <div class="">
      <NuxtLink to="/lobby" class="brand">
        <img id="logo" src="/batanLogo_noText.png">
        <h1>Batan.io</h1>
      </NuxtLink>
    </div>
    <div v-if="$auth.loggedIn" class="nav-right">
      <b-button :to="'/test_sockets'" variant="light">sock test</b-button>

      <div v-if='$store.state.games.alert'><b-icon icon="bell-fill" class="rounded-circle bg-warning p-1" font-scale='2' variant="light"></b-icon></div>


      <b-dropdown v-if="active_game != ''" variant="light" :text="active_game.game_name" right :options="games">
        <b-dropdown-item v-for="game in games" :key="game.game_id" @click="gameSelected(game)">{{ game.game_name }} <span v-if='game.alerts'> 🔔</span> </b-dropdown-item>
      </b-dropdown>

      <b-dropdown id="profile-btn" right no-caret class="sm">
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
      name: String
    }
  },
  computed: {
    games() {
      return Object.values(this.$store.state.games.active_games);
    },
    active_game() {
      return this.$store.state.games.active_game;
    },
    active_game_name(){
      return this.$store.state.games.active_game.game_name;
    }
  },
  methods: {
    login() {
      this.$auth.loginWith('auth0');
    },
    logout() {
      try {
        this.$root.socket.disconnect()
      } catch (err) {
        // ignore.. socket already closed
      }

      // Log out - clearing
      this.$auth.logout();

      // TODO: Clear all local user data (vuex gameboard, chat, localStorage, cookies)..
    },
    gameSelected(game) {
      this.$store.commit('games/changeGame', game);
      this.$store.commit("chat/createChatRoom", this.$store.state.games.active_game.game_name);
      this.$store.commit("chat/changeToChatRoom", this.$store.state.games.active_game.game_name);
      this.$router.push({
        path: '/game-screen'
      });
    },
    initSock() {
      /*
      * Initialize socket connection (game-chat shared socket)
      * Do NOT call if not logged in (access token required), authentication will fail.
      */

      // Persisting in $root rather than using 'persist';
      // see https://github.com/richardeschloss/nuxt-socket-io/issues/118
      this.$root.socket = this.$nuxtSocket({
        name: 'client-socket',
        // persist: 'socket', // omitting for now
        teardown: false
      });
      this.$root.socket.on('connect', () => {
          this.$root.socket
          .emit('authenticate', { token: this.$auth.getToken('auth0').split(' ')[1] })
          .on('authenticated', () => {
            this.$root.socket.emit('info/addNick', this.$auth.user.nickname);
          })
          .on('unauthorized', (msg) => {
            console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
            this.logout();
          })
      });
    }
  },
  watch: {
  },
  mounted() {
    // created() hook runs server side & client side
    if (this.$auth.loggedIn) {
      this.initSock();

      // API calls (if needed? this is just an auth test..)
      this.$axios.setToken(this.$auth.getToken('auth0'));
      this.$axios.get('http://localhost:3001/api/test/hi').then((response) => {
        console.log(response)
      });
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
  background-color: slategray;
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
