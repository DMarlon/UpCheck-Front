<template>
    <v-card>
        <v-card color="primary darken-2 font-weight-bold headline white--text" class="ml-4 mr-4" style="top: -24px; margin-bottom: -24px;">
           <v-toolbar color="primary darken-2 white--text" :prominent="true">
                <v-toolbar-title class="font-weight-bold headline">{{ title }}</v-toolbar-title>
                <v-spacer/>
                <v-toolbar-items >
                    <slot name="headAction"></slot>
                </v-toolbar-items>
           </v-toolbar>
        </v-card>

        <slot name="body"></slot>

        <v-card-actions>
                <slot name="actions"></slot>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "EditorCard",
    props: {
        title: {type: String, default: ""},
    }
}
</script>

<style>

</style>



