<template>
  <div>
    <b-container fluid style="margin-top: 10px">
      <b-row>
        <b-col>
          <div v-on:click="beginTrading" class="trade">
            <h3>Trade</h3>
            <img src="@/static/Trade.png" class="actionIcon">
          </div>
        </b-col>
        <b-col>
          <div v-on:click="beginPurchasing" class="purchase">
            <h3>Purchase</h3>
            <img src="@/static/Buy.png" class="actionIcon">
          </div>
        </b-col>
        <b-col>
          <div v-on:click="endTurn()" class="end">
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
    beginPurchasing(): void {
      console.log("purchasing a thing");
      this.purchasing = true;
      this.$nuxt.$emit('playerActions/purchase', this.purchasing);
    },

    endPurchasing(): void {
        this.purchasing = false;
    },

    beginTrading(): void {
      console.log("trading a thing");
      this.trading = true;
      this.$emit('trading');
    },

    endTrading(): void {
        this.trading = false;
    },

    endTurn(): void{
        console.log("ending turn");
        this.$root.socket.emit('game/endTurn', {game_id: this.$store.state.games.active_game.game_id});
    }
  },
})
</script>
<style scoped>
.trade {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-color: gray;
  background-color: black;
  margin: -12px;
  height: 15vh;
}

.purchase {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-color: gray;
  background-color: black;
  margin: -12px;
  height: 15vh;
}

.end {
  text-align: center;
  border-radius: 5px;
  border-style: solid;
  border-color: gray;
  background-color: black;
  margin: -12px;
  height: 15vh;
}

.actionIcon {
    width: 70%;
    height: 70%;
}

h3 {
  font-family: 'Space Grotesk', sans-serif;
  color: white;
}
</style>