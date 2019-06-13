<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card :light="true" class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title><span v-if="!showSignup">Novo </span>Login</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="formAuth">
                            <v-text-field v-bind:disabled="loading" v-if="!showSignup" v-model.trim="user.name" v-bind:rules="nameRules" prepend-icon="person" name="name" label="Nome Completo" type="Nome"/>
                            <v-text-field v-bind:disabled="loading" v-model.trim="user.email" v-bind:rules="emailRules" prepend-icon="alternate_email" name="email" label="E-mail" type="text"/>
                            <v-text-field v-bind:disabled="loading" v-model.trim="user.password" prepend-icon="lock" name="password" label="Senha" id="password" type="password"/>
                            <v-text-field v-bind:disabled="loading" v-if="!showSignup" v-bind:rules="passwordConfirm" prepend-icon="lock" name="password_confirm" label="Confirme a Senha" id="password_confirm" type="password"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-layout column align-end>
                                    <div>
                                        <v-btn v-bind:disabled="loading" v-if="showSignup" v-on:click="login()" color="secondary">Entrar</v-btn>
                                        <v-btn v-bind:disabled="loading" v-else v-on:click="register()" color="secondary darken-3">Cadastrar</v-btn>
                                    </div>
                                </v-layout>
                                <v-progress-linear v-show="loading" color="primary" v-bind:indeterminate="true"/>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                    <v-toolbar dark color="primary">
                        <a style="color: inherit" v-show="showSignup" v-on:click="!loading && changeRegister(false)">Não tem cadastro? <strong>Cadastre-se!</strong></a>
                        <a style="color: inherit" v-show="!showSignup" v-on:click="!loading && changeRegister(true)">Já tem cadastro? <strong>Entre!</strong></a>
                    </v-toolbar>
                </v-card>
                <v-alert :value="notify.show" :type="notify.type">{{ notify.message }}</v-alert>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Notify from "@/models/Notify.ts"
import { userKey } from '@/constants.ts';
import AuthDomain from "@/domains/auth/AuthDomain.ts"

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
            notify: new Notify(),
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
            const rules = [];
            rules.push(v => (v || "").indexOf(" ") > 0 || "Digite o nome completo!");
            return rules;
        },
        emailRules() {
            const rules = [];
            rules.push(v => (v || "") != "" || "E-mail é obrigatorio!");
            rules.push(v =>  /.+@.+\.{1,}.+/.test((v || "")) || "E-mail inválido!");
            return rules;
        },
        passwordConfirm() {
            const rules = [];
            rules.push(v => (!!v && v) === this.user.password || "As senhas não conferem!");
            return rules;
        },
    },
    methods: {
         showMessage(show, response) {
            this.notify.show = show;
            this.notify.type = response.status;
            this.notify.message = response.message;
        },
        changeRegister(showSignup) {
            this.showSignup = showSignup;
            this.showMessage(false, {type:"", message: ""});
        },
        async login() {
            if (!this.$refs.formAuth.validate())
                return

            this.loading = true;

            let auth = new AuthDomain();
            try{

                let user = await auth.login(this.user.email, this.user.password);
                this.resetData();

                this.$store.dispatch("template/setUser", user.toDTO());
                localStorage.setItem(userKey, JSON.stringify(user.toDTO()));
                this.$router.push({name: "home"});
            }
            catch (error){
                this.showMessage(true, error);
            }

            this.loading = false;
        },
        async register() {
            if (!this.$refs.formAuth.validate())
                return

            this.loading = true;

            let auth = new AuthDomain();
            let response;
            try {
                response = await auth.register(this.user);
                this.showSignup = true;
            }
            catch (error) {
                response = error;
            }

            this.showMessage(true, response);
            this.loading = false;
        },
        async accountActivation(token) {
            this.loading = true;

            let auth = new AuthDomain();
            let response;
            try {
                response = await auth.activation(token);
                this.showSignup = true;
            }
            catch (error) {
                response = error;
            }

            this.showMessage(true, response);
            this.loading = false;
        },
        resetData() {
            Object.assign(this.$data, this.$options.data.apply(this))
        }
    }
}
</script>

<style>

</style>
