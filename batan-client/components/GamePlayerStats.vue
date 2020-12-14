<template>
        <div>
            <b-row v-for="player in score" v-bind:key="player.name" cols="4" :style="{background: getColor(player.name), opacity: getOpacity(player.name, turnOwner), border: getBorder(player.name, turnOwner)}">
                <b-col class="col-md-5">
                    <h2 v-bind:class="{player2: player.name == 2}">{{player.nick.name + getGameOwner(player.name, gameOwner) + getCurrentPlayer(player.nick.name, currentPlayer)}}</h2>
                </b-col>
                <b-col class="col-md-2">
                    <img src="/victoryPoint.png">
                    <h3 v-bind:class="{player2: player.name == 2}">{{player.victoryPoints}}</h3>
                </b-col>
                <b-col class="col-md-2">
                    <img src="/army.png">
                    <h3 v-bind:class="{player2: player.name == 2}">{{player.armies}}</h3>
                </b-col>
                <b-col class="col-md-3">
                    <img src="/road.png">
                    <h3 v-bind:class="{player2: player.name == 2}">{{player.longestRoad}}</h3>
                </b-col>
            </b-row>
        </div>
</template>

<script lang="ts">
import Vue from 'vue'

export enum player {
  none,
  red,
  white,
  blue,
  orange,
}

export default Vue.extend({
    name: "GamePlayerStats",
    computed: {
        score: function(){
            return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.score;
        },
        turnOwner: function() {
            return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.player;
        },
        gameOwner: function() {
            return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].owner;
        },
        currentPlayer: function() {
            return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].player_info.nick.name;
        }
    },
    methods: {
        getColor(playerNumber: player){
            return player[playerNumber];
        },
        getOpacity(playerNumber: player, turn: player){
            if(playerNumber === turn){
                return "1";
            } else {
                return "0.6";
            }
        },
        getBorder(playerNumber: player, turn: player){
            if(playerNumber === turn){
                return "3px solid #00ffea";
            } else {
                return "2px solid gray";
            }
        },
        getGameOwner(playerNumber: string, ownerNumber: string){
            if(playerNumber === ownerNumber) {
                return " (owner)";
            } else {
                return "";
            }
        },
        getCurrentPlayer(playerName: string, currentPlayer: string){
            if(playerName === currentPlayer) {
                return " (you)";
            } else {
                return "";
            }
        }
    }
});
</script>

<style scoped>
.row {
    margin-top: 2px;
    margin-bottom: 2px;
    border-radius: 4px;
}

h2 {
    font-size: 1.8vh;
    color: white;
}

.player2 {
    color: black;
}

h3 {
    color: white;
}

img {
  height: 3vh;
  display: block;
  margin: auto;
  max-width: 3vw;
  float: left;

}
</style>