<template>
        <li class = 'hex' :title='resourceValue' v-bind:class='[{"atmosphere": isAtmosphere}, {"spacer": isSpacer}]' v-on:click='placeRobber'>
          <div v-if="isTradingPost">
              <Spaceship :orientation='tradingPostOrientation' :trading-post='tradingPost'></Spaceship>
          </div>
          <div v-if="!isAtmosphere && !isSpacer">
            <Settlement class= "t" :settlement='tSettlement'></Settlement>
            <Settlement class= "tl" :settlement='tlSettlement'></Settlement>
            <div v-if="hexId == 2 || hexId == 6 || hexId == 11 || hexId == 15 || hexId == 18">
              <Settlement class= "tr" :settlement='trSettlement'></Settlement>
            </div>
            <div v-if="hexId == 7 || hexId == 12 || hexId == 16 || hexId == 17 || hexId == 18">
              <Settlement class= "bl" :settlement='blSettlement'></Settlement>
            </div>
            <div v-if="hexId == 11 || hexId == 15 || hexId == 18">
              <Settlement class= "br" :settlement='brSettlement'></Settlement>
            </div> 
            <div v-if="hexId == 16 || hexId == 17 || hexId == 18">
              <Settlement class= "b" :settlement='bSettlement'></Settlement>
            </div>

            <div v-if="hexObject != undefined && hexObject != null">
              <ResourceNumber :resource-value='hexObject.value' :has-robber='hexObject.hasRobber' :robber-phase='isRobberPhase'></ResourceNumber>
            </div>

            <Road class='tr' :road-object='trRoad'></Road>
            <Road class='tl' :road-object='tlRoad'></Road>
            <Road class ='l' :road-object='lRoad'></Road>
            <div v-if="hexId == 11 || hexId == 15 || hexId == 16 || hexId == 17 || hexId == 18">
              <Road class='br' :road-object='brRoad'></Road>
            </div>
            <div v-if="hexId == 7 || hexId == 12 || hexId == 16 || hexId == 17 || hexId == 18">
              <Road class ='bl' :road-object='blRoad'></Road>
            </div>
            <div v-if="hexId == 2 || hexId == 6 || hexId == 11 || hexId == 15 || hexId == 18">
              <Road class ='r' :road-object='rRoad'></Road>
            </div>
          </div>
        </li>  
</template>

<script>
import Vue from 'vue';
console.log('bruh');

