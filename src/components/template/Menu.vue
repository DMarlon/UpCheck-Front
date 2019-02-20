<template>
    <v-navigation-drawer v-model="showMenu" :clipped="true" absolute overflow app>
        <v-list dense class="pt-0">
            <v-list-tile v-for="item in items" :key="item.title" @click="showAlert(item)">
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
                { title: 'Home', icon: 'dashboard' },
                { title: 'About', icon: 'question_answer' }
            ]
        }
    },
    methods: {
        showAlert(item) {
            alert(`click ${item.title} `);
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
