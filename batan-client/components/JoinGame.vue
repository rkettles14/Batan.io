<template>
    <b-container fluid>
        <h2>Join Game</h2>
        <b-form @submit.prevent="join">
            <div class="form-element">
                <label>Game Code:</label>
                <b-form-input
                    v-model="code"
                    type="text"
                    autocomplete="off"
                    placeholder="Enter Game Code Here"
                />
            </div>
            <div class="form-element">
                <b-button
                    type="submit"
                    variant="success"
                >
                <b-overlay :show="showOverlay" variant="success">
                    Join Game
                </b-overlay>
                </b-button>
            </div>
        </b-form>
        <div>
            <hr>
            <br>
            <h2>Current Games</h2>
            <ul class="list-container">
                <!--todo make reactive to all the games that the player
                    has joined and are active or not started-->
                <li class="card-item">
                    <div class="card-sub-item">
                        <h3>Game Name</h3>
                        <!--todo only display the goto button if the game has been started-->
                        <b-button variant="success" @click.prevent="gotoGame">Goto Game</b-button>
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
        gotoGame() {
            //todo implement
            //will require the game id to do so
        }
    }
});
</script>

<style scoped>
.form-element {
    margin: 2%;
}

.list-container {
    list-style-type: none;
}

.card-item {
    border: black 1px solid;
    border-radius: 5px;
    margin: 5px;
    padding: 1.5rem;
    display: flex;
}

.card-sub-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>