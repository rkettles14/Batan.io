<template>
    <b-container fluid>
        <h2>Join Game</h2>
        <b-form @submit.prevent="join">
            <div class="form-element">
                <label>Game Code:</label>
                <b-form-input
                    class="input"
                    v-model="code"
                    type="text"
                    autocomplete="off"
                    placeholder="Enter Game Code Here"
                />
            </div>
            <div class="form-element">
                <b-button
                    type="submit"
                    class="success"
                >
                <b-overlay :show="showOverlay" variant="success">
                    Join Game
                </b-overlay>
                </b-button>
            </div>
        </b-form>
        <div v-show="Object.values($store.state.games.available_games).filter(game => game.joined).length > 0">
            <hr>
            <br>
            <h2>Current Games</h2>
            <ul class="list-container">
                <li
                v-for="game in Object.values($store.state.games.available_games).filter(game => game.joined)"
                :key="game.game_id"
                class="card-item">
                    <div class="card-sub-item">
                        <h3 class="left">{{game.game_name}}</h3>
                        <h3 class="center">Players {{game.num_players}}/5</h3>
                        <!--todo only display the goto button if the game has been started-->
                        <b-button class="success" @click.prevent="goto(game)">Goto Game</b-button>
                    </div>
                    <!--todo show who's the game host-->
                    <!--todo show all of the players that have joined this particular game-->
                </li>
            </ul>

        </div>
    </b-container>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    name: "JoinGame",    
    data() {
        return {
            code: "",
            showOverlay: false,
        }
    },

    methods: {
        join() {
            if(this.$data.code === "") {
                //do nothing
                return;
            }
            this.$root.socket.emit("game/joinGame", {game_id: this.$data.code});
            this.$root.socket.on("game/joined", (game) => {
                window.$nuxt.$router.push("/game-screen");
            });
        },
        goto(game) {
            this.$store.commit('game/changeGame', game);
            this.$store.commit('chat/changeToChatRoom', "" + game.game_id)
            window.$nuxt.$router.push("/game-screen");
        }
    }
});
</script>

<style scoped>

h2 {
    color: white;
}

h3 {
    color: white;
}

label {
    color: white;
}

.form-element {
    margin: 2%;
}

.list-container {
    list-style-type: none;
}

.card-item {
    border: gray 1px solid;
    border-radius: 5px;
    margin: 5px;
    padding: 1.5rem;
    display: flex;
    background-color: black;

}

.card-sub-item {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: left;
}

.left {
    flex-grow: 1
}

.center {
    margin-right: 1rem;
}

.success {
    background-color: #00ffea;
    color: black;
}

.input {
    background-color: black;
    color: white;
}
</style>