export default Vue.extend({
  props: {
        hexObject: Object,
        hexId: Number,
        isTradingPost: {
          type: Boolean,
          default: false
        },
        tradingPostOrientation: {
          type: String,
          default: ''
        },
        tradingPost: {
          type: Object,
          default: null
        },
        isAtmosphere: {
          type: Boolean,
          default: false
        },
        isSpacer: {
          type: Boolean,
          default: false
        }
  },
  computed: {
    resourceValue: function() {
      if(this.hexObject == undefined || this.hexObject.value == null) return 'atmosphere';
      return this.hexObject.value;

    },
    isRobberPhase: function() {
        var phase = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.phase;
        return phase == 'robber';
    },
    trRoad: function(){
      var roadsMap = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.roadsMap;
      var vertexBegin = this.hexObject.vertices[0];
      var vertexEnd = this.hexObject.vertices[2];
      var temp = roadsMap.get(vertexBegin);
      var road;
      temp.forEach((edge) => {
        if(edge[0] == vertexEnd)
          road = edge;
      });

      var roadPackage= {
        road: road,
        start: vertexBegin,
        end: vertexEnd
      }
      
      return roadPackage;
    },
    tlRoad: function(){
      var roadsMap = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.roadsMap;
      var vertexBegin = this.hexObject.vertices[0];
      var vertexEnd = this.hexObject.vertices[1];
      var temp = roadsMap.get(vertexBegin);
      var road;
      temp.forEach((edge) => {
        if(edge[0] == vertexEnd)
          road = edge;
      });
      
      var roadPackage= {
        road: road,
        start: vertexBegin,
        end: vertexEnd
      }
      
      return roadPackage;
    },
    lRoad: function(){
      var roadsMap = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.roadsMap;
      var vertexBegin = this.hexObject.vertices[1];
      var vertexEnd = this.hexObject.vertices[3];
      var temp = roadsMap.get(vertexBegin);
      var road;
      temp.forEach((edge) => {
        if(edge[0] == vertexEnd)
          road = edge;
      });

      var roadPackage= {
        road: road,
        start: vertexBegin,
        end: vertexEnd
      }

      return roadPackage;
    },
    rRoad: function(){
      var roadsMap = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.roadsMap;
      var vertexBegin = this.hexObject.vertices[2];
      var vertexEnd = this.hexObject.vertices[4];
      var temp = roadsMap.get(vertexBegin);
      var road;
      temp.forEach((edge) => {
        if(edge[0] == vertexEnd)
          road = edge;
      });
      
      var roadPackage= {
        road: road,
        start: vertexBegin,
        end: vertexEnd
      }
      
      return roadPackage;
    },
    brRoad: function(){
      var roadsMap = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.roadsMap;
      var vertexBegin = this.hexObject.vertices[4];
      var vertexEnd = this.hexObject.vertices[5];
      var temp = roadsMap.get(vertexBegin);
      var road;
      temp.forEach((edge) => {
        if(edge[0] == vertexEnd)
          road = edge;
      });
      
      var roadPackage= {
        road: road,
        start: vertexBegin,
        end: vertexEnd
      }
      
      return roadPackage;
    },
    blRoad: function(){
      var roadsMap = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.roadsMap;
      var vertexBegin = this.hexObject.vertices[3];
      var vertexEnd = this.hexObject.vertices[5];
      var temp = roadsMap.get(vertexBegin);
      var road;
      temp.forEach((edge) => {
        if(edge[0] == vertexEnd)
          road = edge;
      });
      
      var roadPackage= {
        road: road,
        start: vertexBegin,
        end: vertexEnd
      }
      
      return roadPackage;
    },

    tSettlement: function(){
      var vertexList = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.vertexList;
      var vertex = vertexList[this.hexObject.vertices[0]];
      return vertex;
    },

    tlSettlement: function(){
      var vertexList = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.vertexList;
      var vertex = vertexList[this.hexObject.vertices[1]];
      return vertex;
    },

    trSettlement: function(){
      var vertexList = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.vertexList;
      var vertex = vertexList[this.hexObject.vertices[2]];
      return vertex;
    },

    blSettlement: function(){
      var vertexList = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.vertexList;
      var vertex = vertexList[this.hexObject.vertices[3]];
      return vertex;
    },

    brSettlement: function(){
      var vertexList = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.vertexList;
      var vertex = vertexList[this.hexObject.vertices[4]];
      return vertex;
    },

    bSettlement: function(){
      var vertexList = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board.vertexList;
      var vertex = vertexList[this.hexObject.vertices[5]];
      return vertex;
    },
    

  },
  created() {
  },
  methods: {
    assignHexID() {
      return this.hexObject;
    },
    placeRobber(){
      var turn = this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn;
      console.log("clicked hex");
      if(turn.phase == "robber" && turn.type == "normal") {
        console.log('robber placement attempt');
        this.$root.socket.emit("game/moveRobber", {
          game_id: this.$store.state.games.active_game.game_id,
          location: this.hexId
        });
      }
    }
      
  }
})
</script>

<style scoped>


.hex {
    position: relative;
    border-radius: 2px;
    background: #ccc;
    background-color: rgb(204, 204, 204);
    transform: rotate(-90deg);
    display: inline-block;
    transition: all 150ms ease-in-out;
    top: 0; bottom: 0; right: 0; left: 0;
    pointer-events: initial;
    z-index: 0;
}
.hex:before, .hex:after {
  position: absolute;
  width: inherit; height: inherit;
  border-radius: inherit;
  background: inherit;
  content: '';
  
}
.hex:hover {
  cursor: pointer;
}

.hex:before {
  transform: rotate(60deg);
}
.hex:after {
  transform: rotate(-60deg);
}

.brick {
  background: #ff8800;
}

.wood {
  background: #5eff00;
}

.sheep{
  background: #ff01f2;
}

.wheat{
  background: #ffe700;
}

.ore{
  background: #9b04ff;
}

.empty{
  background:white;
}

.spacer {
    background: transparent;
}

.atmosphere {
  background: #00ffea;
}

@media screen and (min-width: 0px){
  .hex {
    width: 20px;
    height: 20px;
  }
  .hex.left {
    margin-left: 20vw;
  }
}

@media screen and (min-width: 576px){
  .hex {
    width: 30px;
    height: 30px;
  }
}

@media screen and (min-width: 768px){
  .hex {
    width: 30px;
    height: 30px;
  }
}

@media screen and (min-width: 1000px){
  .hex {
    width: 40px;
    height: 68px;
    margin-top: 50px;
    margin-right: auto;
    margin-left: 40px;
  }

    .hex.left {
    margin-left: 5vw;
  }
}

@media screen and (min-width: 1500px){
  .hex {
    width: 50px;
    height: 85px;
    margin-top: 50px;
    margin-right: auto;
    margin-left: 50px;
  }

    .hex.left {
    margin-left: 15vw;
  }
}

</style>