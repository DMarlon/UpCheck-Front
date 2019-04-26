<template>
    <v-container grid-list-xl>
        <v-layout>
            <v-flex>
                <EditorCard title="Meus times">
                    <template v-slot:headAction>
                        <ExpansiveSimpleTextSearch
                            v-model="queryOptions"
                            v-bind:disabled="searchTeam"
                            v-bind:searchOptions="myTeamsSearchOptions"
                            v-on:searchClick="search()"
                        />
                    </template>

                    <template v-slot:body>
                        <v-layout row wrap class="ma-1" >
                            <v-flex xs12 sm6 md4 v-for="item in myTeams" v-bind:key="item.title">
                                <PreviewTeamList v-bind:disabled="searchTeam" v-bind:team="item" v-on:settingsClick="openSettings($event)"/>
                            </v-flex>
                            <v-progress-linear v-show="searchTeam" color="teal darken-1" v-bind:indeterminate="true"/>
                        </v-layout>
                    </template>

                    <template v-slot:actions v-if="myTeams.length >= 6">
                        <v-spacer/>
                        <v-btn color="primary" small flat>Buscar mais</v-btn>
                    </template>
                </EditorCard>
            </v-flex>
        </v-layout>

        <v-layout column wrap class="mt-4">
            <v-flex>
                <EditorCard title="Times que participo">
                        <template v-slot:body>
                            <v-layout row wrap class="ma-1">
                                <v-flex xs12 sm6 md4 v-for="item in participantTeams" v-bind:key="item.title">
                                    <PreviewTeamList v-bind:team="item" />
                                </v-flex>
                            </v-layout>
                        </template>
                </EditorCard>
            </v-flex>
        </v-layout>

        <FullScreenDialogEditor v-bind:dialog="dialogEditTeam.showDialog" v-bind:config="dialogEditTeam.configDialogEditTeam" v-on:close="closeDialogEditTeam($event)">
            <v-content >
                <v-container fluid fill-height>
                    <Team :team_hash="dialogEditTeam.editTeam.hash"/>
                </v-container>
            </v-content>
        </FullScreenDialogEditor>

        <v-layout row>
            <v-dialog v-model="dialogCreateTeam.showDialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-tooltip left>
                    <v-btn v-on="on" fab dark fixed bottom right slot="activator" color="teal darken">
                        <v-icon>add</v-icon>
                    </v-btn>
                    <span>Adicionar novo Time!</span>
                    </v-tooltip>

                </template>
                <v-card>
                    <v-card-title class="teal darken">
                        <span class="headline font-weight-bold white--text">Novo Time</span>
                    </v-card-title>
                    <v-card-text>
                        <v-layout  wrap>
                            <v-flex>
                                <v-text-field v-bind:disabled="savingTeam" v-model="dialogCreateTeam.name" label="Nome do time"/>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-alert :value="dialogCreateTeam.notify.show" :type="dialogCreateTeam.notify.type">{{ dialogCreateTeam.notify.message }}</v-alert>
                                <v-progress-linear v-show="savingTeam" color="teal darken-1" v-bind:indeterminate="true"/>
                                <v-layout column align-end>
                                    <div>
                                        <v-btn v-bind:disabled="savingTeam" flat @click="createTeam()" color="teal darken">Salvar</v-btn>
                                        <v-btn v-bind:disabled="savingTeam" flat @click="()=>{dialogCreateTeam.showDialog = false; cleanDialogCreateTeam()}" color="teal darken">Cancelar</v-btn>
                                    </div>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
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
        Team,
        EditorCard,
        PreviewTeamList,
        FullScreenDialogEditor,
        ExpansiveSimpleTextSearch
    },
    created(){
        this.getMyTeams();
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
    methods: {
        async getMyTeams() {
            this.searchTeam = true
            this.myTeams = [];

            let team = new TeamDomain();
            try {
                this.myTeams = await team.search(this.queryOptions);
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
