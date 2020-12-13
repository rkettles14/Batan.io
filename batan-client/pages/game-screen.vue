<template>
  <b-container fluid>
    <b-row class="row-1 no-gutters">
      <b-col cols="8">
        <GameBoard  />
      </b-col>
      <b-col cols="4">
        <Chat />
      </b-col>
    </b-row>
    <b-row class="row-2 no-gutters">
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
        <PurchaseOptions />
      </b-col>
      <b-col cols="4">
        <Scoreboard />
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
      showDice: true,
      showActions: false,
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
  height: 20vh;
}
</style>
