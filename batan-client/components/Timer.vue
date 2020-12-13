<template>
        <div>
            <span><b-icon b-icon icon="clock" animation="fade"></b-icon></span><span :class='{"red": timeLessThanThirtySeconds}'>   {{ timer }}</span>
        </div>  
</template>

<script lang="js">
import Vue from 'vue';

export default Vue.extend({
    data(){
        return {
            currentTime: Date
        }
    },
    props: {
        roadObject: Object
    },
    computed:{
      timer: function(){
          return Math.round((this.endTime - this.currentTime)/1000);
      },
      endTime: function(){
          return new Date(this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].game_info.turn.over_at)
      },
      timeLessThanThirtySeconds: function(){
          return this.timer < 20;
      }
    },
    created(){
       this.currentTime = new Date();
       setInterval(this.updateCurrentTime,1000);
    },
    methods: {
        updateCurrentTime(){
            this.currentTime = new Date();
        }
    }
})
</script>

<style scoped>
*{
    color: white;
    margin: 0;
    padding: 0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 32px;
}

.red {
    color: red;
    font-weight: bolder;
}

</style>