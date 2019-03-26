<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-if="config.haveActivation" v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on:click.prevent="openButtomClick()">
                <v-icon>{{ config.openButtomIcon}}</v-icon>
                {{ config.openButtomText }}
            </v-btn>
        </template>
      <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark v-on:click="close()"> <v-icon>close</v-icon> </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn v-if="config.haveButton" dark flat v-on:click="buttonClick()">
                    {{ config.buttonText }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <slot></slot>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "FullScreenDialogEditor",
    props: {
        dialog: {type: Boolean, required: true},
        config: {type: Object, required: true},
    },
    methods: {
        openButtomClick() {
            this.$emit("openButtomClick", true)
        },
        buttonClick() {
            this.$emit("buttonClick", true)
        },
        close() {
            this.$emit("close", true)
        }
    }

}
</script>

<style>

</style>
