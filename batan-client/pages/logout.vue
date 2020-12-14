<template>
  <div class="">
    <h2>Goodbye</h2>
  </div>
</template>

<script lang="ts">
export default {
  name: "Logout",
  auth: false,
  components: {},
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push({
        path: '/'
      });
    }
  }
}
</script>

<style lang="css" scoped>
</style>
