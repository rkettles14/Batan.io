<template>
  <div>
    <b-container fluid style='height: 100%; background-color: black; color: white;'>
        <div  v-on:click='rollDice()' class ='dice'>
        <span>Roll Dice! </span><br><b-icon icon="dice-6" ></b-icon> <b-icon icon="dice-6" ></b-icon>
        </div>
    </b-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

  created() {
  },

  mounted() {},
  methods: {
      rollDice() {
          console.log('rolling dice');
          // @ts-ignore explain for some reason this is bugged in nuxt
          this.$root.socket.emit('game/rollDice', {game_id: this.$store.state.games.active_game.game_id});
          this.$nuxt.$emit('dice/rollDice');
      }
  },
})
</script>
<style>
.dice {
  text-align: center;
  height: 20vh;
  width: 100%;
  font-size: 5em;
  font-family: 'Space Grotesk', sans-serif;
}

</style>