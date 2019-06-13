<template>
    <v-container fluid :class="`grid-list-${gridSize}`">
        <v-layout row wrap>
            <slot></slot>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: "Grid",
    props: {
        gridSize: {
            type: String,
            default: "xl"
        },
        gridOrientation: {
            type: String,
            default: "row"
        }
    }
}
</script>

<style>

</style>
