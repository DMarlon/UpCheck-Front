<template>
    <v-toolbar app height="45" dark color="primary">
        <v-toolbar-side-icon class="hidden-lg-and-up" v-if="isMenuVisible" v-on:click.stop="showMenu()"/>
        <v-toolbar-title v-if="$route.meta.havePageTitle" class="white--text header-title-upcheck"> {{ $route.meta.pageTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <SimpleTextSearch/>
        <UserMenu />
    </v-toolbar>
</template>

<script>
import UserMenu from '@/components/template/UserMenu.vue';
import SimpleTextSearch from '@/components/search/SimpleTextSearch.vue';

export default {
    name: "Header",
    components: {
        UserMenu,
        SimpleTextSearch
    },
    computed: {
        isMenuVisible() {
            return this.$store.getters["template/isMenuVisible"]
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
