<template>
<div>
        <div class='resource-value' :class='[assignResourceValue, {"robberPhase": robberPhase}]'>
        </div>
        <img v-if='hasRobber' src='/spacePirate.png'>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
console.log('bruh');

export default Vue.extend({
    props: {
        resourceValue: Number,
        hasRobber: Boolean,
        robberPhase: Boolean
    },
    computed: {
        assignResourceValue(){
            var resourceClass = '';

            if(this.hasRobber) resourceClass+= 'robber ';

            switch(this.resourceValue){
                case 2:
                    return resourceClass + 'two';
                case 3:
                    return resourceClass + 'three';
                case 4:
                    return resourceClass + 'four';
                case 5:
                    return resourceClass + 'five';
                case 6:
                    return resourceClass + 'six';
                case 7:
                    return resourceClass + 'seven';
                case 8:
                    return resourceClass + 'eight';
                case 9:
                    return resourceClass + 'nine';
                case 10:
                    return resourceClass + 'ten';
                case 11:
                    return resourceClass + 'eleven';
                case 12:
                    return resourceClass + 'twelve';
                default:
                    return resourceClass + 'empty';
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
.resource-value {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: bold;
    position: absolute;
    font-size: 25px;
    line-height: 30px;
    border-radius: 30px;
    text-align: center;
    z-index: 200;
    height: 40px;
    width: 40px;
    border: 3px solid black;
    top: 23px;
    left: 8px;
    transform: rotate(90deg);
    background-color: white;
    pointer-events: none;
}

img{
    position: absolute;
    transform: rotate(90deg);
    height: 90px;
    width: 90px;
    top: -5px;
    left: -20px;
    z-index: 499;
}

.resource-value::after {
    position: absolute;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    z-index: 500;
    height: 40px;
    width: 40px;
    top: 6px;
    left: -3px;
}

.resource-value.robber{
  opacity: .2;
  border: 2px dotted;

}

.resource-value.empty {
    visibility: hidden;
}

.resource-value.empty.robber.robberPhase{
  opacity: .2;
  border: 2px dotted;
}

.resource-value.two::before { content: "2"; }
.resource-value.two::after { content: "."; }

.resource-value.three::before { content: "3"; }
.resource-value.three::after { content: ".."; }

.resource-value.four::before { content: "4"; }
.resource-value.four::after { content: "..."; }

.resource-value.five::before { content: "5"; }
.resource-value.five::after { content: "...."; }

.resource-value.six::before { content: "6"; color: red;}
.resource-value.six::after { content: "....."; color: red;}

.resource-value.eight::before { content: "8"; color: red;}
.resource-value.eight::after { content: "....."; color: red;}

.resource-value.nine::before { content: "9"; }
.resource-value.nine::after { content: "...."; }

.resource-value.ten::before { content: "10"; }
.resource-value.ten::after { content: "..."; }

.resource-value.eleven::before { content: "11"; }
.resource-value.eleven::after { content: ".."; }

.resource-value.twelve::before { content: "12"; }
.resource-value.twelve::after { content: "."; }

.resource-value.robberPhase.empty {
    border: 3px solid black;
    opacity: 1;
    visibility: visible;
}

.resource-value.robberPhase {background-color: grey;}
.resource-value.robberPhase::after {content: '';}
.resource-value.robberPhase::before {content: '';}

</style>