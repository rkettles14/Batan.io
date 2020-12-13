<template>
    <b-container fluid>
        <h1>Game Statistics</h1>
        <hr>
        <div class="game-card">
            <h2>Games Played: {{gameStats.length}}</h2>
            <h2>Games Won: {{gamesWon}}</h2>
            <h2>Games Lost: {{gamesLost}}</h2>
        </div>
        <hr>
        <div v-show="gameStats.length == 0">
            <div class="game-card">
                <h3>
                    Looks like you haven't played any games yet.<br>
                    <small>
                        Stats will appear here once you've played some games
                    </small>
                </h3>
            </div>
            <!-- <b-button @click.prevent="getData">Click here to fetch</b-button> -->
        </div>
        <div v-show="gameStats.length != 0">
            <div
                class="game-card"
                v-for="game in gameStats"
                :key="game.date"
            >
            <h3>{{game.gameName}}</h3>
            <h4>Played {{new Date(game.date).toLocaleDateString()}}</h4>
            <h4>{{game.playerWon ? "You Won!" : "You lost"}}</h4>
            <!--todo maybe squeeze Rylan's beautiful component here-->
            </div>
        </div>
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
                this.$data.gamesWon = response.data.games.filter(game => game.playerWon).length;
                this.$data.gamesLost = response.data.games.filter(game => !game.playerWon).length;
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
.stats-table {
    width: 100%;
}

.game-card {
    border: solid slategrey 1px;
    border-radius: 1rem;
    padding: 1rem;
    margin: 0.5rem 0;
    background-color: #2a2a2a;
}

</style>