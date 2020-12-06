<template>
  <div>
    <b-container fluid style="margin-top: 10px">
      <b-row>
        <b-col>
          <div v-on:click="buildRoad" class="road">
            <p>Road</p>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="buildSettlement" class="settlement">
            <p>Settlement</p>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="buildCity" class="city">
            <p>City</p>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="devCard" class="card">
            <p>Development Card</p>
          </div>
        </b-col>
        <b-col>
          <div v-on:click="undoPurchase" class="undo">
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
      buildRoad: false,
      buildSettlement: false,
      buildCity: false,
      devCard: false,
    }
  },
  mounted() {},
  methods: {
    buildRoad(): void {
      console.log("Building a road");
      this.buildRoad = true;
      this.$emit('buildRoad');
    },

    buildSettlement(): void {
      console.log("Building a settlement");
      this.buildSettlement = true;
      this.$emit('buildSettlement');
    },

    buildCity(): void {
      console.log("Building a city");
      this.buildCity = true;
      this.$emit('buildCity');
    },

    devCard(): void {
      console.log("Getting more dev cards");
      this.devCard = true;
      this.$emit('purchaseDevCard');
    },

    undo(): void{
        console.log("Undoing purchase");
        this.$emit('undoPurchase');
    }
  },
})
</script>
<style>
.road {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  height: 10vh;
  width: 6vw;
  margin-right: -30px;
}

.settlement {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  height: 10vh;
  width: 6vw;
  margin-right: -30px;
}

.city {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  height: 10vh;
  width: 6vw;
  margin-right: -30px;
}

.card {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  height: 10vh;
  width: 6vw;
  margin-right: -30px;
}

.undo {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  height: 10vh;
  width: 6vw;
  margin-right: -30px;
}

h1 {
  font-family: 'Space Grotesk', sans-serif;
}
</style>