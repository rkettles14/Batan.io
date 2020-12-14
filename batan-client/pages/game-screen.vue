<template>
  <b-container v-if="$store.state.games.active_game != '' && $auth.loggedIn" fluid>
    <EndGame></EndGame>
    <b-row class="row-1 no-gutters">
      <b-col cols="8">
        <b-container fluid>
          <b-row class="row-1 no-gutters">
            <b-col cols="12">
              <GameBoard  />
            </b-col>
          </b-row>
          <b-row class="row-2 no-gutters controls">
            <b-col cols="8">
              <ResourceCards />
            </b-col>
            <b-col cols="4" v-show="displayActions() && myTurn()">
              <PlayerActions/>
            </b-col>
            <b-col cols="4" v-show="displayDice() && myTurn()">
              <Dice/>
            </b-col>
            <b-col cols="4" @click="makePurchase()" v-show="displayPurchase() && myTurn()">
              <PurchaseOptions />
            </b-col>
          </b-row>
        </b-container>
      </b-col>
      <b-col>
        <b-container fluid>
          <b-row class="row-3 no-gutters">
            <b-col cols="12">
              <Chat />
            </b-col>
          </b-row>
          <b-row class="row-4 no-gutters">
            <b-col cols="12">
              <Scoreboard />
            </b-col>
          </b-row>
        </b-container>
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
      purchasing: false
    }
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push({
        path: '/'
      });
    }

    this.$nuxt.$on('playerActions/purchase', (purchasing) => {
      this.purchasing = purchasing;
    })

    this.$nuxt.$on('purchaseOptions/undoPurchase', () => {
      this.purchasing = false;
    })

    this.$nuxt.$on('purchaseOptions/buyDevCard', () => {
      //TODO: Do the stuff for buying a dev card
    })

    this.$nuxt.$on('dice/rollDice', () => {
      console.log('setting rolling to false');
      this.displayActions();
    })
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

    displayPurchase(){
      let buildPhase = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.phase == 'build' ? true : false;
      let purchasing = this.purchasing;
      return buildPhase && purchasing;
    },

    displayActions(){
      let purchasing = this.purchasing;
      return (!this.displayDice()) && (!purchasing);
    },

    displayDice(){
      let rollPhase = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.phase == 'roll' ? true : false;
      return rollPhase;
    },
    myTurn(){
      return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.player == this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.name ? true : false;
    }
  }
});

</script>

<style scoped>
@media screen and (max-width: 1500px){
  .controls {
      display: none;
  }
}
.row-1 {
  height: 80%;
}
.row-2 {
  height: 20vh;
}
.row-3 {
    min-height: 62vh;
    max-height: 62vh;
    overflow: hidden;
}
</style>
