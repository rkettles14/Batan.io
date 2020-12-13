<template>
        <div :class="{'hidden': !visible}">
            <span><b-icon :icon='"dice-"+value1'></b-icon></span><span style='padding-left: 5px;'>{{diceRoll}}</span><span><b-icon :icon='"dice-"+value2'></b-icon></span>
        </div>  
</template>

<script lang="js">
import Vue from 'vue';

export default Vue.extend({
    computed:{
    
      diceRoll: function(){
          return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.dice[0];
      },
      value1: function(){
          //return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.dice[1];
          return 1;
      }, 
      value2: function(){
          //return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.dice[2];
          return 2;
      },
      visible: function(){
          return this.diceRoll != 0;
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

.hidden{
    visibility: hidden;
}

.red {
    color: red;
    font-weight: bolder;
}

</style>