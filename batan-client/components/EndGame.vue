<template>
  <div>
    <b-modal class='end-modal' v-model="gameIsWon">
        <div v-if='youWon'>
            You win!
        </div>
        <div v-else>
            You lose!
        </div>
        <b-button  @click.prevent="$store.dispatch('games/manualRmEndedGame', $store.state.games.active_game.game_id)" >
            Close game
        </b-button>
    </b-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed:{
      gameIsWon(){
          return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.winner != 0;
      },
      youWon(){
          return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.winner == this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.name;
      }

  },
  created() {
  },
  methods: {

  },

  mounted() {},

})
</script>
<style scoped>


</style>