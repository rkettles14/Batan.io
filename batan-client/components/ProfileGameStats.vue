<template>
    <b-container fluid>
        <!--todo Query backend for the user's game stats and display here-->
        <h1>Games Played: {{gameStats.length}}</h1>
        <h1>Games Won: {{gamesWon}}</h1>
        <h1>Games Lost: {{gamesLost}}</h1>

        <b-button @click.prevent="getData">Click here to fetch</b-button>

        <hr>
        <b-table striped bordered table-variant="secondary" :items="gameStats">
            <!--todo get all of the games that the user has played-->
        </b-table>
    </b-container>
    
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
   name: "ProfileGameStats",
   data() {
       return {
           gamesWon: 0,
           gamesLost: 0,
           gameStats: []
       }
   },
   methods: {
    getData() {
        this.$axios.get('http://localhost:3001/api/profile/info').then((response) => {
            if(response.data === ""){
                const user = {
                    firstName: this.$auth.user.given_name,
                    lastName: this.$auth.user.family_name,
                    nickname: this.$auth.user.nickname,
                    email: this.$auth.user.email,
                };
                console.log(user);
                this.$axios.post('http://localhost:3001/api/profile/create', user).then((response) => {
                    console.log(response.data);
                    this.$data.playerStats = response.data;
                });
            } else {
                this.$data.gameStats = response.data.games;
                this.$data.gamesWon = response.data.games.filter(game => game.playerWon);
                this.$data.gamesLost = response.data.games.filter(game => !game.playerWon);
            }
        });
    }
   },
   mounted() {
       this.getData();
   }
});
</script>

<style scoped>

</style>