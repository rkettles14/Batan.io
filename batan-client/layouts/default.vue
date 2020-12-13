<template>
  <div class="default-container">
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Chat from "@/components/Chat.vue";

export default {
  components: {
    Navbar,
    Chat
  }
}
</script>

<style>
.default-container {
  height: 100vh;
  background-color: black;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: black;
}
</style>
