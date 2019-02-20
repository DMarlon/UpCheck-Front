<template>
    <v-content >
        <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <router-view>
                <slot></slot>
            </router-view>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
export default {
    name: "Content"
}
</script>

<style>

</style>
