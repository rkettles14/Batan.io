<template>
        <div v-if="diceRoll != 0">
            <span><b-icon :icon='"dice-"+value1'></b-icon></span><span style='padding-left: 5px;'></span><span><b-icon :icon='"dice-"+value2'></b-icon></span>
        </div>  
</template>

<script lang="js">
import Vue from 'vue';

export default Vue.extend({
    computed:{
      diceRoll: function(){
          return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.dice;
      },
      value1: function(){
          var diceValue =  this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.dice - Math.floor(Math.random() * 6) + 1;
          while(diceValue > 6){
              diceValue =  this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.dice - Math.floor(Math.random() * 6) + 1;
          }
          return diceValue;
      }, 
      value2: function(){
          return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.dice - this.value1;
      }
    },
    created(){

    }
})
</script>

<style scoped>
*{
    color: white;
    margin: 0;
    padding: 0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 32px;
}

.red {
    color: red;
    font-weight: bolder;
}

</style>