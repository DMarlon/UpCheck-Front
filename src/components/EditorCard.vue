<template>
    <v-card>
        <v-card color="teal darken-2 font-weight-bold headline white--text" class="ml-4 mr-4" style="top: -24px; margin-bottom: -24px;">
           <v-toolbar color="teal darken-2 white--text">
                <span class="font-weight-bold headline">{{ title }}</span>
                <v-spacer/>
                <slot name="headAction"></slot>
                <v-btn v-if="hasSearch && !expandSearch" flat dark small v-on:click="()=>{ searchButtomClick(); expandSearch = true }">
                    <v-icon dark>search</v-icon>
                </v-btn>
                <v-expand-x-transition>
                    <v-text-field v-model="textSearch" v-show="expandSearch" clearable flat solo-inverted prepend-inner-icon="arrow_right_alt" append-icon="search" placeholder="Procurar..." v-on:keyup.enter="searchKeyUpEnterPress" v-on:click:prepend-inner="expandSearch = false" v-on:click:append="searchKeyUpEnterPress" v-on:click:clear="textSearch = ''"/>
                </v-expand-x-transition>
           </v-toolbar>
        </v-card>

        <slot name="body"></slot>

        <v-card-actions v-if="hasActions">
                <slot name="actions"></slot>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "EditorCard",
    props: {
        title: {type: String, default: ""},
        hasSearch: {type: Boolean, default: false},
        hasActions: {type: Boolean, default: false},
    },
    data() {
        return {
            expandSearch: false,
            textSearch: "",
        }
    },
    methods: {
        searchButtomClick() {
            this.$emit("searchButtomClick", true)
        },
        searchKeyUpEnterPress(event) {
            this.$emit("searchKeyUpEnterPress", this.textSearch)
        }
    }

}
</script>

<style>

</style>
