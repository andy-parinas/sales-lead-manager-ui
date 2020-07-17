<template>
    <v-card>
        <DialogHeader title="Edit User">
            <template v-slot:action>
                <v-btn icon @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <UserForm :initialData="selectedUser" @onSave="onUserUpdate" :loading="loading" :edit="true" />
    </v-card>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import UserForm from "./shared/UserForm";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import DialogHeader from "../../core/DialogHeader";
    export default {
        name: "EditDialog",
        components: {DialogHeader, UserForm},
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