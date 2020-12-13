<template>
        <div>
            <b-row cols="7">
                <b-col>
                    <h2>Bank:</h2>
                </b-col>
                <b-col>
                    <Card type="Brick" :count='resources.brick' image-source='/brick.png' color='#ff8800'></Card>
                </b-col>
                <b-col>
                    <Card type="Lumber" :count='resources.wood' image-source='/tree.png' color='#5eff00'></Card>
                </b-col>
                <b-col>
                    <Card type="Sheep" :count='resources.sheep' image-source='/sheep.png' color='#ff01f2'></Card>
                </b-col>
                <b-col>
                    <Card type="Wheat" :count='resources.wheat' image-source='/wheat.png' color='#ffe700'></Card>
                </b-col>
                <b-col>
                    <Card type="Ore" :count='resources.ore' image-source='/ore.png' color='#9b04ff'></Card>
                </b-col>
                <b-col>
                    <Card type="Dev" :count='devCards' image-source='/batanLogo_noText.png' color='#ffffff'></Card>
                </b-col>
            </b-row>
        </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "Bank",
    computed: {
        devCards: function(){
            return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.bank.developmentCards;
        },
        resources: function(){
           return JSON.parse(this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.bank.resources);
        },
    }
});
</script>

<style scoped>
.row {
    border: 2px solid black;
    margin-top: 2px;
    margin-bottom: 2px;
}

h2 {
  text-align: center;
  font-family: 'Space Grotesk', sans-serif;
}
</style>