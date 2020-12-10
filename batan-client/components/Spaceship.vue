<template>
        <div>
          <img :class='orientation' src='@/static/spaceship.png'>
          <p class='tradeType'>
            3:1 wool
          </p>
        </div>  
</template>

<script lang="ts">
import Vue from 'vue';
console.log('bruh');

export default Vue.extend({
    props: {
        orientation: String
    },
    computed:{
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
img {
  width: 50%;
  height: 60%;
  position: absolute;
  z-index: 600;
}

.tradeType{
  width: 70px;
  position: absolute;
  z-index: 699;
  top: 35px;
  left: 10px;
  transform: rotate(90deg);
}

img.br{
  transform: rotate(130deg);
  left: -15px;
  top: 30px;
}

img.bl{
  left: -13px;
  top: 2px;
  transform: rotate(180deg);
}

img.r{
  top: 45px;
  left: 10px;
  transform: rotate(60deg);
}

img.l{
  top: -10px;
  left: 10px;
  transform: rotate(240deg);
}

img.tl{
  transform: rotate(305deg);
  left: 35px;
  top: 5px;
}

img.tr {
  top: 35px;
  left: 30px;
}

</style>