<template>
    <div class="container">
        <b-col>
            <b-card v-if="error.statusCode == 404">Page not found</b-card>
            <b-card v-else>An error occured when processing your request</b-card>
            <b-button variant="primary">
                <nuxt-link v-if="$auth.loggedIn" to="/lobby">Return to Lobby</nuxt-link>
                <nuxt-link v-else to="/">Return To Main Page</nuxt-link>
            </b-button>
        </b-col>
    </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'default'
}
</script>