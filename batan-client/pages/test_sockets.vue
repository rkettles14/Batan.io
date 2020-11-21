<!-- For testing sockets & APIs only.. delete before production -->

<template lang="html">
<div class="">
  <b-button @click.prevent="" size="md" variant="dark">New game</b-button>
  <b-button @click.prevent="" size="md" variant="dark">Join game</b-button>
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
      socket: null
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: 'game'
    });
    this.socket.on('connect', () => {
        this.socket
        .emit('authenticate', { token: this.$auth.getToken('auth0').split(' ')[1] })
        .on('authenticated', () => {
          // post-authenticate w/ websocket
        })
        .on('unauthorized', (msg) => {
          console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
          throw new Error(msg.data.type);
        })
    });
  },
  methods: {
    hello() {
      console.log('emitting socket event')
      this.socket.emit('hello', {
        hi: 'world'
      })
    }
  }
})
</script>

<style lang="css" scoped>
</style>
