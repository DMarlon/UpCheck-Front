<template>
    <Loading v-if="gettingInformations" v-bind:text="loadingText" />
    <v-container v-else grid-list-xl>
        <v-layout  column wrap>
            <v-flex xs12 sm12 md12>
                <v-card>
                    <v-card color="teal darken-2 font-weight-bold headline white--text" class="ml-4 mr-4" style="top: -24px; margin-bottom: -24px;">
                        <v-card-title><span>Meus times</span></v-card-title>
                    </v-card>
                    <v-layout row wrap class="ma-1">
                        <v-flex xs12 sm6 md4 v-for="item in myTeams" v-bind:key="item.title">
                            <PreviewTeamList v-bind:team="item" />
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout column wrap class="mt-4">
            <v-flex xs12 sm12 md12>
                <v-card>
                    <v-card color="teal darken-2 font-weight-bold headline white--text" class="ml-4 mr-4" style="top: -24px; margin-bottom: -24px;">
                        <v-card-title><span>Times participantes</span></v-card-title>
                    </v-card>
                    <v-layout row wrap class="ma-1">
                        <v-flex xs12 sm6 md4 v-for="item in participantTeams" v-bind:key="item.title">
                            <PreviewTeamList v-bind:team="item" />
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-dialog v-model="showDialog" persistent max-width="600px">
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
                                <v-text-field v-bind:disabled="savingTeam" v-model="dialogTeam.name" label="Nome do time"/>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-alert :value="dialogTeam.notify.show" :type="dialogTeam.notify.type">{{ dialogTeam.notify.message }}</v-alert>
                                <v-progress-linear v-show="savingTeam" color="teal darken-1" v-bind:indeterminate="true"/>
                                <v-layout column align-end>
                                    <div>
                                        <v-btn v-bind:disabled="savingTeam" flat @click="createTeam()" color="teal darken">Salvar</v-btn>
                                        <v-btn v-bind:disabled="savingTeam" flat @click="()=>{showDialog = false; cleanDialogTeam()}" color="teal darken">Cancelar</v-btn>
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
import Loading from "@/components/Loading.vue"
import PreviewTeamList from "@/components/team/PreviewTeamList.vue"
import { setTimeout } from 'timers';
export default {
    components: {
        Loading,
        PreviewTeamList
    },
    created(){
        this.getTeams();
    },
    data(){
        return {
            loadingText: "Carregando informações dos times, aguarde...",
            showDialog: false,
            savingTeam: false,
            gettingInformations: true,
            myTeams: [],
            participantTeams: [],
            dialogTeam: {
                name: "",
                notify: {
                    type: "error",
                    message: "",
                    show: false
                },
            }
        }
    },
    methods: {
        async getTeams() {
            this.gettingInformations = true

            this.myTeams = [];
            this.participantTeams = [];

            const response = await this.$http.get("teams")
            .then(response => {
                if (response.data.data && response.data.data.myTeams && Array.isArray(response.data.data.myTeams)){
                    this.myTeams = response.data.data.myTeams.map(item => {
                        return { name: item.name,
                                 userEmail: this.$store.getters["template/userEmail"],
                                 userName: this.$store.getters["template/userFirstName"] + " " + this.$store.getters["template/userLastName"],
                                 settings: true,
                                 settingsRoute: {name: 'home'},
                                 to: {name: 'about'}
                                }
                    });
                }

                if (response.data && response.data.data.participantTeams && Array.isArray(response.data.data.participantTeams)){
                    this.participantTeams = response.data.data.participantTeams.map(item => {
                        return { name: item.name,
                                 userEmail: this.$store.getters["template/userEmail"],
                                 userName: this.$store.getters["template/userFirstName"] + " " + this.$store.getters["template/userLastName"],
                                 settings: true,
                                 settingsRoute: {name: 'home'},
                                 to: {name: 'about'}
                                }
                    });
                }

            })
            .catch(error => {
                    console.log("ver o que fazer")
            });

            this.gettingInformations = false;
        },
        async createTeam() {
            this.savingTeam = true
            let teamName = this.dialogTeam.name

            const response = await this.$http.post("teams", {name: teamName})
            .then(response => {
                this.savingTeam = false
                this.showDialog = false
                this.cleanDialogTeam()
                this.getTeams()

            })
            .catch(error => {
                this.savingTeam = false
                this.dialogTeam.notify.type = "error"
                this.dialogTeam.notify.message = error.response.data.message
                this.dialogTeam.notify.show = true
            });
        },
        cleanDialogTeam() {
            this.dialogTeam.name = "";
            this.dialogTeam.notify.type="error"
            this.dialogTeam.notify.message = ""
            this.dialogTeam.notify.show = false
        }
    }
}
</script>

<style>

</style>
