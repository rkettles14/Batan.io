<template>
  <div>
    <b-container fluid style="margin-top: 10px">
      <b-row>
        <b-col>
          <div v-on:click="beginTrade" class="trade">
            <h3>Trade</h3>
            <img src="@/static/Trade.png" class="actionIcon">
          </div>
        </b-col>
        <b-col>
          <div v-on:click="beginPurchase" class="purchase">
            <h3>Purchase</h3>
            <img src="@/static/Buy.png" class="actionIcon">
          </div>
        </b-col>
        <b-col>
          <div v-on:click="endTurn" class="end">
            <h3>End Turn</h3>
            <img src="@/static/End.png" class="actionIcon">
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    //These can change, just placeholders for whatever is going to be ending
    //the trade/purchase state.
  props: {
    endPurchase: Boolean,
    endTrade: Boolean,
  },
  data() {
    return {
      trading: false,
      purchasing: false,
    }
  },
  mounted() {},
  methods: {
    beginPurchase(): void {
      console.log("purchasing a thing");
      this.purchasing = true;
      this.$emit('purchasing');
    },

    endPurchase(): void {
        this.purchasing = false;
    },

    beginTrade(): void {
      console.log("trading a thing");
      this.trading = true;
      this.$emit('trading');
    },

    endTrade(): void {
        this.purchasing = false;
    },

    endTurn(): void{
        console.log("ending turn");
        this.$emit('endTurn');
    }
  },
})
</script>
<style>
.trade {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  margin: -12px;
  height: 20vh;
}

.purchase {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  margin: -12px;
  height: 20vh;
}

.end {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  margin: -12px;
  height: 20vh;
}

.actionIcon {
    width: 75%;
    height: 75%;
}

h1 {
  font-family: 'Space Grotesk', sans-serif;
}
</style>