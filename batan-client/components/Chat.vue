<template>
    <b-container class="chat-container">
        <b-row>
            <span class="heading" variant="secondary">Chat</span>
        </b-row>
        <b-row class="display">
            <ChatDisplay />
        </b-row>
        <b-row>
            <ChatInput />
        </b-row>
    </b-container>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    name: "Chat",
})
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-flow: column;
    justify-items: flex-start;
    border: 2px gray solid;
    border-radius: 7px;
    height: 60vh;
    overflow-x: hidden;
    max-height: 60vh;
    background-color: black;
}
.heading {
    width: 100%;
    text-align: center;
    color: black;
    background-color: #00ffea;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.display {
    flex-grow: 1;
    max-height: 56vh;
    overflow-y: auto;
}

</style>
