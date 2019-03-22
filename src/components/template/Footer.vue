<template>
    <v-footer app>
        <span class="px-3">{{ text }}</span>
    </v-footer>
</template>

<script>
export default {
    name: "Footer",
    props: {
        text: {type: String, default: ""}
    }
}
</script>

<style>
</style>
