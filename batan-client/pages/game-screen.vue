<template>
  <b-container fluid style="padding: 0; height: 90%">
    <b-row class="row-1">
      <b-col cols="8">
        <GameBoard />
      </b-col>
      <b-col>
        <Chat />
      </b-col>
    </b-row>
    <b-row class="row-2">
      <b-col cols="8">
        <GameControls />
      </b-col>
      <b-col>
        <GamePlayerStats />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "GameScreen",
});

</script>

<style scoped>

.row-1 {
  height: 80%
}

.row-2 {
}
</style>
