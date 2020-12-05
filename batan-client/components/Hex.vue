<template>
        <li class = 'hex' v-bind:class='[{"atmosphere": isAtmosphere}, {"spacer": isSpacer}]'>
          <div v-if="!isAtmosphere && !isSpacer">
            <Settlement class= "t" :settlement-id='setSettlementId'></Settlement>
            <Settlement class= "tl" :settlement-id='setSettlementId'></Settlement>
            <div v-if="hexId == 2 || hexId == 6 || hexId == 11 || hexId == 15 || hexId == 18">
              <Settlement class= "tr" :settlement-id='setSettlementId'></Settlement>
            </div>
            <div v-if="hexId == 16 || hexId == 17 || hexId == 18">
              <Settlement class= "b" :settlement-id='setSettlementId'></Settlement>
            </div>
            <div v-if="hexId == 11 || hexId == 15 || hexId == 18">
              <Settlement class= "br" :settlement-id='setSettlementId'></Settlement>
            </div> 
            <div v-if="hexId == 7 || hexId == 12 || hexId == 16 || hexId == 17 || hexId == 18">
              <Settlement class= "bl" :settlement-id='setSettlementId'></Settlement>
            </div>

            <Road class='tr'></Road>
            <Road class='tl'></Road>
            <Road class ='l'></Road>
            <div v-if="hexId == 11 || hexId == 15 || hexId == 16 || hexId == 17 || hexId == 18">
              <Road :hex-id='assignHexID()' class='br'></Road>
            </div>
            <div v-if="hexId == 7 || hexId == 12 || hexId == 16 || hexId == 17 || hexId == 18">
              <Road class ='bl'></Road>
            </div>
            <div v-if="hexId == 2 || hexId == 6 || hexId == 11 || hexId == 15 || hexId == 18">
              <Road class ='r'></Road>
            </div>
          </div>
        </li>  
</template>

<script lang="ts">
import Vue from 'vue';
console.log('bruh');

export default Vue.extend({
    props: {
        hexId: Number,
        isAtmosphere: {
          type: Boolean,
          default: false
        },
        isSpacer: {
          type: Boolean,
          default: false
        }
    },
    created() {
    },
    methods: {
      assignHexID() {
        return this.hexId;
      },
      setSettlementId() {
        var switchVar = this.hexId;
        switch(switchVar) {
          case 0:
            break;
          case 1:
            break;
        }
      }
    }
})
</script>

<style scoped>


.hex {
    position: relative;
    border-radius: 2px;
    background: #ccc;
    background-color: rgb(204, 204, 204);
    transform: rotate(-90deg);
    display: inline-block;
    transition: all 150ms ease-in-out;
    top: 0; bottom: 0; right: 0; left: 0;
    pointer-events: all;
    z-index: 0;
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

.brick {
  background: #ff8800;
}

.lumber {
  background: rgb(94, 255, 0);
}

.wool {
  background: rgb(255, 1, 242);
}

.grain{
  background: #ffe700;
}

.ore{
  background: rgb(155, 4, 255);
}

.empty{
  background:white;
}

.spacer {
    background: transparent;
}

.atmosphere {
  background: #00ffea;
}

@media screen and (min-width: 0px){
  .hex {
    width: 20px;
    height: 20px;
  }
  .hex.left {
    margin-left: 20vw;
  }
}

@media screen and (min-width: 576px){
  .hex {
    width: 30px;
    height: 30px;
  }
}

@media screen and (min-width: 768px){
  .hex {
    width: 30px;
    height: 30px;
  }
}

@media screen and (min-width: 1000px){
  .hex {
    width: 40px;
    height: 68px;
    margin-top: 50px;
    margin-right: auto;
    margin-left: 40px;
  }

    .hex.left {
    margin-left: 5vw;
  }
}

@media screen and (min-width: 1500px){
  .hex {
    width: 50px;
    height: 85px;
    margin-top: 50px;
    margin-right: auto;
    margin-left: 50px;
  }

    .hex.left {
    margin-left: 15vw;
  }
}

</style>