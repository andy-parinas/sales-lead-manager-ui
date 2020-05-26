<template>
    <v-card>
        <DialogHeader title="Create User">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <UserForm  @onSave="onUserCreate" :loading="loading" ref="userForm"  />
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex';
    import DialogHeader from "../../core/DialogHeader";
    import UserForm from "./shared/UserForm";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";


    export default {
        name: "CreateDialog",
        components: {UserForm, DialogHeader},
        data(){
            return {
                loading: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('users', ['createUser']),
            ...mapActions(['setSuccessMessage']),
            onUserCreate(formData){
                this.loading = true
                this.createUser(formData).then(() => {
                    this.setSuccessMessage('User successfully Created');
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.loading = false;
                })
            },

            closeDialog(){
                setTimeout(()=>{
                    this.$refs.userForm.clearForm();
                }, 100)
                this.$emit('close');
            }
        }

    }
</script>

<style scoped>

</style>