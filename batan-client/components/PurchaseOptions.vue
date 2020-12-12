<template>
  <div>
    <b-container fluid>
      <b-row class="text-center no-gutters" align-v="center">
        <b-col>
          <div v-on:click="buildRoad()" class="purchaseOption">
            <p>Road</p>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="buildSettlement()" class="purchaseOption">
            <p>Settlement</p>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="buildCity()" class="purchaseOption">
            <p>City</p>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="devCard()" class="purchaseOption">
            <small>Development Card</small>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="undoPurchase()" class="purchaseOption">
            <p>Undo</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      buildingRoad: false,
      buildingSettlement: false,
      buildingCity: false,
      roadToBuild: null,
      vertexToBuild: null,
    }
  },

  created() {
    this.$nuxt.$on('road/placeRoad', (roadStartAndEnd) => {
      if (this.buildingRoad) {
        this.roadToBuild = roadStartAndEnd
        if (this.vertexToBuild) {
          console.log('Successfully built road/settlement pair')
          this.$root.socket.emit('game/playInitPlacement', {
            game_id: this.$store.state.games.active_game.game_id,
            settlement: Number(this.vertexToBuild),
            road: {
              start: Number(this.roadToBuild.start),
              end: Number(this.roadToBuild.end),
            },
          })
          this.clear()
        } else {
          console.log(
            'Cant do that, theres no settlement to build along with it'
          )
        }
      } else {
        console.log('Cant do that, we arent in road building mode')
      }
    })

    this.$nuxt.$on('settlement/placeSettlement', (vertex) => {
      console.log('Zach is trying to build a settlement')
      if (this.buildingSettlement) {
        this.vertexToBuild = vertex
        if (this.roadToBuild) {
          console.log('Successfully built road/settlement pair')
          this.$root.socket.emit('game/playInitPlacement', {
            game_id: this.$store.state.games.active_game.game_id,
            settlement: Number(this.vertexToBuild),
            road: {
              start: Number(this.roadToBuild.start),
              end: Number(this.roadToBuild.end),
            },
          })
          this.clear()
        } else {
          console.log('Cant do that, theres no road to build along with it')
        }
      } else {
        console.log('Cant do that, we arent in settlement building mode')
      }
    })

    this.$nuxt.$on('settlement/buySettlement', (vertex) => {
      if (this.buildingSettlement) {
        this.vertexToBuild = vertex
        this.$root.socket.emit('game/buySettlement', {
          game_id: this.$store.state.games.active_game.game_id,
          location: Number(this.vertexToBuild),
        })
      }
      this.clear()
    })

    this.$nuxt.$on('road/buyRoad', (roadStartAndEnd) => {
      if (this.buildingRoad) {
        this.roadToBuild = roadStartAndEnd
        this.$root.socket.emit('game/buyRoad', {
          game_id: this.$store.state.games.active_game.game_id,
          start: Number(this.roadToBuild.start),
          end: Number(this.roadToBuild.end),
        })
      }
      this.clear()
    })

    this.$nuxt.$on('city/buyCity', (vertex) => {
      if (this.buildingCity) {
        this.vertexToBuild = vertex
        this.$root.socket.emit('game/buyCity', {
          game_id: this.$store.state.games.active_game.game_id,
          location: Number(this.vertexToBuild),
        })
      }
      this.clear()
    })
  },

  mounted() {},
  methods: {
    buildRoad(): void {
      this.buildingRoad = true
      this.buildingSettlement = false
      this.buildingCity = false
    },
    buildSettlement(): void {
      this.buildingRoad = false
      this.buildingSettlement = true
      this.buildingCity = false
    },
    buildCity(): void {
      this.buildingRoad = false
      this.buildingSettlement = false
      this.buildingCity = true
    },
    devCard(): void{
      this.clear()
      this.$nuxt.$emit('purchaseOptions/buyDevCard')
    },
    undoPurchase(): void{
      this.clear()
      this.$nuxt.$emit('purchaseOptions/undoPurchase')
    },
    clear(): void {
      this.buildingRoad = false
      this.buildingSettlement = false
      this.buildingCity = false
      this.roadToBuild = null
      this.vertexToBuild = null
    },
  },
})
</script>
<style>
.purchaseOption {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  height: 10vh;
  width: 5vw;
}

h1 {
  font-family: 'Space Grotesk', sans-serif;
}
</style>