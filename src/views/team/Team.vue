<template>
    <Loading v-if="gettingInformations" v-bind:text="loadingText" />
    <v-container v-else>
        <EditorCard v-bind:title="`Time ${team.name} `" v-bind:hasActions="true">
            <template v-slot:headAction>
                <v-btn dark v-bind:disabled="waitRequest" v-on:click="deleteTeam()" flat class="mr-0">
                    <v-icon>delete_forever</v-icon>
                </v-btn>
            </template>

            <template v-slot:body>
                <v-container>
                    <v-text-field v-model="team.name" v-bind:disabled="waitRequest" prepend-icon="bookmark" label="Nome do time"/>
                    <v-text-field v-model="team.owner" v-bind:disabled="waitRequest" prepend-icon="alternate_email" label="Responsavel pelo time"/>
                    <v-alert :value="notify.show" :type="notify.type">{{ notify.message }}</v-alert>
                    <v-progress-linear v-show="waitRequest" color="teal darken-1" v-bind:indeterminate="true"/>
                </v-container>
            </template>

            <template v-slot:actions>
                <v-switch v-model="team.status_toggle" v-bind:disabled="waitRequest" :label="team.status.text" v-on:change="changeStatus($event)" class="ml-3" color="teal darken-1"/>
                <v-spacer/>
                <v-btn v-bind:disabled="waitRequest" v-on:click="saveTeam()" color="primary" flat>Salvar</v-btn>
                <v-btn v-bind:disabled="waitRequest" v-on:click="()=>{cleanNotify(); getTeam()}" color="primary" flat>Cancelar</v-btn>
            </template>
        </EditorCard>

    </v-container>
</template>

<script>
import Loading from "@/components/Loading.vue"
import EditorCard from "@/components/EditorCard.vue"

import {statusArray } from "@/constants.js"

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
            team: {
                    name: "",
                    owner: "",
                    hash: "",
                    status_toggle: false,
                    status: statusArray[0]
                },
            notify: {
                    type: "error",
                    message: "",
                    show: false
                },
        }
    },
    watch: {
        team_hash(hash) {
            if (hash && hash != "")
                this.getTeam(hash);
        },
    },
    methods: {
        getTeam() {
            this.gettingInformations = true

            this.$http.get("teams/"+this.team_hash)
            .then(response => {
                if (response.data.data && response.data.data){
                    this.team = {
                        name: response.data.data.name,
                        owner: this.$store.getters["template/userEmail"],
                        hash: response.data.data.hash,
                        status: statusArray[response.data.data.status],
                        status_toggle: statusArray[response.data.data.status].value == 1
                    }
                }
            })
            .catch(error => {
                this.cleanTeam()
            })
            .finally(() => {
                this.gettingInformations = false
            });
        },
        saveTeam() {
            let myTeam = {
                    name: this.team.name,
                    email: this.team.owner,
                    status: this.team.status.value,
                    hash: this.team.hash
            };

            this.waitRequest = true

            this.$http.put("teams/"+this.team_hash, {...myTeam})
            .then(response => {
                this.notify.type = "success"
                this.notify.message = response.data.message
                this.notify.show = true
            })
            .catch(error => {
                this.notify.type = "error"
                this.notify.message = error.response.data.message
                this.notify.show = true
            })
            .finally(() => {
                this.getTeam()
                this.waitRequest = false
            });
        },
        deleteTeam(){
            this.waitRequest = true

            this.$http.delete("teams/"+this.team_hash)
            .then(response => {
                this.cleanTeam()
                this.notify.type = "success"
                this.notify.message = response.data.message
                this.notify.show = true
            })
            .catch(error => {
                this.getTeam()
                this.notify.type = "error"
                this.notify.message = error.response.data.message
                this.notify.show = true
            })
            .finally(() => {
                this.waitRequest = false
            });
        },
        changeStatus(valor) {
            this.team.status = valor ? statusArray[1] : statusArray[0]
        },
        cleanTeam() {
            this.team = {
                        name: "",
                        owner: "",
                        hash: "",
                        status_toggle: false,
                        status: statusArray[0]
                    }
        },
        cleanNotify() {
            this.notify.type="error"
            this.notify.message = ""
            this.notify.show = false
        },
    }
}
</script>

<style>

</style>
