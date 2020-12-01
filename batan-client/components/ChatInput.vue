<template>
    <b-container fluid>
        <b-form
        class="row chat-input-container"
        @submit.prevent="send"
        >
            <b-form-input
                class="col-10 h-100 input"
                v-model="msg"
                type="text"
                placeholder="Type Message Here"
            />
            <b-button
                type="submit"
                class="col nopadding outline-primary h-100"
            ><b-img src="@/static/send.png"
                class="icon-img"
                thumbnail center
                blank-color="transparent"
            /></b-button>
        </b-form>
    </b-container>    
</template>
<script>
import Vue from 'vue'

const emojiMap = new Map([
    [':smile:', String.fromCodePoint(0x1F601)],
    [':sad:', String.fromCodePoint(0x1F61F)],
    [':shock:', String.fromCodePoint(0x1F62E)],
    [':cry:', String.fromCodePoint(0x1F622)],
    [':poop:', String.fromCodePoint(0x1F4A9)],
    [':sob:', String.fromCodePoint(0x1F62D)]
    //todo add some more choice emojis
]);

export default Vue.extend({
    name: "ChatInput",

    data() {
      return {
          msg: ""
      };
    },

    methods: {
        send() {
            if(this.$root.socket === undefined){
                console.log("WARNING - chat socket is not initialized");
                return;
            }
            if(!this.$auth.loggedIn){
                console.log("WARNING - attempting to send msg without being logged in");
                return;
            }
            if(this.$data.msg === ""){
                return;
            }

            const content = this.replaceEmojies(this.$data.msg);
            this.$root.socket.emit("chat/message", {
                chatId: this.$root.chatId,
                userName: this.$auth.user.name,
                userImgUrl: this.$auth.user.picture,
                content: content
            });
            this.$data.msg = "";
        },

        replaceEmojies(content) {
            const re = /:[\w-]*:/;
            let result = content.match(re);

            if(result != null){
                for(let emoji of result){
                    if(emojiMap.has(emoji)){
                        let utf_emoji = emojiMap.get(emoji);
                        if(utf_emoji === undefined) continue;
                        content = content.replaceAll(emoji, utf_emoji);
                    }
                }
            }

            return content;
        },
    }
});
</script>

<style scoped>
.chat-input-container {
    height: 2rem;
}
.icon-img {
    height: 100%;
    padding: 0;
    border: 0;
    background-color: transparent;
}
.input {
    font-size: 12px;
}
</style>
