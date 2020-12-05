<template>
        <div v-on:click='selectRoad'>
        </div>  
</template>

<script lang="ts">
import Vue from 'vue';
console.log('bruh');

export default Vue.extend({
    props: {
        hexId: Number,
        vertices: Array
    },
    created(){
       
    },
    methods: {
      selectRoad: function(){
        console.log('road clicked');
      }
    }
})
</script>

<style scoped>
* {
  border-radius: 3px;
  background-color: transparent;
  position: absolute;
  width: 9px;
  height: 50px;
  z-index: 100;
  pointer-events: all;
}

*:hover {
  background: lightgrey;
}

.tr {
  left: 65px;
  top: 43px;
  transform: rotate(30deg);
}

.tl {
  left: 65px;
  top: -8px;
  transform: rotate(150deg);
}

.l {
  left: 22px;
  top: -35px;
  transform: rotate(90deg);
}

.br {
  left: -25px;
  top: 43px;
  transform: rotate(150deg);
}

.bl {
  left: -25px;
  top: -10px;
  transform: rotate(30deg);
}

.r {
  left: 20px;
  top: 69px;
  transform: rotate(90deg);
}

</style>