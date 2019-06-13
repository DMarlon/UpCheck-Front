<template>
    <v-navigation-drawer v-model="showMenu" :clipped="false" overflow app>
        <v-list dense class="pt-0">
            <v-list-tile exact active-class="default-class" v-for="item in items" :key="item.title" v-bind:to="item.to">
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
                { title: 'Início', icon: 'style', to: {name: 'home'} },
                { title: 'Sobre', icon: 'question_answer', to: {name: 'about'} },
                { title: 'Times', icon: 'dashboard', to: {name: 'teams'} }
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
