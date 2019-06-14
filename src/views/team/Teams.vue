<template>
    <div>
        <v-tabs centered color="secondary" dark>
            <v-tab href="#tab1">Favoritos</v-tab>
            <v-tab href="#tab2">Meus times</v-tab>
            <v-tab href="#tab3">Outros times</v-tab>
        </v-tabs>

        <v-progress-linear v-show="searchTeam" mt-0 v-bind:indeterminate="true"/>

        <v-layout justify-center mt-3>
            <v-flex xs11 sm4 xl2>
                <v-text-field label="Procurar" clearable></v-text-field>
            </v-flex>
        </v-layout>

        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 v-for="item in myTeams" v-bind:key="item.title">
                    <PreviewTeamList v-bind:disabled="searchTeam" v-bind:team="item" v-on:settingsClick="openSettings($event)"/>
                </v-flex>
            </v-layout>
        </v-container>

        <v-tooltip left>
            <v-btn v-on="on" fab dark fixed bottom right>
                <v-icon>add</v-icon>
            </v-btn>
            <span>Adicionar novo Time!</span>
        </v-tooltip>
    </div>
</template>

<script>
import Grid from "@/components/Grid.vue"
import Team from "@/views/team/Team.vue"
import EditorCard from "@/components/EditorCard.vue"
import PreviewTeamList from "@/components/team/PreviewTeamList.vue"
import FullScreenDialogEditor from "@/components/FullScreenDialogEditor.vue"
import ExpansiveSimpleTextSearch from "@/components/search/ExpansiveSimpleTextSearch.vue"

import Notify from "@/models/Notify.ts"
import TeamDomain from "@/domains/team/TeamDomain.ts"
import QueryOptions from "@/models/QueryOptions.ts"

export default {
    components: {
        Grid,
        Team,
        EditorCard,
        PreviewTeamList,
        FullScreenDialogEditor,
        ExpansiveSimpleTextSearch
    },
    data(){
        return {
            searchTeam: false,
            savingTeam: false,
            myTeams: [],
            myTeamsSearchOptions: ["Nome", "Status"],
            participantTeams: [],
            queryOptions: new QueryOptions(),
            dialogCreateTeam: {
                showDialog: false,
                name: "",
                notify: new Notify()
            },
            dialogEditTeam: {
                showDialog: false,
                editTeam: {hash: ""},
                configDialogEditTeam: {
                    haveActivation: false,
                    openButtomText: "Abrir",
                    openButtomIcon: "settings",
                    haveButton: false,
                    buttonText: ""
                },
            }
        }
    },
    created(){
        this.getMyTeams();
        this.$store.dispatch("template/setPageTitle", "Times");
    },
    methods: {
        async getMyTeams() {
            this.searchTeam = true;
            this.myTeams = [];

            let team = new TeamDomain();
            try {
                this.myTeams = await team.search(this.queryOptions, true);
            } catch (error) {
                console.log("ver o que fazer", error);
            }

            this.searchTeam = false;

        },
        async createTeam() {
            this.savingTeam = true

            let team = new TeamDomain();
            try {
                await team.create(this.dialogCreateTeam.name);
                this.cleanDialogCreateTeam()
                this.getMyTeams();

            } catch (error) {
                this.dialogCreateTeam.notify.type = error.status
                this.dialogCreateTeam.notify.message = error.message
                this.dialogCreateTeam.notify.show = true
            }

            this.savingTeam = false
        },
        cleanDialogCreateTeam() {
            this.dialogCreateTeam.name = "";
            this.dialogCreateTeam.showDialog = false;
            this.dialogCreateTeam.notify = new Notify();
        },
        openSettings(team) {
            this.dialogEditTeam.editTeam = team;
            this.dialogEditTeam.showDialog = true;

        },
        closeDialogEditTeam(closed){
            this.dialogEditTeam.editTeam = {hash: ""},
            this.dialogEditTeam.showDialog = !closed
            this.getMyTeams();
        },
        search() {
            this.getMyTeams();
        }
    }
}
</script>

<style>

</style>
