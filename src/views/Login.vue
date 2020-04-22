<template>
    <v-app>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center" >
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12" >
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>Login to EzCRM</v-toolbar-title>
                            </v-toolbar>
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
                                <v-btn color="primary" @click="login">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login(){
            console.log(this.username, this.password);
        }
    }
}
</script>

<style>

</style>