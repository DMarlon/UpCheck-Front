<template>
    <v-toolbar app height="45" dark color="primary">
        <v-toolbar-side-icon class="hidden-lg-and-up" v-if="isMenuVisible" v-on:click.stop="showMenu()"/>
        <v-toolbar-title class="white--text header-title-upcheck">{{ pageTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <UserMenu />
    </v-toolbar>
</template>

<script>
import UserMenu from '@/components/template/UserMenu.vue';

export default {
    name: "Header",
    components: {
        UserMenu
    },
    computed: {
        isMenuVisible() {
            return this.$store.getters["template/isMenuVisible"]
        },
        pageTitle() {
            return this.$store.getters["template/pageTitle"]
        }
    },
    methods: {
        showMenu() {
            this.$store.dispatch("template/setShowMenu", !this.$store.getters["template/showMenu"])
        }
     }
}
</script>

<style>
    .header-title-upcheck{
        text-shadow:
            1px 1px 1px #000;
    }
</style>
