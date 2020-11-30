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
import {BootstrapVue} from 'bootstrap-vue'

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
    props: {

    },
    data() {
      return {
          msg: ""
      };
    },
    watch: {
    },
    mounted() {
        if(this.$root.chatsocket === undefined || this.$root.chatsocket === null){
            console.log("warning - chat socket is not initialized");
        }
    },
    methods: {
        send() {
            replaceEmojies();
            this.$root.chatsocket.emit("message", {
                chatid: 1,
                user: this.$auth.name,
                msg: this.$data.msg,

            });
            this.$data.msg = "";
        },

        replaceEmojies() {
            const re = RegExp(':[\w-]*:');
            let result = this.$data.msg.matchAll(re);
            console.log(result);
            if(result != null){
                console.log("here!");
                for(let emoji of result){
                    if(emoji[0] in emojiMap){
                        let utf_emoji = emojiMap.get(emoji[0]);
                        if(utf_emoji === undefined) continue;
                        this.$data.msg.replaceAll(emoji[0], utf_emoji);
                    }
                }
            }
        },
    }
});

Vue.use(BootstrapVue);
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
