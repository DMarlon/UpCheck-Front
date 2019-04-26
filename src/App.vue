<template>
    <v-app id="inspire" :dark="dark">
        <Header />
        <Menu />
        <Loading v-if="validatingToken" />
        <Content v-else></Content>
        <Footer v-bind:text="'PHBit Company'"/>
    </v-app>
</template>

<script>
import Header from '@/components/template/Header.vue';
import Menu from '@/components/template/Menu.vue';
import Content from '@/components/template/Content.vue';
import Footer from '@/components/template/Footer.vue';
import Loading from '@/components/Loading.vue';

import { userKey } from '@/constants.ts';
import AuthDomain from "@/domains/auth/AuthDomain.ts"

export default {
    name: 'App',
    components: {
        Header,
        Menu,
        Loading,
        Content,
        Footer
    },
    data () {
        return {
            validatingToken: true,
        }
    },
    created() {
        let urlPath = window.location.pathname.split("/")
        if (urlPath.length == 3 && urlPath[1]=="activation" && RegExp("[0-9a-f]{40}").test(urlPath[2])){
            this.validatingToken = false;
            this.$router.push({name: "activation", param: {token: urlPath[2]}});
        }
        else
            this.validateToken();
    },
    computed: {
        dark() {
            return this.$store.getters["template/dark"];
        }
    },
    methods: {
        async validateToken() {
            this.validatingToken = true;

            const userData = JSON.parse(localStorage.getItem(userKey));
            this.$store.dispatch("template/setUser", userData);

            if (!userData) {
                this.validatingToken = false;
                this.$router.push({name: "auth"});
                return
            }

            let auth = new AuthDomain();
            try {
                await auth.tokenValidation();
            } catch (error) {
                localStorage.removeItem(userKey);
                this.$router.push({name: "auth"});
            }

            this.validatingToken = false;
        }
    }
}
</script>

<style>
</style>

