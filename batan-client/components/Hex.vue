<template>
        <li class = 'hex' v-bind:style='hexObject'>
        </li>  
</template>

<script lang="ts">
import Vue from 'vue';
console.log('bruh');

export default Vue.extend({
  data(){
    return {
      hexObject: {
        width: 75 + 'px' as String,
        height: 75 * 1.7 + 'px' as String
      },
      windowWidth: 0 as number
    }
  },
  created() {
    if (process.browser){
      window.addEventListener("resize", this.myEventHandler);
      this.windowWidth = window.innerWidth;
      this.myEventHandler();
    }
  },
  destroyed() {
    if(process.browser){
      window.removeEventListener("resize", this.myEventHandler);
    }
  },
  methods: {
    myEventHandler() {
      // your code for handling resize...
      this.windowWidth = window.innerWidth;
      let hexWidth: number = 0;

      if(this.windowWidth < 576) {
          hexWidth = 30;
      }
      else if( 768 > this.windowWidth && this.windowWidth >= 576){
          hexWidth = 40;
      }
      else if( 992 > this.windowWidth && this.windowWidth >= 768){
          hexWidth = 50;
      }
      else if(1200 > this.windowWidth && this.windowWidth >= 992){
          hexWidth = 55;
      }
      else if(this.windowWidth >= 1200){
          hexWidth = 30;
      }


      console.log(this.windowWidth);

      this.hexObject.width = hexWidth + 'px';
      this.hexObject.height = hexWidth * 1.7 + 'px';


    }
  }
    
})
</script>

<style scoped>
.hex {
    position: relative;
    margin-right: 2vw;
    margin-top: 6vh;
    border-radius: 2px;
    background: #ccc;
    background-color: rgb(204, 204, 204);
    transform: rotate(-90deg);
    display: inline-block;
    transition: all 150ms ease-in-out;
    top: 0; bottom: 0; right: 0; left: 0;
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

.harbor {
  background: #0099ff;
}
.harbor:hover {
  background: #00bbff;
}

</style>