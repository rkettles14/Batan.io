<template>
    <div class='container'>
        <ol class='even'>
            <Hex class='spacer'></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
        </ol>
        <ol class ='odd'>
            <Hex class='spacer'></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
        </ol>
        <ol class='even'>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
        </ol>
        <ol class ='odd'>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
        </ol>
        <ol class ='even'>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
        </ol>
        <ol class ='odd'>
            <Hex class='spacer'></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
        </ol>
        <ol class='even'>
            <Hex class='spacer'></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
            <Hex></Hex>
        </ol>

    </div>    
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

.container {
  box-sizing: content-box;
  position: relative;
  width: 1300px; 
  border: 1px solid black;
  line-height: 1.3;
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
  margin-bottom: -50px;
}
</style>

