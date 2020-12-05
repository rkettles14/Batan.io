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
            this.$root.socket.on("game/joined", (game) => {
                window.$nuxt.$router.push("/game-screen");
            });
        }
    }
});
</script>

<style scoped>
.form-element {
    margin: 2%;
}
</style>
