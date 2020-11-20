<template>
  <b-container class="lobby" fluid>
    <b-row class="content" align-v="stretch">
      <b-col class="games" cols="8">
        <span class="selectors">
          <b-button variant="success">Active Games</b-button>
          <b-button variant="success">Create New Game</b-button>
          <b-button variant="success">Join Game With Code</b-button>
        </span>
        <b-table striped hover :items="items">
          <!--todo list all existing games-->
        </b-table>
      </b-col>
      <b-col>
        <Chat />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
export default {
  name: "Lobby",
  components: {},
  data() {
    return {
      items: [
        {Name: "Example's Game", Players: "3-4", Mode: "Normal"}
      ]
    }
  }
}
</script>

<style lang="css" scoped>
.lobby {
  height: 90%
}

.content {
  height: 100%;
}

.games {
  margin: 0 8px 0 0;
}

.selectors {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: space-around;
}
</style>
