<template>
    <v-container fluid fill-height>
        <Loading v-if="gettingInformations" v-bind:text="loadingText" />
        <v-layout v-else align-center justify-center>
            <EditorCard v-bind:title="`Time ${team.name}`">
                <template v-slot:headAction>
                    <v-btn dark v-bind:disabled="waitRequest" v-on:click="deleteTeam()" flat class="mr-0">
                        <v-icon>delete_forever</v-icon>
                    </v-btn>
                </template>

                <template v-slot:body>
                    <v-container>
                        <v-text-field v-model="team.name" v-bind:disabled="waitRequest" prepend-icon="bookmark" label="Nome do time"/>
                        <v-text-field v-model="team.user.email" v-bind:disabled="waitRequest" prepend-icon="alternate_email" label="Responsavel pelo time"/>
                        <v-alert :value="notify.show" :type="notify.type">{{ notify.message }}</v-alert>
                        <v-progress-linear v-show="waitRequest" v-bind:indeterminate="true"/>
                    </v-container>
                </template>

                <template v-slot:actions>
                    <v-switch v-model="status_toggle" v-bind:disabled="waitRequest" :label="team.status.text" v-on:change="changeStatus($event)" class="ml-3 text-capitalize"/>
                    <v-spacer/>
                    <v-btn v-bind:disabled="waitRequest" v-on:click="saveTeam()" flat>Salvar</v-btn>
                    <v-btn v-bind:disabled="waitRequest" v-on:click="()=>{cleanNotify(); getTeam()}" flat>Cancelar</v-btn>
                </template>
            </EditorCard>
        </v-layout>
    </v-container>
</template>

<script>
import Loading from "@/components/Loading.vue"
import EditorCard from "@/components/EditorCard.vue"

import Notify from "@/models/Notify.ts"
import TeamModel from "@/models/team/TeamModel.ts"
import TeamDomain from "@/domains/team/TeamDomain.ts"
import {statusOptions } from "@/constants.ts"

export default {
    components: {
        Loading,
        EditorCard,
    },
    props: {
        team_hash: {type: String, required: true}
    },
    data(){
        return {
            loadingText: "Carregando informações do time, aguarde...",
            waitRequest: false,
            gettingInformations: false,
            status_toggle: false,
            team: new TeamModel(),
            notify: new Notify(),
        }
    },
    watch: {
        team_hash(hash) {
            if (hash && hash != "") {
                this.getTeam(hash);
                this.notify = new Notify();
            }
        },
    },
    methods: {
        showMessage(show, response) {
            this.notify.show = show;
            this.notify.type = response.status;
            this.notify.message = response.message;
        },
        async getTeam() {
            this.gettingInformations = true

            let teamDomain = new TeamDomain();
            try {
                this.team = await teamDomain.get(this.team_hash);
                this.status_toggle = this.team.status.value == statusOptions[1].value;
            }
            catch (error) {
                this.cleanTeam();
            }

            this.gettingInformations = false;
        },
        async saveTeam() {
            this.waitRequest = true

            let response;
            let teamDomain = new TeamDomain();
            try {
                response = await teamDomain.edit(this.team);
            }
            catch (error) {
                response = error;
            }

            this.showMessage(true, response);
            this.getTeam()
            this.waitRequest = false

        },
        async deleteTeam(){
            this.waitRequest = true

            let response;
            let teamDomain = new TeamDomain();
            try {
                response = await teamDomain.delete(this.team.hash);
                this.cleanTeam();
            }
            catch (error) {
                response = error;
                this.getTeam();
            }
            this.showMessage(true, response);
            this.waitRequest = false;
        },
        changeStatus(valor) {
            this.team.status = valor ? statusOptions[1] : statusOptions[0]
        },
        cleanTeam() {
            this.team = new TeamModel();
            this.showMessage(false, {type:"", message: ""});
        },
    }
}
</script>

<style>

</style>
