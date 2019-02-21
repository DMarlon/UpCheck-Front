<template>
    <v-menu v-if="isMenuVisible" v-bind:close-on-content-click="false" v-bind:nudge-width="200" offset-x>
            <v-btn icon slot="activator">
                <v-icon>account_circle</v-icon>
            </v-btn>
            <v-card>
                <v-list>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <Gravatar :email="userEmail" alt="User"/>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ userFirstName }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ userLastName }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-switch v-model="dark" color="teal darken-1"></v-switch>
                        </v-list-tile-action>
                        <v-list-tile-title>Thema</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile active-class="default-class teal darken-1 white--text" v-on:click="logout()">
                        <v-list-tile-action>
                            <v-icon>exit_to_app</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-menu>
</template>

<script>
import { userKey } from '@/constants.js';
import Gravatar from 'vue-gravatar';

export default {
    name: "UserMenu",
    components: {
        Gravatar
    },
    computed: {
        isMenuVisible() {
            return this.$store.getters["template/isMenuVisible"]
        },
        userFirstName() {
            return this.$store.getters["template/userFirstName"]
        },
        userLastName() {
            return this.$store.getters["template/userLastName"]
        },
        userEmail() {
            return this.$store.getters["template/userEmail"]
        },
        dark:{
            get() {
                return this.$store.getters["template/dark"];
            },
            set(value) {
                return this.$store.dispatch("template/setDark", value);

            }
        },
    },
    methods: {

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
