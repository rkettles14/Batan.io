<template>
    <b-container class='board-background'>
        <ol class='even'>
            <Hex class='spacer'></Hex>
            <Hex class ='harbor'></Hex>
            <Hex class ='harbor'></Hex>
            <Hex class ='harbor'></Hex>
            <Hex class ='harbor'></Hex>
        </ol>
        <ol class ='odd'>
            <Hex class='spacer'></Hex>
            <Hex class ='harbor'></Hex>
            <Hex></Hex>
            <Hex ></Hex>
            <Hex></Hex>
            <Hex class ='harbor'></Hex>
        </ol>
        <ol class='even'>
            <Hex class ='harbor'></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex class ='harbor'></Hex>
        </ol>
        <ol class ='odd'>
            <Hex class ='harbor'></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex class ='harbor'></Hex>
        </ol>
        <ol class ='even'>
            <Hex class ='harbor'></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex class ='harbor'></Hex>
        </ol>
        <ol class ='odd'>
            <Hex class='spacer'></Hex>
            <Hex class ='harbor'></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex class ='harbor'></Hex>
        </ol>
        <ol class='even'>
            <Hex class='spacer'></Hex>
            <Hex class ='harbor'></Hex>
            <Hex class ='harbor'></Hex>
            <Hex class ='harbor'></Hex>
            <Hex class ='harbor'></Hex>
        </ol>

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

.board-background {
  background: black;
}

ol.even {
  position: relative;
  left: 68.18182px;
  width: 100%;
  margin-bottom: -50px;
}
ol.odd {
  position: relative;
  width: 100%;
  margin: auto; 
  margin-bottom: -50px;
}
</style>

