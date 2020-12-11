<template>
    <b-container fluid>
        <div>
            <Bank></Bank>
        </div>
        <div>
            <h1>player for loop here</h1>
        </div>

    </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "GamePlayerStats",
    computed: {
        gameObject: function(){
           return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info;
        },
    }
});
</script>


<style scoped>

</style>
