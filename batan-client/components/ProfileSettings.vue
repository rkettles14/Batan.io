<template>
    <b-container fluid>
        <!--todo implement some settings that the user can
        change if they want to-->
        <b-row>
            <b-col cols="10">
                <h2>Some Arbitrary Setting</h2>
            </b-col>
            <b-col>
                <label class="switch">
                    <input type="checkbox">
                    <span class="slider"></span>
                </label>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="10">
                <h2>Some Arbitrary Setting #2 That has a really really long name</h2>
                <p>Maybe also a little bit of extra information should we need it</p>
            </b-col>
            <b-col>
                <label class="switch">
                    <input type="checkbox">
                    <span class="slider"></span>
                </label>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="10">
                <h2>Some Arbitrary Setting #3</h2>
            </b-col>
            <b-col>
                <label class="switch">
                    <input type="checkbox">
                    <span class="slider"></span>
                </label>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "ProfileSettings"
})
</script>

<style scoped>
/*Got this from w3 school https://www.w3schools.com/howto/howto_css_switch.asp*/
.switch {
    justify-self: right;
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: cyan;
}

input:focus + .slider {
    box-shadow: 0 0 1px cyan;
}

input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

</style>