<template>
    <v-toolbar :clipped-left="true" app absolute>
        <v-toolbar-side-icon v-if="isMenuVisible" v-on:click.stop="showMenu()"/>
        <v-toolbar-title>UP<strong>CHECK</strong></v-toolbar-title>
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

</style>
