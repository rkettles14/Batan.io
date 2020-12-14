<template>
   <div class="admin-container">
      <b-button variant="outline-info" @click.prevent="toggleVisibility" class="settings-button">
         <b-icon-gear font-scale="3"/>
      </b-button>
      <div v-show="show" class="admin-controls">
         <label class="control-label">Timeout Duration (s)</label>
         <b-row>
            <b-col cols="5">
               <b-form-input :type="`number`" min="10" max="300" v-model="timeout"></b-form-input>
            </b-col>
            <b-col>
               <b-button @click.prevent="setTimeout">
                  <b-overlay :show="showOverlayTimeout">
                     Set
                  </b-overlay>
               </b-button>
            </b-col>
         </b-row>

         <label class="control-label">Skip Player Turn if AFK</label>
         <b-row>
            <b-col cols="5">
               <b-form-checkbox size="lg" v-model="skip" switch></b-form-checkbox>
            </b-col>
            <b-col>
               <b-button @click.prevent="setSkipTurn">
                  <b-overlay :show="showOverlaySkip">
                     Set
                  </b-overlay>
               </b-button>
            </b-col>
         </b-row>
      </div>
   </div> 
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
   computed: {
      currentTimeout: function() {
         return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].turn_timeout_length;
      },
      currentSkip: function() {
         return this.$store.state.games.active_games[this.$store.state.games.active_game.game_id].skip_if_dc;
      }
   },
   data() {
      return {
         show: false,
         showOverlayTimeout: false,
         timeout: 0,
         showOverlaySkip: false,
         skip: false,
      };
   },
   mounted() {
      this.$data.timeout = this.currentTimeout;
      this.$data.skip = this.currentSkip;
   },
   methods: {
      toggleVisibility(){
         this.$data.show = !this.$data.show;
      },
      setTimeout(){
         let time = this.$data.timeout;
         if(time < 10 || time > 300){
            console.log("Timeout is unreasonable " + time);
            return;
         }
         // @ts-ignore
         this.$root.socket.emit('game/admin/settimeout', {
            game_id: this.$store.state.games.active_game.game_id,
            timeout: time
         });

         this.$data.showOverlayTimeout = true;
         setTimeout(()=>{
            this.$data.showOverlayTimeout = false;
         }, 1000);
         
      },
      setSkipTurn(){
         let value = this.$data.skip;
         // @ts-ignore
         this.$root.socket.emit('game/admin/setSkipIfOffline', {
            game_id: this.$store.state.games.active_game.game_id,
            skip: value
         });
         this.$data.showOverlaySkip = true;
         setTimeout(()=>{
            this.$data.showOverlaySkip = false;
         }, 1000);
      }
   }
});
</script>

<style>
.admin-container {
   display: flex;
   flex-grow: 1;
   flex-shrink: 1;
   flex-basis: auto;
   border-radius: 1rem;
   padding: 0.25rem;
}

.settings-button {
   border-radius: 1rem;
}

.admin-controls {
   flex-direction: column;
   width: 15rem;
   margin: 1rem;
}

.control {
   display: inline-block;
}

.control-label {
   color: snow;
}
</style>