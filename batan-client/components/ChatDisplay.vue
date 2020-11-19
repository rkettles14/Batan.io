<template>
    <b-container fluid>
        <b-list-group
            class="message-display"
        >
            <b-list-group-item
                variant="secondary"
                class="list-item"
            >
                <div class="user-img">
                    <b-avatar src="$auth.user.image"/>
                </div>
                <div class="msg-content">
                This is a test
                </div>
            </b-list-group-item>
        </b-list-group>
    </b-container>
</template>
<script lang="ts">
import Vue from 'vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

export default Vue.extend({
    name: "ChatDisplay",
    data() {
        return {
        //todo add all the messages
        };
    },
    created: function () {
        //todo socket stuff to listen for messages
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
}
.user-img {
    float: left;
    margin: 1;
    padding: 0 5px 0 0;
}
.msg-content {
    flex-grow: 1;
    margin: auto;
}
</style>