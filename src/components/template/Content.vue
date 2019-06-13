<template>
    <v-content>
<!--
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <slot></slot>
            </v-layout>
        </v-container>
-->
        <router-view>
        </router-view>
    </v-content>
</template>

<script>
export default {
    name: "Content"
}
</script>

<style>
</style>
