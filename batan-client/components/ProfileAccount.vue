<template>
    <b-container fluid>
        <div class="user-container">
            <b-avatar :src="$auth.user.picture" size="10rem"/>
            <div class="user-info">
                <h3>User Name: {{$auth.user.name}}</h3>
                <h3>Nickname: {{$auth.user.nickname}}</h3>
                <h3>Email: {{$auth.user.email}}</h3>
            </div>
        </div>
        <h1>{{$data.playerStats}}</h1>
        <b-button @click.prevent="getData">Click here to fetch</b-button>
        <hr>
        <b-card>
            <p>If you want us to delete all your information from our records,
                press the button below. This action is irreversible, permanent
                and cannot be undone. By clicking the button, you agree that
                we're allowed to nuke all your sweet sweet progress in our
                lovely game and are required to delete any personal information
                that we have saved in our database. This nuke action will be
                swift and just so be sure before you press this button
            </p>
            <b-button variant="danger" @click.prevent="showDelete">Delete All Your Information</b-button>
            <b-card v-show="showOverlay" class="warning-container">
                <h3 class="warning">Are you sure?!?!?</h3>
                <b-button variant="danger" @click.prevent="deleteAccountInformation">Yes. Nuke it!</b-button>
            </b-card>
        </b-card>
    </b-container>    
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    name: "ProfileAccount",
    data() {
        return {
            showOverlay: false,
            playerStats: null,
        };
    },
    methods: {
        getData() {
        this.$axios.get('http://localhost:3001/api/profile/info').then((response) => {
            console.log("Got the user information");
            if(response.data === ""){
                console.log("Information was empty. Creating account");
                console.log(this.$auth.user);
                const user = {
                    firstName: this.$auth.user.given_name,
                    lastName: this.$auth.user.family_name,
                    nickname: this.$auth.user.nickname,
                    email: this.$auth.user.email,
                };
                console.log(user);
                this.$axios.post('http://localhost:3001/api/profile/create', user).then((response) => {
                    console.log(response.data);
                    this.$data.playerStats = response.data;
                });
            }
        });
        },
        showDelete() {
            this.$data.showOverlay = true;
        },
        deleteAccountInformation() {
            this.$axios.post('http://localhost:3001/api/profile/delete-profile').then((response) => {
                console.log(response);
            })
        }
    }
});
</script>

<style scoped>
.user-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: left;
    align-content: center;
    border: solid black 1px;
    border-radius: 5px;
    padding: 5px;
}

.user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
}

.warning-container {
    margin: 1rem;
}

.warning {
    color: orange;
}
</style>
