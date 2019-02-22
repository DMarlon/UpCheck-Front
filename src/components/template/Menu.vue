<template>
    <v-navigation-drawer v-model="showMenu" :clipped="true" overflow app>
        <v-list dense class="pt-0">
            <v-list-tile exact active-class="default-class teal darken-1 white--text" v-for="item in items" :key="item.title" v-bind:to="item.to">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
      </v-list>
     </v-navigation-drawer>
</template>

<script>
export default {
    name: "Menu",
    data () {
        return {
            items: [
                { title: 'Home', icon: 'dashboard', to: {name: 'home'} },
                { title: 'About', icon: 'question_answer', to: {name: 'about'} }
            ]
        }
    },
    computed: {
        showMenu: {
            get() {
                return this.$store.getters["template/showMenu"]
            },
            set(value) {
                this.$store.dispatch("template/setShowMenu", value);
            }
        }
    }
}
</script>

<style>

</style>
