<template>
    <b-container class='board-background' fluid>
        <ol class ="odd" fluid>
            <Hex :is-spacer='true'></Hex>
        </ol>
        <ol class='even' fluid>
            <Hex :is-spacer='true' class='left'></Hex>
            <Hex :is-atmosphere='true'></Hex>
            <Hex :is-atmosphere='true'></Hex>
            <Hex :is-atmosphere='true'></Hex>
            <Hex :is-atmosphere='true'></Hex>
        </ol>
        <ol class ='odd'>
            <Hex :is-spacer='true' class='left'></Hex>
            <Hex :is-atmosphere='true'></Hex>
            <Hex :hex-id='0' :class='hexes[0].resourceType'></Hex>
            <Hex :hex-id='1' :class='hexes[1].resourceType'></Hex>
            <Hex :hex-id='2' :class='hexes[2].resourceType'></Hex>
            <Hex :is-atmosphere='true'></Hex>
        </ol>
        <ol class='even'>
            <Hex :is-atmosphere='true' class='left'></Hex>
            <Hex :hex-id='3' :class='hexes[3].resourceType'></Hex>
            <Hex :hex-id='4' :class='hexes[4].resourceType'></Hex>
            <Hex :hex-id='5' :class='hexes[5].resourceType'></Hex>
            <Hex :hex-id='6' :class='hexes[6].resourceType'></Hex>
            <Hex :is-atmosphere='true'></Hex>
        </ol>
        <ol class ='odd'>
            <Hex :is-atmosphere='true' class='left'></Hex>
            <Hex :hex-id='7' :class='hexes[7].resourceType'></Hex>
            <Hex :hex-id='8' :class='hexes[8].resourceType'></Hex>
            <Hex :hex-id='9' :class='hexes[9].resourceType'></Hex>
            <Hex :hex-id='10' :class='hexes[10].resourceType'></Hex>
            <Hex :hex-id='11' :class='hexes[11].resourceType'></Hex>
            <Hex :is-atmosphere='true'></Hex>
        </ol>
        <ol class ='even'>
            <Hex :is-atmosphere='true' class='left'></Hex>
            <Hex :hex-id='12' :class='hexes[12].resourceType'></Hex>
            <Hex :hex-id='13' :class='hexes[13].resourceType'></Hex>
            <Hex :hex-id='14' :class='hexes[14].resourceType'></Hex>
            <Hex :hex-id='15' :class='hexes[15].resourceType'></Hex>
            <Hex :is-atmosphere='true'></Hex>
        </ol>
        <ol class ='odd'>
            <Hex :is-spacer='true' class='left'></Hex>
            <Hex :is-atmosphere='true'></Hex>
            <Hex :hex-id='16' :class='hexes[16].resourceType'></Hex>
            <Hex :hex-id='17' :class='hexes[17].resourceType'></Hex>
            <Hex :hex-id='18' :class='hexes[18].resourceType'></Hex>
            <Hex :is-atmosphere='true'></Hex>
        </ol>
        <ol class='even'>
            <Hex :is-spacer='true' class='left'></Hex>
            <Hex :is-atmosphere='true'></Hex>
            <Hex :is-atmosphere='true'></Hex>
            <Hex :is-atmosphere='true'></Hex>
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
    props: {

    },
    data() {
        return {
            hexes: [] as any
        }
    },
    created() {
        this.$store.commit("chat/changeToChatRoom", this.$store.state.games.activeGame);
        
        var board = this.$store.state.games['game 1'];

        var oreHex = {
            resourceType: 'ore'
        }

        var woolHex = {
            resourceType: 'wool'
        }

        var grainHex = {
            resourceType: 'grain'
        }

        var lumberHex = {
            resourceType: 'lumber'
        }

        var brickHex = {
            resourceType: 'brick'
        }

        var emptyHex = {
            resourceType: 'empty'
        }

        this.hexes.push(woolHex);
        this.hexes.push(woolHex);
        this.hexes.push(woolHex);
        this.hexes.push(woolHex);

        this.hexes.push(grainHex);
        this.hexes.push(grainHex);
        this.hexes.push(grainHex);
        this.hexes.push(grainHex);

        this.hexes.push(lumberHex);
        this.hexes.push(lumberHex);
        this.hexes.push(lumberHex);
        this.hexes.push(lumberHex);

        this.hexes.push(oreHex);
        this.hexes.push(oreHex);
        this.hexes.push(oreHex);

        this.hexes.push(brickHex);
        this.hexes.push(brickHex);
        this.hexes.push(brickHex);

        this.hexes.push(emptyHex);




    }
})
</script>

<style scoped>

.board-background {
    margin: 0;
  background: black;
  height: 100%;
  width: 100%;
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

