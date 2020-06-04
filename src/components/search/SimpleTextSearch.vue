<template>
    <div>
        <v-text-field clearable flat solo-inverted
                v-model="queryOptions.term"
                append-icon="search"
                placeholder="Procurar..."
                v-bind:prefix="prefixSearchTextFormated"
                v-on:keyup.enter="searchClick"
                v-on:click:append="searchClick"
                v-on:click:clear="searchClearClick">
        </v-text-field>
        <v-btn fab dark small color="primary">
        <v-icon dark>remove</v-icon>
        </v-btn>
    </div>
</template>

<script>
import QueryOptions from "@/models/QueryOptions.ts"

export default {
    name: "SimpleTextSearch",
    props: {
        queryOptions: {type: QueryOptions, default: ()=>new QueryOptions()},
        disabled: {type: Boolean, default: false}
    },
    computed:{
        prefixSearchTextFormated(){
            return this.queryOptions.filter + (this.queryOptions.filter == "" ? "" : ": ")
        },
    },
    methods: {
        searchClick() {
            this.$emit('input', this.queryOptions);
            this.$emit("searchClick", this.queryOptions.term)
        },
        searchClearClick() {
            this.queryOptions.term = ""
            this.$emit('input', this.queryOptions);
            this.$emit("searchClearClick", true)
        }
    }
}
</script>

<style>

</style>
