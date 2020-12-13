<template>
  <div>
    <b-container fluid style="margin-top: 10px;">
      <b-row>
        <b-col>
          <div v-on:click="addResource(brick)" class="resourceCard" id="brickCell" :style="{background: brick.color}">
              <div class="count">{{brick.count}}</div>
              <h3>Brick</h3>
              <img src='/brick.png'>
              </div>
        </b-col>
        <b-col>
          <div v-on:click="addResource(lumber)" class="resourceCard" id="lumberCell" :style="{background: lumber.color}">
              <div class="count">{{lumber.count}}</div>
              <h3>Lumber</h3>
              <img src='/tree.png'>
              </div>
        </b-col>
        <b-col>
          <div v-on:click="addResource(wool)" class="resourceCard" id="woolCell" :style="{background: wool.color}">
              <div class="count">{{wool.count}}</div>
              <h3>Wool</h3>
              <img src='/sheep.png'>
              </div>
        </b-col>
        <b-col>
          <div v-on:click="addResource(grain)" class="resourceCard" id="grainCell" :style="{background: grain.color}">
              <div class="count">{{grain.count}}</div>
              <h3>Grain</h3>
              <img src='/wheat.png'>
              </div>
        </b-col>
        <b-col>
          <div v-on:click="addResource(ore)" class="resourceCard" id="oreCell" :style="{background: ore.color}">
              <div class="count">{{ore.count}}</div>
              <h3>Ore</h3>
              <img src='/ore.png'>
              </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

class Card {
  count: number
  color: string
  type: string
  constructor(
    type: string,
    color: string,
    count: number
  ) {
    this.type = type
    this.color = color
    this.count = count
  }
}

export default Vue.extend({
  data() {
    return {
      brick: new Card('Brick', '#ff8800', 0),
      lumber: new Card('Lumber', '#5eff00', 0),
      wool: new Card('Wool', '#ff01f2', 0),
      grain: new Card('Grain', '#ffe700', 0),
      ore: new Card('Ore', '#9b04ff', 0),
    }
  },
  mounted() {
  },
  methods: {
      addResource(resource: Card): void{
          resource.count += 1;
      }
  },
})
</script>
<style>
.resourceCard {
  margin: -12px;
  height: 20vh;
  border-style: solid;
  border-color: gray;
  border-radius: 4px;
}

.count {
    border-style: solid;
    text-align: center;
    background: greenyellow;
    width: 32px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-left: 5px;
    margin-top: 1px;
}

.resourceCard h3 {
    text-align: center;
}

.resourceCard img {
  height: 13vh;
  display: block;
  margin: auto;
}

h1 {
  font-family: 'Space Grotesk', sans-serif;
}
</style>