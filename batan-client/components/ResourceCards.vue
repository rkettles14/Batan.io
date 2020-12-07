<template>
  <div>
    <b-container fluid style="margin-top: 10px;">
      <b-row>
        <b-col>
          <div v-on:click="addResource(brick)" class="resourceCard" id="brickCell" :style="{background: brick.color}">
              <div class="count">{{brick.count}}</div>
              <h3>Brick</h3>
              </div>
        </b-col>
        <b-col>
          <div v-on:click="addResource(lumber)" class="resourceCard" id="lumberCell" :style="{background: lumber.color}">
              <div class="count">{{lumber.count}}</div>
              <h3>Lumber</h3>
              </div>
        </b-col>
        <b-col>
          <div v-on:click="addResource(wool)" class="resourceCard" id="woolCell" :style="{background: wool.color}">
              <div class="count">{{wool.count}}</div>
              <h3>Wool</h3>
              </div>
        </b-col>
        <b-col>
          <div v-on:click="addResource(grain)" class="resourceCard" id="grainCell" :style="{background: grain.color}">
              <div class="count">{{grain.count}}</div>
              <h3>Grain</h3>
              </div>
        </b-col>
        <b-col>
          <div v-on:click="addResource(ore)" class="resourceCard" id="oreCell" :style="{background: ore.color}">
              <div class="count">{{ore.count}}</div>
              <h3>Ore</h3>
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
      brick: new Card('Brick', 'red', 0),
      lumber: new Card('Lumber', 'brown', 0),
      wool: new Card('Wool', 'grey', 0),
      grain: new Card('Grain', 'yellow', 0),
      ore: new Card('Ore', 'purple', 0),
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
  border-color: black;
}

.count {
    border-style: solid;
    text-align: center;
    background: greenyellow;
    width: 32px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-left: 5px;
}

.resourceCard h3 {
    text-align: center;
}

h1 {
  font-family: 'Space Grotesk', sans-serif;
}
</style>