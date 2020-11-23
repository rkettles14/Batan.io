<template>
    <b-container fluid>
        <!--todo query active games and put them here-->
        <h1>Active games table goes here</h1>
        <b-table striped hover :items="items">
          <!--todo list all existing games-->
        </b-table>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "ActiveGames",
    data() {
        return {
            items: [
                {Name: "Example's Game", Players: "3-4", Mode: "Normal"}
            ]
        }
    },
});
</script>

<style scoped>

</style>
