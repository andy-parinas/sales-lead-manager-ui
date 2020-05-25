<template>
    <v-card>
        <v-toolbar color="blue-grey darken-1" dark >
            <v-toolbar-title><span>Edit User </span> </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="$emit('close')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <UserForm :initialData="selectedUser" @onSave="onUserUpdate" :loading="loading" />
    </v-card>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import UserForm from "./shared/UserForm";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    export default {
        name: "EditDialog",
        components: {UserForm},
        data(){
            return {
                loading: false,
                user: {}
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('users',['selectedUser'])
        },
        methods: {
            ...mapActions('users', ['updateUser']),
            ...mapActions(['setSuccessMessage']),

            onUserUpdate(user){

                this.loading = true;

                this.updateUser(user).then(() => {
                    this.setSuccessMessage('User successfully Updated')
                    this.$emit('close')
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.loading = false;
                })
            }
        }

    }
</script>

<style scoped>

</style>