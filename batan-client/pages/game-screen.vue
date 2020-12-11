<template>
  <b-container fluid>
    <b-row class="row-1 no-gutters">
      <b-col cols="8">
        <GameBoard  />
      </b-col>
      <b-col cols="4">
        <Chat />
      </b-col>
    </b-row>
    <b-row class="row-2 no-gutters">
      <b-col cols="5">
        <ResourceCards />
      </b-col>
      <b-col cols="3" v-if="showActions">
        <PlayerActions/>
      </b-col>
      <b-col cols="3" v-if="this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.phase == 'roll'">
        <Dice/>
      </b-col>
      <b-col cols="3" @click="makePurchase()" v-if="this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.type == 'init'">
        <PurchaseOptions />
      </b-col>
      <b-col cols="4">
        <GamePlayerStats />
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "GameScreen",
  data() {
    return {
      purchasing: false,
    }
  },
  mounted() {
    // this.$root.socket.emit('game/startGame', {game_id: this.$store.state.games.active_game.game_id});
    // TODO: Rather than starting the game, check to see if it was started and prompt the user to wait untill
    // the game is started if not.
  },
  
  methods: {
    makePurchase(){
      this.purchasing = false;
    },

    displayPurchase() {
      let initialMove = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.type == 'init' ? true : false;
      let purchasing = this.purchasing;
      return initalMove || purchasing;
    },
  }
});

</script>

<style scoped>

.row-1 {
  height: 80%;
}
.row-2 {
  height: 20vh;
}
</style>
