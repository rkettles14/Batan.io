<template>
  <b-container v-if="$auth.loggedIn" fluid>
    <b-row>
      <b-col>
        <b-list-group>

          <b-list-group-item class="info" button
            @click="setDisplayToAccount()"
          >
            Account
          </b-list-group-item>

          <b-list-group-item class="info" button
            @click="setDisplayToStats()"
          >
            Statistics
          </b-list-group-item>
        </b-list-group>

      </b-col>
      <b-col cols="10">
        <b-container v-show="showAccount" fluid>
          <ProfileAccount />
        </b-container>

        <b-container v-show="showStats" fluid>
          <ProfileGameStats />
        </b-container>

        <b-container v-show="showSettings" fluid>
          <ProfileSettings />
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Profile",
  components: {},
  data() {
    return {
      showAccount: true,
      showStats: false,
      showSettings: false
    }
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push({
        path: '/'
      });
    }
  },
  mounted() {
  },
  methods: {
    setDisplayToAccount(){
      this.showAccount = true;
      this.showStats = false;
      this.showSettings = false;
    },
    setDisplayToStats(){
      this.showAccount = false;
      this.showStats = true;
      this.showSettings = false;
    },
    setDisplayToSettings(){
      this.showAccount = false;
      this.showStats = false;
      this.showSettings = true;
    },


  }
});
</script>

<style lang="css" scoped>
.info {
  background-color: black;
  border: 2px solid gray;
  border-radius: 5px;
  color: white;
  margin: 4px;
}

.info:hover {
  background-color: lightgray;
  color: black;
}
</style>
