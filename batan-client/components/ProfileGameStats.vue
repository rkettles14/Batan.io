<template>
    <b-container fluid>
        <!--todo Query backend for the user's game stats and display here-->
        <h1>Games Played: 0<!--{{//todo bind to total games}}--></h1>
        <h1>Games Won: 0<!--{{//todo bind to num games won}}--></h1>
        <hr>
        <b-table striped bordered table-variant="secondary" :items="gamestats">
            <!--todo get all of the games that the user has played-->
        </b-table>
    </b-container>
    
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
   name: "ProfileGameStats",
   data() {
       return {
           gamestats: [
                //todo find out what we actually store
               {"date": "some date", "Num Players": "4", "Resources gathered": "none"},
               {"date": "some date", "Num Players": "4", "Resources gathered": "none"},
               {"date": "some date", "Num Players": "4", "Resources gathered": "none"},
               {"date": "some date", "Num Players": "4", "Resources gathered": "none"},
               {"date": "some date", "Num Players": "4", "Resources gathered": "none"},
               {"date": "some date", "Num Players": "4", "Resources gathered": "none"},
               {"date": "some date", "Num Players": "4", "Resources gathered": "none"},
           ]
       }
   }
});
</script>

<style scoped>

</style>