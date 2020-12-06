<!-- For testing sockets & APIs only.. delete before production -->

<template lang="html">
<div class="">
  <b-button @click.prevent="newGame('game name here')" size="md" variant="dark">New game</b-button>
  <b-button @click.prevent="joinGame(0)" size="md" variant="dark">Join game</b-button>
  <b-button @click.prevent="startGame(0)" size="md" variant="dark">Start game</b-button>
  <br>  <br>

  <b-row>
    <b-col sm="3">
      <label>settlemnet vertex</label>
    </b-col>
    <b-col sm="9">
      <b-form-input :type="number" v-model="settlementVertex"></b-form-input>
    </b-col>
  </b-row>
  <b-row>
    <b-col sm="3">
      <label>road start vert</label>
    </b-col>
    <b-col sm="3">
      <b-form-input :type="number" v-model="roadStartVert"></b-form-input>
    </b-col>
    <b-col sm="3">
      <label>road end vert</label>
    </b-col>
    <b-col sm="3">
      <b-form-input :type="number" v-model="roadEndVert"></b-form-input>
    </b-col>
  </b-row>
  <b-button @click.prevent="placeStuff(0)" size="md" variant="dark">place</b-button>
  <br>  <br>
  <b-button @click.prevent="rollDice(0)" size="md" variant="dark">roll dice</b-button>
  <br>  <br>
  <b-button @click.prevent="endTurn(0)" size="md" variant="dark">end turn</b-button>
  <br>  <br>
  <p>game/board</p>
  <p>game/player</p>
  <p>game/score</p>
  <p>game/over</p>
  <p>game/error</p>
  <p>game/trade_incoming</p>
  <p>game/board</p>
  <p>game/board</p>
  <p>game/board</p>
  <p>game/board</p>
</div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "TestSockets",
  data() {
    return {
      settlementVertex: 0,
      roadStartVert: 0,
      roadEndVert: 1
    }
  },
  created() {
  },
  methods: {
    rollDice(game_id) {
      this.$root.socket.emit('game/rollDice', {game_id: game_id});
    },
    placeStuff(game_id) {
      this.$root.socket.emit('game/playInitPlacement', {
        game_id: game_id,
        settlement: Number(this.settlementVertex),
        road: {
          start: Number(this.roadStartVert),
          end: Number(this.roadEndVert)
        }
      })
    },
    endTurn(game_id) {
      this.$root.socket.emit('game/endTurn', {game_id: game_id});
    },
    newGame(game_name) {
      this.$root.socket.emit('game/newGame', {game_name: game_name});
    },
    joinGame(game_id) {
      this.$root.socket.emit('game/joinGame', {game_id: game_id});
    },
    startGame(game_id) {
      this.$root.socket.emit('game/startGame', {game_id: game_id});
    }
  }
})
</script>

<style lang="css" scoped>
</style>
