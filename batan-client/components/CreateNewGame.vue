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
        <!--todo only show the div if there are items to be shown-->
        <div v-show="Object.values($store.state.games.available_games).filter(game => game.owner).length !== 0">
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
                        <h3 class="center">Players {{game.num_players}}/5</h3>
                        <!--todo hide this button if the game has been started-->
                        <b-button
                            class="success"
                            @click.prevent="start(game)"
                        >
                        Start Game 
                        </b-button>
                        <!--todo show this button when the game has been started-->
                        <b-button
                            v-show="false"
                            class="success"
                            @click.prevent="goto(game)"
                        >
                        goto Game
                        </b-button>
                    </div>
                    <!--todo show all of the players that have joined this particular game-->
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
                this.$data.showOverlay = false;
            });
            this.$data.name = "";
        },

        start(game) {
            this.$root.socket.emit('game/startGame', game);
        },

        goto(game) {
            this.$store.commit('game/changeGame', game);
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

.card-li {
    border: gray 1px solid;
    border-radius: 5px;
    margin: 5px;
    padding: 1.5rem;
    display: flex;
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
    flex-direction: row;
    justify-content: left;
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
