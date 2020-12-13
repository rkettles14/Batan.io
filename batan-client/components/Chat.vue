<template>
    <b-container class="chat-container" fluid>
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
    border-radius: 10px;
    height: 100%;
    overflow-x: hidden;
    max-height: 62vh;
}
.heading {
    width: 100%;
    text-align: center;
    color: black;
    background-color: #00ffea;
    border-radius: 5px;
}
.display {
    flex-grow: 1;
    max-height: 56vh;
    overflow-y: scroll;
}

</style>
