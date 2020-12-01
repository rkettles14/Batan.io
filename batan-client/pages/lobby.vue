<template>
  <b-container class="lobby" fluid>
    <b-row class="content" align-v="stretch">
      <b-col class="games" cols="8">
        <span class="selectors">
          <b-button variant="success" @click="displayActiveGames()">Active Games</b-button>
          <b-button variant="success" @click="displayCreateGame()">Create New Game</b-button>
          <b-button variant="success" @click="displayJoinGame()">Join Game With Code</b-button>
        </span>

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
    this.$root.chatId = "lobby";
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

.selectors {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: space-around;
}
</style>
