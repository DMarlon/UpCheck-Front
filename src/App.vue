<template>
  <div id="app">
      <v-app id="inspire">
        <router-view>
          <HelloWorld />
        </router-view>
      </v-app>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { userKey } from '@/constants.js'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      validatingToken: true
    }
  },
  created() {
    // this.$http.interceptors.response.use(undefined, function (error) {
    //   return new Promise(function (resolve, reject) {
    //     if (error.status === 403) {
    //       this.$router.push({name: "auth"})
    //     }
    //     throw error;
    //   });
    // });

    // if (error.response.status === 401) {
    // const requestConfig = error.config;
    // return axios(requestConfig);
    // }
    // return Promise.reject(error);

    //this.validateToken();
  },
  methods: {
    async validateToken() {
      this.validatingToken = true

      const userData = JSON.stringify(localStorage.getItem(userKey))
      this.$store.commit("setUser", userData)

      if (!userData) {
        this.validatingToken = false
        this.$router.push({name: "auth"})
        return
      }

      const res = await this.$http.post("validadeLogin", {userData});

      if (res.data)
        this.$store.commit("setUser", userData)
      else{
        localStorage.removeItem(userKey)
        this.$router.push({name: "auth"})
      }

      this.validatingToken = false;

    }
  }
}
</script>

<style>

</style>

