<template>
  <div class="">
    <h2>{{ $auth.user.name }}'s Profile Page</h2>
    <p>{{ JSON.stringify($auth.user) }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "Profile",
  components: {},
  mounted() {
  }
}
</script>

<style lang="css" scoped>
</style>
