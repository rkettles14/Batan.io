<template>
    <b-container fluid>
        <h2>Create Game</h2>
        <b-form @submit.prevent="send">
            <div class="form-element">
                <label>Game Name:</label>
                <b-form-input
                    v-model="name"
                    type="text"
                    placeholder="Enter Game Name Here"
                    autocomplete="off"
                />
            </div>

            <div class="form-element">
                    <b-button
                        type="submit"
                        variant="success"
                    >
                    <b-overlay :show=showOverlay variant="success">
                        Create Game
                    </b-overlay>
                </b-button>
            </div>

        </b-form>
        <!--todo only show the div if there are items to be shown-->
        <div>
            <hr>
            <br>
            <h2>Games Pending Start</h2>
            <ul class="list-container">
                <!--todo make reactive to all the games that the player
                    has created but not started-->
                <li class="card-li">
                    <div class="card-sub-item">
                        <h3>Game Name</h3>
                        <b-button variant="success" @click.prevent="start">Start Game</b-button>
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
        },

        start() {
            //todo implement
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

.card-li {
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
