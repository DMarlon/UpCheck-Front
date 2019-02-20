<template>
    <v-toolbar :clipped-left="true" app absolute>
        <v-toolbar-side-icon v-if="isMenuVisible" v-on:click.stop="showMenu()"/>
        <v-toolbar-title>UP<strong>CHECK</strong></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon v-if="isMenuVisible">account_box</v-icon>
        <v-toolbar-title v-if="isMenuVisible" v-on:click.stop="logout">{{ userFirstName }}</v-toolbar-title>
    </v-toolbar>
</template>

<script>
import { userKey } from '@/constants.js';

export default {
    name: "Header",
    computed: {
        isMenuVisible() {
            return this.$store.getters["template/isMenuVisible"]
        },
        userFirstName() {
            return this.$store.getters["template/userFirstName"]
        }
    },
    methods: {
        showMenu() {
            this.$store.dispatch("template/setShowMenu", !this.$store.getters["template/showMenu"])
        },
        logout() {
            localStorage.removeItem(userKey);
            this.$store.dispatch("template/setUser", null);
            this.$router.push({name: "auth"});
        }
     }
}
</script>

<style>

</style>
