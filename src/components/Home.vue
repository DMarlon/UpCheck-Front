<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="item in mocklist" v-bind:key="item.title">
         <PreviewCheckList v-bind:infos="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PreviewCheckList from "@/components/dashboard/PreviewCheckList.vue"
export default {
   components: {
      PreviewCheckList
   },
   data(){
      return {
         mocklist: [
            {
               title: "Conferir Layout",
               resume: "Fazer a conferencia do layout da aplicação para garantir que a mesma seja usua.",
               userEmail: "marlon.d@outlook.com",
               userName: "Marlon Dauernheimer",
               questions: 86,
               answered: 56,
               to: {name: 'about'}
            },
            {
               title: "Conferir Cores",
               resume: "Conferir as corres do sistema para ver se a mesma esta de acordo entre todos",
               userEmail: "marlon.d@outlook.com",
               userName: "Paulo Klaus",
               questions: 136,
               answered: 23,
               to: {name: 'about'}
            },
            {
               title: "Ganhar dinheiro",
               resume: "Fazer o sistema de um forma que todos ganham muito dinheiro.",
               userEmail: "marlon.d@outlook.com",
               userName: "Luis Fernando Kaifer",
               questions: 182,
               answered: 136,
               to: {name: 'about'}
            },
            {
               title: "Teste",
               resume: "Testar para ver se esta fazendo a quebra de texto conforme o esperado pelo menu",
               userEmail: "marlon.d@outlook.com",
               userName: "Marlon Dauernheimer",
               questions: 165,
               answered: 36,
               to: {name: 'about'}
            },
         ]
      }
   }

}
</script>

<style>

</style>
