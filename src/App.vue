<template>
  <div id="app">
    <v-app id="inspire">
      <Login />
    </v-app>
  </div>
</template>

<script>
import Login from './components/auth/Login.vue'

export default {
  name: 'App',
  components: {
    Login
  },
  data () {
    return {
      //
    }
  },
  created() {
    //this.$http.get("painel/login").then(res => console.log(res)).catch(e => console.log("Marlon Erro"+e));
  }
}
</script>

<style>

</style>

