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

<style scoped>
.chat-container {
    display: flex;
    flex-flow: column;
    justify-items: flex-start;
    border: 1px black solid;
    border-radius: 5px;
    height: 100%;
}
.heading {
    width: 100%;
    text-align: center;
    color: white;
    background-color: teal;
}
.display {
    flex-grow: 1;
}

</style>