<!-- For testing sockets & APIs only.. delete before production -->

<template lang="html">
<div class="">
  <b-button @click.prevent="newGame('game name here')" size="md" variant="dark">New game</b-button>
  <b-button @click.prevent="joinGame(0)" size="md" variant="dark">Join game</b-button>
  <b-button @click.prevent="startGame(0)" size="md" variant="dark">Start game</b-button>
  <br>  <br>
  <b-button @click.prevent="endTurn(0)" size="md" variant="dark">end turn</b-button>
  <b-button @click.prevent="placeStuff(0)" size="md" variant="dark">place</b-button>
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
    }
  },
  created() {
  },
  methods: {
    placeStuff(game_id) {
      this.$root.socket.emit('game/playInitPlacement', {
        game_id: game_id,
        settlement: 0,
        road: {
          start: 0,
          end: 1
        }
      })
    },
    endTurn(game_id) {
      this.$root.socket.emit('game/endTurn', {game_id: game_id})
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
