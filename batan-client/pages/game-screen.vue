<template>
  <b-container fluid>
    <b-row>
      <b-col cols="8">
        <b-container fluid>
          <b-row class="row-1 no-gutters">
            <b-col cols="12">
              <GameBoard  />
            </b-col>
          </b-row>
          <b-row class="row-2 no-gutters">
            <b-col cols="8">
              <ResourceCards />
            </b-col>
            <b-col cols="4" @click="displayPurchase()" v-if="showActions">
              <PlayerActions/>
            </b-col>
            <b-col cols="4" @click="displayActions()" v-if="showDice">
              <Dice/>
            </b-col>
            <b-col cols="4" @click="displayDice()" v-if="showPurchase">
              <PurchaseOptions />
            </b-col>
          </b-row>
        </b-container>
      </b-col>
      <b-col>
        <b-container fluid>
          <b-row class="row-3 no-gutters">
            <b-col cols="12">
              <Chat />
            </b-col>
          </b-row>
          <b-row class="row-4 no-gutters">
            <b-col cols="12">
              <Scoreboard />
            </b-col>
          </b-row>
        </b-container>
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
.row-3 {
    min-height: 62vh;
    max-height: 62vh;
    overflow: hidden;
}
</style>
