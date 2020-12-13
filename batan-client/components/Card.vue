<template>
    <div class="card" :style="{background: color}">
        <div class="count">{{count}}</div>
        <img :src="imageSource">
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        type: String,
        imageSource: String,
        count: Number,
        color: String
    },
});
</script>

<style scoped>

.card {
  margin-top: 2px;
  margin-left: -12px;
  height: 8vh;
  width: 3vw;
  border-style: solid;
  border-color: black;
}

.card img {
  height: 5vh;
  display: block;
  margin: auto;
  max-width: 3vw;
}

.count {
    border-style: solid;
    border-width: 1px;
    text-align: center;
    background: greenyellow;
    width: 32px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-left: 5px;
}
</style>