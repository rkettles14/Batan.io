<template>
        <div v-on:click='selectSettlement' :class='[settlementOwner, settlementStatus]'>
        </div>  
</template>

<script lang="js">
import Vue from 'vue';

enum vertexStatus {
  open,
  settlement,
  city,
  blocked,
}

enum player {
  none,
  red,
  white,
  blue,
  orange,
}

export default Vue.extend({
    props: {
        settlement: Object
    },
    methods: {
        selectSettlement: function(){
          var vertex = this.settlement.id;

          var turn = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn;

          if(turn.phase == "build" && turn.type == "normal"){
            console.log('settlment build attempt');
            this.$nuxt.$emit('settlement/buySettlement', vertex);
          }
          else if(turn.phase =="build" && turn.type == "init"){
            console.log('settlment place attempt');
            this.$nuxt.$emit('settlment/placeSettlement', vertex);
          }
          else if(turn.phase =="build" && turn.type == "normal" && this.settlement.status == vertexStatus.city)
          {
            console.log('city build attempt');
            this.$nuxt.$emit('settlment/buyCity', vertex);
          }

        }
    },
    computed: {
      settlementOwner: function(){
        var owner = this.settlement.owner;
        switch(owner){
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
      },
      settlementStatus: function(){
        var status = this.settlement.status;
        switch(status){
          case 0:
            return '';
            break;
          case 1:
            return '';
            break;
          case 2:
            return 'city';
            break;
          case 3:
            return 'blocked';
            break;
        }
      }

    }
})
</script>

<style scoped>
* {
  border-radius: 3px;
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 150;
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

.blocked{
  background-color: transparent;
}

.blocked:hover{
  background-color: transparent;
  border: 0px;
}

.city{
  border: 2px solid gold;
  transform: rotate(45deg);
}

.none:hover {
  background: #0000ff;
  border: 2px dashed white;
}

.blocked:hover{
  background: #ff0000;
  border: 2px dashed white;
}

.t {
  left: 70px;
  top: 30px;
}

.tr {
  left: 40px;
  top: 80px;
}

.tl {
  left: 40px;
  top: -25px;
}

.br {
  left: -20px;
  top: 80px;
}

.bl {
  left: -20px;
  top: -25px;
}

.b {
  left: -45px;
  top: 28px;
}

</style>