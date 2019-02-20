<template>
    <v-app id="inspire" :dark="dark">
        <Header />
        <Menu />
        <Loading v-if="validatingToken" />
        <Content  v-else></Content>
        <Footer v-bind:text="'PHBit Company'"/>
    </v-app>
</template>

<script>
import Header from '@/components/template/Header.vue';
import Menu from '@/components/template/Menu.vue';
import Content from '@/components/template/Content.vue';
import Footer from '@/components/template/Footer.vue';
import Loading from '@/components/Loading.vue';

import { userKey } from '@/constants.js';

export default {
    name: 'App',
    components: {
        Loading,
        Header,
        Menu,
        Content,
        Footer
    },
    data () {
        return {
            dark: true,
            validatingToken: true,
        }
    },
    created() {
        this.validateToken();
    },
    methods: {
        async validateToken() {
            this.validatingToken = true

            const userData = JSON.parse(localStorage.getItem(userKey))
            this.$store.dispatch("template/setUser", userData)

            if (!userData) {
                this.validatingToken = false
                this.$router.push({name: "auth"})
                return
            }

            const response = await this.$http.get("token", {userData});

            if (response.status === 200)
                this.$store.dispatch("template/setUser", userData)
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

