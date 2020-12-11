<template>
        <div>
            <b-col cols="5">
                <ResourceCards />
            </b-col>
        </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "Bank",
    computed: {
        bank: function(){
           return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.bank;
        },
    }
});
</script>
