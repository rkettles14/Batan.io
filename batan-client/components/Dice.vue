<template>
    <div>
        <h1>TEST</h1>
        <canvas v-on:click="animateDice" id="dicecanvas"></canvas>
    </div>
</template>
<script lang="ts">

import Vue from 'vue';

class Dice {
    value: number;
    length: number;
    x: number;
    y: number;
    color: string;
    constructor(x: number, y: number, length: number, color: string){
        this.x = x;
        this.y = y;

        this.length = length;
        this.color = color;
        this.value = -1;
    }
}

class TextDisplay {
    x: number;
    y: number;
    text: string;
    constructor(x: number, y: number, text: string){
        this.x = x;
        this.y = y;
        this.text = text;
    }
}

export default Vue.extend({
    data() {
        return {
            redDice: new Dice(20, 15, 200, 'red'),
            yellowDice: new Dice(160, 15, 120,'yellow'),
            valueDisplay: new TextDisplay(200, 15, ''),
            diceCanvas: null as null | any
        }
    },
    mounted() {

        let c = document.getElementById("dicecanvas") as HTMLCanvasElement;

        if(c == null){
                return;
        }

        let ctx = c.getContext("2d") as CanvasRenderingContext2DSettings;
        this.diceCanvas = ctx;

        this.yellowDice = new Dice(this.redDice.length * (1 + 1/3), 15, this.redDice.length, 'yellow');
        this.valueDisplay = new TextDisplay(this.yellowDice.x + this.yellowDice.length * (1), 20, '');

        if(this.diceCanvas == null)
        {
            return;
        }

        this.diceCanvas.canvas.height = this.redDice.length + 40;
        this.diceCanvas.canvas.width = this.redDice.length + this.yellowDice.length + this.redDice.length + 100;

        this.resetDisplay();
        this.displayDice(this.redDice);
        this.displayDice(this.yellowDice);

    },
    methods: {
        rollDice(): number{
            let roll1 = Math.floor(Math.random() * 6) + 1;
            let roll2 = Math.floor(Math.random() * 6) + 1;

            this.redDice.value = roll1;
            this.yellowDice.value = roll2;

            this.resetDisplay();
            this.displayDiceValue(this.redDice);
            this.displayDiceValue(this.yellowDice);
            this.displayText((roll1 + roll2).toString());
            return roll1 + roll2;
        },
        resetDisplay(): void {

            var c = document.getElementById("dicecanvas") as HTMLCanvasElement;
            this.diceCanvas.fillStyle = "black";
            this.diceCanvas.fillRect(0, 0, c.width, c.height);

        },
        displayDice(dice: Dice): void{
            
            this.diceCanvas.beginPath();

            this.diceCanvas.rect(dice.x, dice.y, dice.length, dice.length);

            this.diceCanvas.strokeStyle = dice.color;
            this.diceCanvas.lineWidth= 2;

            this.diceCanvas.stroke();
            this.diceCanvas.closePath();

        },
        displayText(text: string): void {
            this.diceCanvas.beginPath();
            this.diceCanvas.font = ""+this.redDice.length+"px Space Grotesk";
            this.diceCanvas.fillStyle = "#FD5F00";
            this.diceCanvas.fillText(text, this.valueDisplay.x + this.redDice.length/6, this.valueDisplay.y + this.redDice.length*5/6);
            this.diceCanvas.closePath();
        },
        animateDice(): void{
            var counter = 0;
            var myTimer=setInterval(()=>{
                this.resetDisplay();
                this.redDice.value = Math.floor(Math.random() * 6) + 1;
                this.displayDiceValue(this.redDice);
                this.yellowDice.value = Math.floor(Math.random() * 6) + 1;
                this.displayDiceValue(this.yellowDice);
                this.displayText((this.redDice.value + this.yellowDice.value).toString());
                counter ++;
                if(counter > 10) {
                    clearInterval(myTimer);
                    this.rollDice();
                }
            }
            , 130);
        },
        displayDiceValue(dice: Dice): void {
            
            this.displayDice(this.redDice);
            this.displayDice(this.yellowDice);

            this.diceCanvas.strokeStyle = dice.color;
            this.diceCanvas.lineWidth = 2;

            switch(dice.value) {
                case 1: {
                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (2/3 - 1/6), dice.y + dice.length * (2/3 - 1/6), dice.length/4, 0, 2 * Math.PI);

                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    break;
                }
                case 2: {
                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1/3 - 1/12), dice.y + dice.length * (1/3 - 1/12), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1 - 1/12 - 1/ 6), dice.y + dice.length * (1 - 1/12 - 1/6), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();
                    break;
                }
                case 3: {

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1/3 - 1/8), dice.y + dice.length * (1/3 - 1/8), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (2/3 - 1/6), dice.y + dice.length * (2/3 - 1/6), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1 - 1/24 - 1/6), dice.y + dice.length * (1 - 1/24 - 1/6), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();
                    break;
                }
                case 4: {
                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1/3 - 1/12), dice.y + dice.length * (1/3 - 1/12), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1 - 1/12 - 1/ 6), dice.y + dice.length * (1/3 - 1/12), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1 - 1/12 - 1 / 6), dice.y + dice.length * (1 - 1/12 - 1/6), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1/3 - 1/12), dice.y + dice.length * (1 - 1/12 - 1/6), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    break;
                }
                case 5: {
                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1/3 - 1/8), dice.y + dice.length * (1/3 - 1/8), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1 - 1/24 - 1/6), dice.y + dice.length * (1/3 - 1/8), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (2/3 - 1/6), dice.y + dice.length * (2/3 - 1/6), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1/3 - 1/8), dice.y + dice.length * (1 - 1/24 - 1/6), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1 - 1/24 - 1/6), dice.y + dice.length * (1 - 1/24 - 1/6), dice.length/6, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    break;
                }
                case 6: {

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1/3 - 1/6), dice.y + dice.length * (1/3 - 1/6), dice.length/7.5, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1 - 1/6), dice.y + dice.length * (1/3 - 1/6), dice.length/7.5, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1/3 - 1/6), dice.y + dice.length * (2/3 - 1/6), dice.length/7.5, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1 - 1/6), dice.y + dice.length * (2/3 - 1/6), dice.length/7.5, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1/3 - 1/6), dice.y + dice.length * (1 - 1/6), dice.length/7.5, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();

                    this.diceCanvas.beginPath();
                    this.diceCanvas.arc(dice.x + dice.length * (1 - 1/6), dice.y + dice.length * (1 - 1/6), dice.length/7.5, 0, 2 * Math.PI);
                    this.diceCanvas.stroke();
                    this.diceCanvas.closePath();
                    break;
                }
                default: {
                    alert('roll da dice')
                    break;
                }
            }
        }
    }
});
</script>
<style>
#dicecanvas {
    border-style: solid;
    border-color: black;
}

h1 {
    font-family: 'Space Grotesk', sans-serif;
}
</style>