<template>
    <b-container fluid>
        <b-list-group
            class="message-display"
        >
            <b-list-group-item
                v-for="message in $store.state.chat.currentChat"
                :key="message.userName + message.timestamp"
                variant="secondary"
                class="list-item"
            >
                <div class="user-img">
                    <b-avatar :src="message.userImgUrl"/>
                </div>
                <div class="msg-content">
                    {{message.content}}
                </div>
            </b-list-group-item>
        </b-list-group>
    </b-container>
</template>
<script>
import Vue from 'vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

export default Vue.extend({
    name: "ChatDisplay",
    data() {
        return {
        };
    }
});
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
</script>
<style scoped>
.message-display {
    overflow: auto;
    scroll-behavior: smooth;
    width: 100%;
    height: 100%;
}
.list-item {
    display: flex;
    flex-flow: row;
    margin: 1px;
    padding: 2px;
    background-color: black;
    border-bottom: 2px solid gray;
    border-radius: 0px;
}
.user-img {
    float: left;
    margin: 1;
    padding: 0 5px 0 0;
}
.msg-content {
    flex-grow: 1;
    margin: auto;
    color: white;
}
</style>