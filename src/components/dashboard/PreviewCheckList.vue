<template>
   <v-card hover class="fill-height overflow-hidden" dark v-bind:to="infos.to">
      <v-card-title class="primary darken">
         <span class="title text-truncate">
            <v-icon large left>check_circle_outline</v-icon>
            <span>{{ infos.title }}</span>
         </span>
      </v-card-title>

      <v-card-text class=" headline font-weight-bold primary darken-2">{{ infos.resume }}</v-card-text>

      <v-card-actions class="primary darken overflow-hidden">
         <v-list-tile class="grow">
            <v-list-tile-avatar>
               <Gravatar v-bind:email="infos.userEmail" alt="User"/>
            </v-list-tile-avatar>

            <v-list-tile-content class="hidden-md-and-down">
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
