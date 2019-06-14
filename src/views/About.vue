<template>
    <v-container fluid>
        <h1 class="display-4 text-xs-center muted">Sobre o UpCheck</h1>
    </v-container>
</template>

<script>
export default {
    created(){
        this.$store.dispatch("template/setPageTitle", "Sobre");
    }
}
</script>

<style>

</style>

