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
    }
  },
  created() {
  },
  methods: {
    hello() {
      this.$root.gcSock.emit('hello', {
        hi: 'world'
      })
      // Couldn't get this to work, nuxt-socket-io docs may be outdated
      // await this.$store.dispatch(
      //   '$nuxtSocket/emit',
      //   {
      //     label: 'gcSock',
      //     evt: 'hello',
      //     msg: { hi: 'world' }
      //   }
      // )
    }
  }
})
</script>

<style lang="css" scoped>
</style>
