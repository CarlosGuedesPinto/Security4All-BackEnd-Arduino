<template>
  <div id="app">


    <router-view/>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  components: {

  },
  beforeMount() {
    let token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common['x-access-token'] = token
    }
  }
};
</script>

<style lang="scss">
@import "./assets/main.scss";
</style>
