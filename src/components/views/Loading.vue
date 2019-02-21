<template>
    <v-content >
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-img v-bind:max-height="80" v-bind:max-width="80" v-bind:src="require('@/assets/loading.gif')"/>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
export default {
    name: "Loading"

}
</script>

<style>

</style>
