<!-- For testing sockets & APIs only.. delete before production -->

<template lang="html">
<div class="">
  <b-button @click.prevent="newGame('game name here')" size="md" variant="dark">New game</b-button>
  <b-button @click.prevent="joinGame(0)" size="md" variant="dark">Join game</b-button>
  <b-button @click.prevent="" size="md" variant="dark">Delete game</b-button>
  <br>  <br>
  <b-button @click.prevent="hello()" size="md" variant="dark">game/move</b-button>
  <b-button @click.prevent="" size="md" variant="dark">game/trade_outgoing</b-button>
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
    hello() {
      this.$root.socket.emit('hello', {
        hi: 'world'
      })
    },
    newGame(game_name) {
      this.$root.socket.emit('game/newGame', {game_name: game_name});
    },
    joinGame(game_id) {
      this.$root.socket.emit('game/joinGame', {game_id: game_id});
    }
  }
})
</script>

<style lang="css" scoped>
</style>
