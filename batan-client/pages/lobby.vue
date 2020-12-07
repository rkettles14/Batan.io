<template>
  <b-container class="lobby" fluid>
    <b-row class="content" align-v="stretch">
      <b-col class="games" cols="8">
        <div class="selector-box">
          <b-button
            variant="info"
            class="selector"
            @click="displayActiveGames()"
          >
            Active Games
          </b-button>

          <b-button
            variant="info"
            class="selector"
            @click="displayCreateGame()"
          >
            Create Game
          </b-button>

          <b-button
            variant="info"
            class="selector"
            @click="displayJoinGame()"
          >
            Join Game
          </b-button>
        </div>

        <div v-show="showActiveGames">
          <ActiveGames />
        </div>

        <div v-show="showCreateGame">
          <CreateNewGame />
        </div>

        <div v-show="showJoinGame">
          <JoinGame />
        </div>
      </b-col>
      <b-col>
        <Chat />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  name: "Lobby",
  components: {},
  data() {
    return {
      showActiveGames: true,
      showCreateGame: false,
      showJoinGame: false,
    }
  },

  created() {
    this.$store.commit("chat/changeToChatRoom", "lobby");
  },
  methods: {

    displayActiveGames() {
      this.showActiveGames = true;
      this.showCreateGame = false;
      this.showJoinGame = false;
    },

    displayCreateGame() {
      this.showActiveGames = false;
      this.showCreateGame = true;
      this.showJoinGame = false;
    },

    displayJoinGame() {
      this.showActiveGames = false;
      this.showCreateGame = false;
      this.showJoinGame = true;
    },
  }
});
</script>

<style lang="css" scoped>
.lobby {
  height: 90%
}

.content {
  height: 100%;
}

.games {
  margin: 0 8px 0 0;
}

.selector-box {
  margin: 2px;
}

.selector {
  margin: 2px 4px;
}
</style>
