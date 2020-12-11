<template>
        <div v-on:click='selectRoad' :class='playerOwner'>
        </div>  
</template>

<script lang="ts">
import Vue from 'vue';
console.log('bruh');

export default Vue.extend({
    props: {
        roadObject: Object
    },
    computed:{
      playerOwner: function(){
        var player = this.roadObject.road[1];
        switch(player) {
          case 0:
            return 'none';
            break;
          case 1:
            return 'red';
            break;
          case 2:
            return 'white';
            break;
          case 3:
            return 'blue';
            break;
          case 4:
            return 'orange';
            break;
        }
      }
    },
    created(){
       
    },
    methods: {
      selectRoad: function(){
        var turn = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn;

        var roadStartAndEnd = {
          start: this.roadObject.start,
          end: this.roadObject.end
        };

        if(turn.phase =="build" && turn.type =="normal"){
          console.log('road build attempt');
          this.$nuxt.$emit('road/buyRoad', roadStartAndEnd);
        }
        else if( turn.phase =="build" && turn.type =="init"){
          console.log('road placement attempt');
          this.$nuxt.$emit('road/placeRoad', roadStartAndEnd);
        }

      }
    }
})
</script>

<style scoped>
* {
  border-radius: 3px;
  position: absolute;
  width: 9px;
  height: 50px;
  z-index: 100;
  pointer-events: all;
}

.none {
  background-color: transparent;
}

.red {
  background-color: red;
}

.white{
  background-color: white;
}

.blue{
  background-color: blue;
}

.orange{
  background-color: orange;
}

.none:hover {
  background: lightgrey;
}

.tr {
  left: 65px;
  top: 43px;
  transform: rotate(30deg);
}

.tl {
  left: 65px;
  top: -8px;
  transform: rotate(150deg);
}

.l {
  left: 22px;
  top: -35px;
  transform: rotate(90deg);
}

.br {
  left: -25px;
  top: 43px;
  transform: rotate(150deg);
}

.bl {
  left: -25px;
  top: -10px;
  transform: rotate(30deg);
}

.r {
  left: 20px;
  top: 69px;
  transform: rotate(90deg);
}

</style>