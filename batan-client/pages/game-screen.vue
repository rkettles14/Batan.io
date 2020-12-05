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
      <b-col cols="3">
        <Dice/>
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
