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
    data() {
        return {

        };
    },
    methods: {
        initChatSocket() {
            this.$root.chatSocket = this.$nuxtSocket({
                name: 'chat',
                teardown: false
            });
            this.$root.chatSocket.on('connect', () => {
                this.$root.chatSocket
                    .emit('authenticate', { token: this.$auth.getToken('auth0').split(' ')[1] })
                    .on('authenticated', () => {
                        // post-authenticate w/ websocket
                    })
                    .on('unauthorized', (msg) => {
                        console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
                        throw new Error(msg.data.type);
                    });
            });
        }

    },
    mounted() {
        if(this.$auth.loggedIn) {
            this.initChatSocket();
        }
    }
});
</script>

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