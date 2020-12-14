<template>
    <b-container fluid>
        <h2>Create Game</h2>
        <b-form @submit.prevent="send">
            <div class="form-element">
                <label>Game Name:</label>
                <b-form-input
                    v-model="name"
                    class = "new-game"
                    type="text"
                    placeholder="Enter Game Name Here"
                    autocomplete="off"
                />
            </div>

            <div class="form-element">
                    <b-button
                        type="submit"
                        class="success"
                    >
                    <b-overlay :show=showOverlay variant="success">
                        Create Game
                    </b-overlay>
                </b-button>
            </div>

        </b-form>
        <div v-show="Object.values($store.state.games.available_games).filter(game => game.owner).length !== 0
                    || Object.values($store.state.games.active_games).filter(game => game.owner === game.player_info.name && game.status === 'active').length !== 0">
            <hr>
            <br>
            <h2>Games Pending Start</h2>
            <ul class="list-container">
                <!--todo make reactive to all the games that the player
                    has created but not started-->
                <li
                v-for="game in Object.values($store.state.games.available_games).filter(game => game.owner)"
                :key="game.game_id"
                class="card-li"
                >
                    <div class="card-sub-item">
                        <h3 class="left">{{game.game_name}}</h3>
                        <h3 class="center">Players {{game.num_players}}/4</h3>
                        <!--todo hide this button if the game has been started-->
                        <b-button
                            class="success"
                            @click.prevent="start(game)"
                        >
                        Start Game 
                        </b-button>
                    </div>
                    <div>
                        <ul class="list-container">
                            <li
                            class="card-player"
                            v-for="player in game.nicks"
                            :key="player.alias">
                            <h3>{{player.name}} is in the game</h3>
                            <b-button
                                v-show="player.name !== $auth.user.nickname"
                                variant="danger"
                                @click.prevent="bootem(game.game_id, player.alias)"
                            >
                                Boot 'em
                            </b-button>
                            </li>
                        </ul>
                    </div>
                </li>
                <li
                    v-for="game in Object.values($store.state.games.active_games).filter(game => game.owner === game.player_info.name && game.status === 'active')"
                    :key="game.game_id"
                    class="card-li"
                >
                    <div class="card-sub-item">
                        <h3 class="left">{{game.game_name}} is currently running</h3>
                        <h3 class="center">Players {{game.game_info.score.length}}/4</h3>

                        <b-button
                            class="success"
                            @click.prevent="goto(game)"
                        >
                        goto Game
                        </b-button>
                        
                    </div>
                </li>
            </ul>
        </div>

    </b-container>    
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    name: "CreateNewGame",
    data() {
        return {
            name: "",
            showOverlay: false,
            numPlayers: 2,
            description: "",
        };
    },

    methods: {
        send() {
            if(this.$data.name === ""){
                //Do nothing
                console.log("If you're doing this intentionally, STOP IT!");
                return; 
            }

            this.$root.socket.emit("game/newGame", {game_name: this.$data.name});
            this.$data.showOverlay = true;
            this.$root.socket.on("game/created", (game) => {
                this.$store.commit("chat/createChatRoom", game.game_id)
                this.$data.showOverlay = false;
            });
            this.$data.name = "";
        },

        start(game) {
            this.$root.socket.emit('game/startGame', game);
        },

        goto(game) {
            this.$store.commit('games/changeGame', game);
            this.$store.commit("chat/createChatRoom", this.$store.state.games.active_game.game_id);
            this.$store.commit("chat/changeToChatRoom", this.$store.state.games.active_game.game_id);
            window.$nuxt.$router.push("/game-screen");
        },
        bootem(game_id, bootee){
            this.$root.socket.emit('game/admin/boot', {
                game_id: game_id,
                bootee: bootee
            });
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

.card-li {
    border: gray 1px solid;
    border-radius: 5px;
    margin: 5px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    background-color: black;
}

.left {
    flex-grow: 1;
}

.center {
    margin: 0 10px;
}

.card-sub-item {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    justify-content: left;
}

.card-player {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    border: solid slategrey 1px;
    border-radius: 1rem;
    color: snow
}

.new-game {
    background-color: black;
    color: white;
}

.success {
    background-color: #00ffea;
    color: black;
}
</style>
