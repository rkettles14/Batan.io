<template>
  <b-container v-if="$store.state.games.active_game != ''" fluid>
    <b-row class="row-1 no-gutters">
      <b-col cols="8">
        <GameBoard  />
      </b-col>
      <b-col cols="4">
        <Chat />
      </b-col>
    </b-row>
    <b-row class="row-2 no-gutters" align-h="between">
      <b-col cols="5">
        <ResourceCards />
      </b-col>
      <b-col cols="3" v-show="displayActions()">
        <PlayerActions/>
      </b-col>
      <b-col cols="3" @click="rollDice()" v-show="displayDice()">
        <Dice/>
      </b-col>
      <b-col cols="3" @click="makePurchase()" v-show="displayPurchase()">
        <PurchaseOptions />
      </b-col>
      <b-col cols="4">
        <Scoreboard />
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
      rolling: false,
    }
  },

  created() {
    this.$nuxt.$on('playerActions/purchase', (purchasing) => {
      this.purchasing = purchasing;
    })

    this.$nuxt.$on('purchaseOptions/undoPurchase', () => {
      this.purchasing = false;
    })

    this.$nuxt.$on('purchaseOptions/buyDevCard', () => {
      //TODO: Do the stuff for buying a dev card
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
      let rolling = this.rolling;
      let purchasing = this.purchasing;
      return (!rolling) && (!purchasing);
    },

    displayDice(){
      let rollPhase = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.phase == 'roll' ? true : false;
      if(rollPhase){
        this.rolling = true;
      }
      return rollPhase;
    },

    rollDice(){
      this.$root.socket.emit('game/rollDice', {game_id: this.$store.state.games.active_game.game_id});
      setTimeout(() => {
      this.rolling = false;
      this.displayActions();
      }, 2000);
    }
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
