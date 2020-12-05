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
        }
    }
});
</script>

<style scoped>
.form-element {
    margin: 2%;
}
</style>