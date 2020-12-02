<template>
    <b-container fluid>
        <h2>Join Game</h2>
        <b-form>
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
                Join Game
                </b-button>
            </div>
        </b-form>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "JoinGame",    
    data() {
        return {
            code: "",
        }
    },

    methods: {
        join() {
            //todo send request to server to join game
        }
    }
});
</script>

<style scoped>
.form-element {
    margin: 2%;
}
</style>