<template>
    <b-container class='board-background' fluid>
        <Timer></Timer>
        <RollDisplay></RollDisplay>
        <ol class='even' fluid>
            <Hex :is-spacer='true' class='left'></Hex>
            <Hex :is-atmosphere='true' :is-trading-post='true' trading-post-orientation='br' :trading-post='boardObject.vertexList[0]'></Hex>
            <Hex :is-atmosphere='true'></Hex>
            <Hex :is-atmosphere='true' :is-trading-post='true' trading-post-orientation='bl' :trading-post='boardObject.vertexList[1]'></Hex>
            <Hex :is-atmosphere='true'></Hex>''
        </ol>
        <ol class ='odd'>
            <Hex :is-spacer='true' class='left'></Hex>
            <Hex :is-atmosphere='true'></Hex>
            <Hex :hex-id='0' :hex-object='boardObject.hexList[0]' :class='assignHexClass(boardObject.hexList[0].resourceType)'></Hex>
            <Hex :hex-id='1' :hex-object='boardObject.hexList[1]' :class='assignHexClass(boardObject.hexList[1].resourceType)'></Hex>
            <Hex :hex-id='2' :hex-object='boardObject.hexList[2]' :class='assignHexClass(boardObject.hexList[2].resourceType)'></Hex>
            <Hex :is-atmosphere='true' :is-trading-post='true' trading-post-orientation='bl' :trading-post='boardObject.vertexList[10]'></Hex>
        </ol>
        <ol class='even'>
            <Hex :is-atmosphere='true' class='left' :is-trading-post='true' trading-post-orientation='r' :trading-post='boardObject.vertexList[11]'></Hex>
            <Hex :hex-id='3' :hex-object='boardObject.hexList[3]' :class='assignHexClass(boardObject.hexList[3].resourceType)'></Hex>
            <Hex :hex-id='4' :hex-object='boardObject.hexList[4]' :class='assignHexClass(boardObject.hexList[4].resourceType)'></Hex>
            <Hex :hex-id='5' :hex-object='boardObject.hexList[5]' :class='assignHexClass(boardObject.hexList[5].resourceType)'></Hex>
            <Hex :hex-id='6' :hex-object='boardObject.hexList[6]' :class='assignHexClass(boardObject.hexList[6].resourceType)'></Hex>
            <Hex :is-atmosphere='true'></Hex>
        </ol>
        <ol class ='odd'>
            <Hex :is-atmosphere='true' class='left'></Hex>
            <Hex :hex-id='7' :hex-object='boardObject.hexList[7]' :class='assignHexClass(boardObject.hexList[7].resourceType)'></Hex>
            <Hex :hex-id='8' :hex-object='boardObject.hexList[8]' :class='assignHexClass(boardObject.hexList[8].resourceType)'></Hex>
            <Hex :hex-id='9' :hex-object='boardObject.hexList[9]' :class='assignHexClass(boardObject.hexList[9].resourceType)'></Hex>
            <Hex :hex-id='10' :hex-object='boardObject.hexList[10]' :class='assignHexClass(boardObject.hexList[10].resourceType)'></Hex>
            <Hex :hex-id='11' :hex-object='boardObject.hexList[11]' :class='assignHexClass(boardObject.hexList[11].resourceType)'></Hex>
            <Hex :is-atmosphere='true' :is-trading-post='true' trading-post-orientation='l' :trading-post='boardObject.vertexList[26]'></Hex>
        </ol>
        <ol class ='even'>
            <Hex :is-atmosphere='true' class='left' :is-trading-post='true' trading-post-orientation='r' :trading-post='boardObject.vertexList[33]'></Hex>
            <Hex :hex-id='12' :hex-object='boardObject.hexList[12]' :class='assignHexClass(boardObject.hexList[12].resourceType)'></Hex>
            <Hex :hex-id='13' :hex-object='boardObject.hexList[13]' :class='assignHexClass(boardObject.hexList[13].resourceType)'></Hex>
            <Hex :hex-id='14' :hex-object='boardObject.hexList[14]' :class='assignHexClass(boardObject.hexList[14].resourceType)'></Hex>
            <Hex :hex-id='15' :hex-object='boardObject.hexList[15]' :class='assignHexClass(boardObject.hexList[15].resourceType)'></Hex>
            <Hex :is-atmosphere='true'></Hex>
        </ol>
        <ol class ='odd'>
            <Hex :is-spacer='true' class='left'></Hex>
            <Hex :is-atmosphere='true'></Hex>
            <Hex :hex-id='16' :hex-object='boardObject.hexList[16]' :class='assignHexClass(boardObject.hexList[16].resourceType)'></Hex>
            <Hex :hex-id='17' :hex-object='boardObject.hexList[17]' :class='assignHexClass(boardObject.hexList[17].resourceType)'></Hex>
            <Hex :hex-id='18' :hex-object='boardObject.hexList[18]' :class='assignHexClass(boardObject.hexList[18].resourceType)'></Hex>
            <Hex :is-atmosphere='true' :is-trading-post='true' trading-post-orientation='tl' :trading-post='boardObject.vertexList[42]'></Hex>
        </ol>
        <ol class='even'>
            <Hex :is-spacer='true' class='left'></Hex>
            <Hex :is-atmosphere='true' :is-trading-post='true' trading-post-orientation='tr' :trading-post='boardObject.vertexList[47]'></Hex>
            <Hex :is-atmosphere='true'></Hex>
            <Hex :is-atmosphere='true' :is-trading-post='true' trading-post-orientation='tl' :trading-post='boardObject.vertexList[49]'></Hex>
            <Hex :is-atmosphere='true'></Hex>
        </ol>

    </b-container>    
</template>

<script lang="ts">
import Vue from 'vue'

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

enum resourceType {
  none,
  sheep,
  wheat,
  wood,
  ore,
  brick,
}

enum developmentType {
  knight,
  monopoly,
  roadBuilder,
  victoryPointCard,
  yearOfPlenty,
}

enum harborType {
  none, 
  threeForOne,
  sheep,
  wheat,
  wood,
  ore,
  brick,
}

export default Vue.extend({

    name: "GameBoard",
    data() {
        return {
            hexes: [] as any
        }
    },
    computed: {
        boardObject: function(){
           return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.board;
        },

        firstPort: function(){

        },
        secondPort: function(){

        }
    },
    created() {
        this.$store.commit("chat/changeToChatRoom", this.$store.state.games.activeGame);
    },
    methods: {
        assignHex(id: number) {
                return 0;
        },
        assignHexClass(resourceType: number){
            switch(resourceType) {
                case 0:
                    return 'empty';
                    break;
                case 1:
                    return 'sheep';
                    break;
                case 2:
                    return 'wheat';
                    break;
                case 3:
                    return 'wood';
                    break;
                case 4:
                    return 'ore';
                    break;
                case 5:
                    return 'brick';
                    break;

            }
        }
    }
})
</script>

<style scoped>

.board-background {
    margin: 0;
  
  height: 100%;
  width: 100%;
  padding-bottom: 5rem;
  background-size: cover;
  background-image: url('https://images.wallpaperscraft.com/image/stars_galaxy_milky_way_starry_sky_night_sky_119125_3840x2160.jpg');
}

ol.even {
  position: relative;
  left: 50px;
  margin-bottom: -50px;
  z-index: 2;
  pointer-events: none;
}
ol.odd {
  position: relative;
  margin: auto; 
  margin-bottom: -50px;
  z-index: 2;
  pointer-events: none;
}
</style>

