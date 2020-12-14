<template>
    <b-container fluid>
        <div class="bank">
            <Bank></Bank>
        </div>
        <div>
            <h1><GamePlayerStats></GamePlayerStats></h1>
        </div>

    </b-container>
</template>
<style scoped>
@media screen and (max-width: 1500px){
  .bank {
      display: none;
  }
}
</style>