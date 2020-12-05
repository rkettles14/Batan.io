<template>
        <div v-on:click='selectSettlement'>
        </div>  
</template>

<script lang="ts">
import Vue from 'vue';
console.log('bruh');

export default Vue.extend({
    props: {
        settlementId: Number
    },
    methods: {
        selectSettlement: function(){
            console.log("settlement")
        }
    }
})
</script>

<style scoped>
* {
  border-radius: 3px;
  background: transparent;
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 150;
  pointer-events: all;
}

*:hover {
  background: #0000ff;
  border: 2px dashed white;
}

.blocked:hover{
  background: #ff0000;
  border: 2px dashed white;
}

.t {
  left: 70px;
  top: 30px;
}

.tr {
  left: 40px;
  top: 80px;
}

.tl {
  left: 40px;
  top: -25px;
}

.br {
  left: -20px;
  top: 80px;
}

.bl {
  left: -20px;
  top: -25px;
}

.b {
  left: -45px;
  top: 28px;
}

</style>