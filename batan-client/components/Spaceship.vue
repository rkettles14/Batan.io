<template>
        <div>
          <img :class='orientation' src='@/static/spaceship.png'>
          <p class='tradeType'>
            <span style='white-space: pre; text-align: center;'>{{trade}}</span>
          </p>
        </div>  
</template>

<script lang="ts">
import Vue from 'vue';

enum harborType {
  none, 
  threeForOne,
  sheep,
  wheat,
  wood,
  ore,
  brick,
}

export default Vue.extend({
    props: {
        orientation: String,
        tradingPost: Object
    },
    computed:{
      trade: function(){
        switch(this.tradingPost.harbor){
          case harborType.none:
            return 'no harbor type';
          case harborType.threeForOne:
            return '3:1\r\n?';
          case harborType.sheep:
            return '2:1\r\nwool';
          case harborType.wheat:
            return '2:1\r\nwheat';
          case harborType.wood:
            return '2:1\r\nwood';
          case harborType.ore:
            return '2:1\r\nore';
          case harborType.brick:
            return '2:1\r\nbrick';
          default:
            return "unsupported harbor type";
        }
      }
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
  text-align: center;
  line-height: 15px;
  height: 100%;
  font-family: 'Space Grotesk', sans-serif;
  width: 70px;
  position: absolute;
  z-index: 699;
  font-size: 14px;
  top: 0px;
  left: -35px;
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
  left: 45px;
  top: 5px;
}

img.tr {
  top: 35px;
  left: 40px;
}

</style>