<template>
    <v-navigation-drawer v-model="showMenu" :mini-variant="miniMenu" overflow app>
        <v-list class="pa-1">
            <v-list-tile v-if="miniMenu" @click.stop="miniMenu = !miniMenu">
                <v-list-tile-action>
                    <v-icon>chevron_right</v-icon>
                </v-list-tile-action>
            </v-list-tile>

            <v-list-tile avatar tag="div">
                <v-list-tile-avatar>
                    <img :src="require('../../assets/logoUP.png')">
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title class="white--text header-title-upcheck"><span class="font-weight-black">UP</span>CHECK</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-btn icon @click.stop="miniMenu = !miniMenu">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>

        <v-divider></v-divider>
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
        },
        miniMenu: {
            get() {
                return this.$store.getters["template/miniMenu"]
            },
            set(value) {
                this.$store.dispatch("template/setMiniMenu", value);
            }
        }
    }
}
</script>

<style>

</style>
