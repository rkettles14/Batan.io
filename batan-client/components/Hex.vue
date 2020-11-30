<template>
        <li class = 'hex'>
        </li>  
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>

<style scoped>
.hex {
    position: relative;
    margin: 25px auto;
    margin-right: auto;
    width: 75px;
    height: 127.5px;
    border-radius: 5px;
    background: #ccc;
    background-color: rgb(204, 204, 204);
    transform: rotate(-90deg);
    display: inline-block;
    margin-right: 60px;
    transition: all 150ms ease-in-out;
}
.hex:before, .hex:after {
  position: absolute;
  width: inherit; height: inherit;
  border-radius: inherit;
  background: inherit;
  content: '';
  
}
.hex:hover {
  cursor: pointer;
}

.hex:before {
  transform: rotate(60deg);
}
.hex:after {
  transform: rotate(-60deg);
}

.spacer {
    background: transparent;
}

</style>