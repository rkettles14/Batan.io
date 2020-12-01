<template>
    <b-container fluid>
        <h1>Board Game</h1>
        <!--todo implement the board game graphics-->
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "GameBoard",
    props: {

    },
    created() {
        this.$store.commit("chat/changeToChatRoom", this.$store.state.games.activeGame);
    }
});
</script>

<style scoped>

</style>
