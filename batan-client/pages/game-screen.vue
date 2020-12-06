<template>
  <b-container fluid style="height: 90%">
    <b-row class="row-1">
      <b-col cols="8">
        <GameBoard />
      </b-col>
      <b-col cols="4">
        <Chat />
      </b-col>
    </b-row>
    <b-row class="row-2">
      <b-col cols="5">
        <ResourceCards />
      </b-col>
      <b-col cols="3" @click="displayPurchase()" v-if="showActions">
        <PlayerActions/>
      </b-col>
      <b-col cols="3" @click="displayActions()" v-if="showDice">
        <Dice/>
      </b-col>
      <b-col cols="3" @click="displayDice()" v-if="showPurchase">
        <h1>Purchase component goes here</h1>
      </b-col>
      <b-col cols="4">
        <GamePlayerStats />
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "GameScreen",
  data() {
    return {
      showDice: false,
      showActions: true,
      showPurchase: false,
    }
  },
  methods: {

    displayDice() {
      this.showDice = true;
      this.showActions = false;
      this.showPurchase = false;
    },

    displayActions() {
      setTimeout(() => {
      this.showDice = false;
      this.showActions = true;
      this.showPurchase = false;
      }, 4000);
    },

    displayPurchase() {
      this.showDice = false;
      this.showActions = false;
      this.showPurchase = true;
    },
  }
});

</script>

<style scoped>

.row-1 {
  height: 80%;
}
.row-2 {
  height: 20%;
}
</style>
