<template>
  <div>
    <b-container fluid style="margin-top: 10px;">
      <b-row>
        <b-col>
          <div class="resourceCard" id="brickCell" :style="{background: brick.color}">
              <div class="count">{{this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.resources.brick}}</div>
              <img src='/brick.png'>
              </div>
        </b-col>
        <b-col>
          <div class="resourceCard" id="lumberCell" :style="{background: lumber.color}">
              <div class="count">{{this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.resources.wood}}</div>
              <img src='/tree.png'>
              </div>
        </b-col>
        <b-col>
          <div class="resourceCard" id="woolCell" :style="{background: wool.color}">
              <div class="count">{{this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.resources.sheep}}</div>
              <img src='/sheep.png'>
              </div>
        </b-col>
        <b-col>
          <div class="resourceCard" id="grainCell" :style="{background: grain.color}">
              <div class="count">{{this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.resources.wheat}}</div>
              <img src='/wheat.png'>
              </div>
        </b-col>
        <b-col>
          <div class="resourceCard" id="oreCell" :style="{background: ore.color}">
              <div class="count">{{this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.resources.ore}}</div>
              <img src='/ore.png'>
              </div>
        </b-col>
        <b-col>
          <div class="resourceCard" id="knight" :style="{background: '#ffffff'}">
              <div class="count">{{this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.developmentCards.knight}}</div>
              <img src='/army.png'>
              </div>
        </b-col>
        <b-col>
          <div class="resourceCard" id="roadBuilder" :style="{background: '#ffffff'}">
              <div class="count">{{this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.developmentCards.roadBuilder}}</div>
              <img src='/roadBuilder.png'>
              </div>
        </b-col>
        <b-col>
          <div class="resourceCard" id="yearOfPlenty" :style="{background: '#ffffff'}">
              <div class="count">{{this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.developmentCards.yearOfPlenty}}</div>
              <img src='/yearOfPlenty.png'>
              </div>
        </b-col>
        <b-col>
          <div class="resourceCard" id="monopoly" :style="{background: '#ffffff'}">
              <div class="count">{{this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.developmentCards.monopoly}}</div>
              <img src='/monopoly.png'>
              </div>
        </b-col>
        <b-col>
          <div class="resourceCard" id="victoryPoint" :style="{background: '#ffffff'}">
              <div class="count">{{this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.developmentCards.victoryPointCard}}</div>
              <img src='/victoryPoint.png'>
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
})
</script>
<style scoped>
.resourceCard {
  margin: -12px;
  height: 11vh;
  border-style: solid;
  border-color: gray;
  border-radius: 4px;
  padding: 3px;
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
    margin-bottom: 3px;
}

.resourceCard h3 {
    text-align: center;
}

.resourceCard img {
  height: 70%;
  display: block;
  margin: auto;
  max-width: 4vw;
}

h1 {
  font-family: 'Space Grotesk', sans-serif;
}
</style>