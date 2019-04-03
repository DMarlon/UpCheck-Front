<template>
    <v-container>
        <v-layout>
            <v-btn v-if="!expandSearch" flat dark small v-on:click="()=>{if (disabled) return searchButtomClick(); expandSearch = true}">
                <v-icon dark>search</v-icon>
            </v-btn>
            <v-expand-x-transition>
                <v-text-field clearable flat solo-inverted
                            v-model="queryOptions.term"
                            append-icon="search"
                            placeholder="Procurar..."
                            prepend-inner-icon="arrow_right_alt"
                            v-bind:prefix="prefixSearchTextFormated"
                            v-on:keyup.enter="searchClick"
                            v-on:click:prepend-inner="expandSearch = false"
                            v-on:click:append="searchClick"
                            v-on:click:clear="searchClearClick"
                            v-show="expandSearch"/>
            </v-expand-x-transition>
            <v-menu v-if="searchOptions.length > 0 && expandSearch" v-bind:close-on-content-click="true" offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn fab small v-on="on"><v-icon>list</v-icon></v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-tile v-for="(item, index) in searchOptions" :key="index" v-on:click="searchOptionClick(item)">
                            <v-list-tile-title>{{ item }}</v-list-tile-title>
                        </v-list-tile>
                        <v-divider v-if="hasSearchOptionClean"></v-divider>
                        <v-list-tile v-if="hasSearchOptionClean" v-on:click="searchOptionClearClick">
                            <v-list-tile-title>Limpar</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-menu>
        </v-layout>
    </v-container>
</template>

<script>
import QueryOptions from "@/models/QueryOptions.js"


export default {
    name: "ExpansiveSimpleTextSearch",
    props: {
        hasSearchOptionClean: {type: Boolean, default: true},
        searchOptions: {type: Array, default: ()=>[]},
        queryOptions: {type: Object, default: ()=>new QueryOptions()},
        disabled: {type: Boolean, default: false}
    },
    data() {
        return {
            expandSearch: false,
        }
    },
    computed:{
        prefixSearchTextFormated(){
            return this.queryOptions.filter + (this.queryOptions.filter == "" ? "" : ": ")
        },
    },
    methods: {
        searchButtomClick() {
            this.$emit('input', this.queryOptions);
            this.$emit("searchButtomClick", true)
        },
        searchClick(event) {
            this.$emit('input', this.queryOptions);
            this.$emit("searchClick", this.queryOptions.term)
        },
        searchClearClick() {
            this.queryOptions.term = ""
            this.$emit('input', this.queryOptions);
            this.$emit("searchClearClick", true)
        },
        searchOptionClick(item) {
            this.queryOptions.filter = item
            this.$emit('input', this.queryOptions);
            this.$emit("searchOptionClick", item)
        },
        searchOptionClearClick(item) {
            this.queryOptions.filter = ""
            this.$emit('input', this.queryOptions);
            this.$emit("searchOptionClearClick", true)
        },

    }

}
</script>

<style>

</style>
