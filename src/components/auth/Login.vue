<template>
    <v-container class="auth-teste" style="background: linear-gradient(to top, #44a08d, #093637);" fluid fill-height>
        <v-layout  align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="teal darken-1">
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="formAuth">
                            <v-text-field v-if="!haveRegister" v-model.trim="user.name" v-bind:rules="nameRules" prepend-icon="person" name="name" label="Nome Completo" type="Nome"/>
                            <v-text-field v-model.trim="user.email" v-bind:rules="emailRules" prepend-icon="alternate_email" name="email" label="E-mail" type="text"/>
                            <v-text-field v-model.trim="user.password" prepend-icon="lock" name="password" label="Senha" id="password" type="password"/>
                    <v-text-field v-if="!haveRegister" v-bind:rules="passwordConfirm" prepend-icon="lock" name="password_confirm" label="Confirme a Senha" id="password_confirm" type="password"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn v-if="haveRegister" v-on:click="login()" class="white--text" color="teal darken-1">Entrar</v-btn>
                        <v-btn v-else v-on:click="register()" class="white--text" color="teal darken-1">Cadastrar</v-btn>
                    </v-card-actions>
                    <v-toolbar dark color="teal darken-1">
                        <a style="color: inherit" v-show="haveRegister" v-on:click="changeRegister(false)">Não tem cadastro? <strong>Cadastre-se!</strong></a>
                        <a style="color: inherit" v-show="!haveRegister" v-on:click="changeRegister(true)">Já tem cadastro? <strong>Entre!</strong></a>
                    </v-toolbar>
                </v-card>
                <v-alert :value="notify.show" :type="notify.type">{{ notify.message }}</v-alert>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: "Login",
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: ""
            },
            notify: {
                show: false,
                type: "error",
                message: ""
            },
            haveRegister: true,
        }
    },
    computed: {
        nameRules() {
            const rules = []
            rules.push(v => (v || "").indexOf(" ") > 0 || "Digite o nome completo!");
            return rules;
        },
        emailRules() {
            const rules = []
            rules.push(v => (v || "") != "" || "E-mail é obrigatorio!");
            rules.push(v =>  /.+@.+\.{1,}.+/.test((v || "")) || "E-mail invalido!");
            return rules;
        },
        passwordConfirm() {
            const rules = []
            rules.push(v => (!!v && v) === this.user.password || "As senhas não conferem!");
            return rules;
        },

    },
    methods: {
        changeRegister(haveRegister) {
            this.haveRegister = haveRegister
            this.notify.show = false
            this.notify.message = ""
        },
        login() {
            if (!this.$refs.formAuth.validate())
                return

            this.$http.get("login", {headers: {"Authorization": "Basic " + btoa(this.user.email + ":" + this.user.password)}})
                .then(responde => {
                    this.notify.message= ""
                    this.notify.show=false
                    this.resetData()
                })
                .catch(error => {
                    this.notify.type="error"
                    this.notify.message= error.response.data.message
                    this.notify.show=true
                });


        },
        register() {
            if (!this.$refs.formAuth.validate())
                return

            this.$http.post("login/create", {...this.user})
                .then(responde => {
                    this.notify.type="success"
                    this.notify.message= "Cadastro efetuado com sucesso!"
                    this.notify.show=true
                    this.haveRegister = true;
                })
                .catch(error => {
                    this.notify.type="error"
                    this.notify.message= error.response.data.message
                    this.notify.show=true
                });
        },
        resetData() {
            Object.assign(this.$data, this.$options.data.apply(this))
        }
    }
}
</script>

<style>

</style>
