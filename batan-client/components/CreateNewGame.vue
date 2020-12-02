<template>
    <b-container fluid>
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
                <label>Number of Players:</label>
                <b-form-input
                    v-model="numPlayers"
                    type="number"
                    autocomplete="off"
                    default=3
                    min="2"
                    max="5"
                />
            </div>

            <div class="form-element">
                <label>Game Description (optional):</label>
                <b-form-input
                    v-model="description"
                    type="text"
                    autocomplete="off"
                />
            </div>

            <div class="form-element">
                <b-button
                    type="submit"
                    variant="success"
                >
                Create Game
                </b-button>
            </div>
        </b-form>
    </b-container>    
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "CreateNewGame",
    data() {
        return {
            name: "",
            numPlayers: 2,
            description: "",
        };
    },

    methods: {
        send() {
            //todo send the new game request to server
        }
    }
});
</script>

<style scoped>
.form-element {
    margin: 2%;
}
</style>
