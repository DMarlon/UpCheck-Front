<template>
    <v-content >
        <v-container fluid fill-height>
            <v-layout column align-center justify-center>
                <v-progress-circular :size="90" :width="7" color="primary darken-2" indeterminate />
                <span class="mt-4 font-weight-bold headline">{{ text }}</span>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
export default {
    name: "Loading",
    props: {
        text: {type: String, default: "Aguarde..."},
    }
}
</script>

<style>

</style>
