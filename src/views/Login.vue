<template>
    <v-app>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center" >
                    <v-col cols="12" sm="8" md="4">
                        <v-alert dense dismissible type="error" v-if="error">
                            {{ error }}
                        </v-alert>
                        <v-card class="elevation-12" >
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>
                                    <span class="font-weight-light">Login to </span>
                                    <span class="font-weight-medium">Ezi-Task</span>
                                    <span class="ml-1 font-weight-medium">CRM</span>
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-progress-linear indeterminate color="green" v-if="loading"></v-progress-linear>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="Username"
                                            name="username"
                                            prepend-icon="person"
                                            type="text" v-model="username" />

                                    <v-text-field
                                        label="Password"
                                        name="password"
                                        prepend-icon="lock"
                                        type="password" v-model="password" />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="primary" @click="loginToApp">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

    import {mapActions} from 'vuex';

    export default {
        name: 'Login',
        data(){
            return {
                username: '',
                password: '',
                loading: false,
                error: '',
            }
        },
        methods: {
            ...mapActions('auth', ['login']),
            loginToApp(){

                this.loading = true;

                const loginData = {username: this.username, password: this.password }
                this.login(loginData).then(() => {
                    this.loading = false;
                    this.$router.push({name: 'dashboard'})
                }).catch(error => {
                    this.loading = false;
                    if(error.response && error.response.status && (error.response.status === 401 || error.response.status === 422)){
                        this.error = 'Invalid Username or Password'
                        this.password = ''
                    }else {
                        this.error = 'Unexpected Error. Please try again'
                        console.log(error.response);
                    }
                })
            },
        }
    }
</script>

<style>

</style>