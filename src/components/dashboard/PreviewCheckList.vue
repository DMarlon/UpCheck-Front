<template>
    <v-card class="mx-auto elevation-10" color="white--text" max-width="450" max-height="300" dark v-bind:to="infos.to">
      <v-card-title class="teal darken">
         <v-icon large left>check_circle_outline</v-icon>
         <span class="title text-truncate font-weight-light">{{ infos.title }}</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold teal darken-2">{{ infos.resume }}</v-card-text>

      <v-card-actions class="teal darken">
         <v-list-tile class="grow">
            <v-list-tile-avatar>
               <Gravatar v-bind:email="infos.userEmail" alt="User"/>
         </v-list-tile-avatar>

         <v-list-tile-content class="hidden-xs-only">
            <v-list-tile-title>{{ infos.userName }}</v-list-tile-title>
         </v-list-tile-content>

         <v-icon class="mr-1">reorder</v-icon>
         <span class="subheading mr-2">{{ infos.questions }}</span>
         <span class="mr-1">·</span>
         <v-icon class="mr-1">done</v-icon>
         <span class="subheading">{{ infos.answered }}</span>
      </v-list-tile>
      </v-card-actions>
   </v-card>
</template>

<script>
import Gravatar from 'vue-gravatar';

export default {
    components: {
        Gravatar
    },
    props: {
        infos: {type: Object, required: true}
    }
}
</script>

<style>

</style>
