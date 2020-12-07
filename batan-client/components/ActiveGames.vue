<template>
    <b-container fluid>
        <h2>Active Games</h2>
        <ul class="list-container">
            <li
            class="list-item"
            >
            <h3 class="left">Game Name</h3>
            </li>
            <li
            class="list-item"
            v-for="game in Object.values($store.state.games.available_games)"
            v-bind:key="game.game_id"
            >
            <h3 class="left">{{game.game_name}}</h3>
            <h3 class="center">{{game.num_players}}/5 Players</h3>
            <b-button variant="success" @click.prevent="join(game.game_id)">Join</b-button>
            </li>
        </ul>
    </b-container>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    name: "ActiveGames",
    methods: {
        join(game_id) {
            this.$root.socket.emit("game/joinGame", {game_id: game_id});
        }
    }
});
</script>

<style scoped>
.list-container {
    border: black 1px solid;
    border-radius: 5px;
}

.list-item {
    display: flex;
    flex-direction: row;
    padding: 5px;
    border-top: black solid 1px;
    border-bottom: black solid 1px;
}


.left {
    flex-grow: 1;
}

.center {
    margin: 0 5px;
}

</style>
