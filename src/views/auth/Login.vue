<template>
    <v-flex xs12 sm8 md4>
        <v-card :light="true" class="elevation-12">
            <v-toolbar dark color="teal darken-1">
                <v-toolbar-title><span v-if="!showSignup">Novo </span>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form ref="formAuth">
                    <v-text-field color="none" v-bind:disabled="loading" v-if="!showSignup" v-model.trim="user.name" v-bind:rules="nameRules" prepend-icon="person" name="name" label="Nome Completo" type="Nome"/>
                    <v-text-field color="none" v-bind:disabled="loading" v-model.trim="user.email" v-bind:rules="emailRules" prepend-icon="alternate_email" name="email" label="E-mail" type="text"/>
                    <v-text-field color="none" v-bind:disabled="loading" v-model.trim="user.password" prepend-icon="lock" name="password" label="Senha" id="password" type="password"/>
                    <v-text-field color="none" v-bind:disabled="loading" v-if="!showSignup" v-bind:rules="passwordConfirm" prepend-icon="lock" name="password_confirm" label="Confirme a Senha" id="password_confirm" type="password"/>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-layout column align-end>
                            <div>
                                <v-btn v-bind:disabled="loading" v-if="showSignup" v-on:click="login()" class="white--text" color="teal darken-1">Entrar</v-btn>
                                <v-btn v-bind:disabled="loading" v-else v-on:click="register()" class="white--text" color="teal darken-1">Cadastrar</v-btn>
                            </div>
                        </v-layout>
                        <v-progress-linear v-show="loading" color="teal darken-1" v-bind:indeterminate="true"/>
                    </v-flex>
                </v-layout>
            </v-card-actions>
            <v-toolbar dark color="teal darken-1">
                <a style="color: inherit" v-show="showSignup" v-on:click="!loading && changeRegister(false)">Não tem cadastro? <strong>Cadastre-se!</strong></a>
                <a style="color: inherit" v-show="!showSignup" v-on:click="!loading && changeRegister(true)">Já tem cadastro? <strong>Entre!</strong></a>
            </v-toolbar>
        </v-card>
        <v-alert :value="notify.show" :type="notify.type">{{ notify.message }}</v-alert>
    </v-flex>
</template>

<script>
import { userKey } from '@/constants.js';

export default {
    name: "Login",
    props: {
        token: {type: String, required: false}
    },
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
            showSignup: true,
            loading: false,
        }
    },
    beforeMount(){
        if (this.token)
            this.accountActivation(this.token);
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
            rules.push(v =>  /.+@.+\.{1,}.+/.test((v || "")) || "E-mail inválido!");
            return rules;
        },
        passwordConfirm() {
            const rules = []
            rules.push(v => (!!v && v) === this.user.password || "As senhas não conferem!");
            return rules;
        },
    },
    methods: {
        changeRegister(showSignup) {
            this.showSignup = showSignup
            this.notify.show = false
            this.notify.message = ""
        },
        login() {
            if (!this.$refs.formAuth.validate())
                return

            this.loading = true;
            this.$http.get("login", {headers: {"Authorization": "Basic " + btoa(this.user.email + ":" + this.user.password)}})
                .then(response => {
                    this.loading = false;
                    this.notify.message = ""
                    this.notify.show = false
                    this.resetData()

                    this.$store.dispatch("template/setUser", response.data.user)
                    localStorage.setItem(userKey, JSON.stringify(response.data.user));
                    this.$router.push({name: "home"})
                })
                .catch(error => {
                    this.loading = false;
                    if (error && error.response) {
                        this.notify.type = "error"
                        this.notify.message = error.response.data.message
                        this.notify.show = true
                    }
                });
        },
        register() {
            if (!this.$refs.formAuth.validate())
                return

            this.loading = true;
            this.$http.post("login", {...this.user})
                .then(response => {
                    this.loading = false;
                    this.notify.type = "success"
                    this.notify.message = response.data.message
                    this.notify.show = true
                    this.showSignup = true;
                })
                .catch(error => {
                    this.loading = false;
                    this.notify.type="error"
                    this.notify.message= error.response.data.message
                    this.notify.show=true
                });
        },
        accountActivation(token) {
            this.loading = true;
            this.$http.get("/login/account/activation/"+token)
                .then(response => {
                    this.loading = false;
                    this.notify.type = "success"
                    this.notify.message = response.data.message
                    this.notify.show = true
                    this.showSignup = true;
                })
                .catch(error => {
                    this.loading = false;
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
