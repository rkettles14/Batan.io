<template>
  <div>
    <b-container fluid>
      <b-row class="text-center no-gutters" align-v="center">
        <b-col>
          <div v-on:click="buildRoad" class="purchaseOption">
            <p>Road</p>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="buildSettlement" class="purchaseOption">
            <p>Settlement</p>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="buildCity" class="purchaseOption">
            <p>City</p>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="devCard" class="purchaseOption">
            <small>Development Card</small>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="undoPurchase" class="purchaseOption">
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
      buyingDevCard: false,
    }
  },
  mounted() {},
  methods: {
    buildRoad(): void {
      console.log('Building a road')
      this.buildRoad = true
      this.$emit('buildRoad')
    },

    buildSettlement(): void {
      console.log('Building a settlement')
      this.buildSettlement = true
      this.$emit('buildSettlement')
    },

    buildCity(): void {
      console.log('Building a city')
      this.buildCity = true
      this.$emit('buildCity')
    },

    devCard(): void {
      console.log('Getting more dev cards')
      this.devCard = true
      this.$emit('purchaseDevCard')
    },

    undoPurchase(): void {
      console.log('Undoing purchase')
      this.$emit('undoPurchase')
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