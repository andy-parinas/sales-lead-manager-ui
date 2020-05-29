<template>
    <v-card>
        <DialogHeader title="Delete User">
            <template v-slot:action>
                <v-btn icon @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text class="mt-5">
            <p class="body-1 font-weight-medium red--text">{{ selectedUser.name }}</p>
            <p>You won't be able to recover this user once deleted.</p>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" class="mr-5 mb-5 white--text"
                   @click="onDeleteUser"
                   :loading="loading">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import DialogHeader from "../../core/DialogHeader";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";

    export default {
        name: "DeleteDialog",
        components: {DialogHeader},
        data(){
            return {
                loading: false,
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('users', ['selectedUser'])
        },
        methods: {
            ...mapActions('users', ['deleteUser']),
            ...mapActions(['setSuccessMessage']),
            onDeleteUser(){
                this.loading = true;
                this.deleteUser(this.selectedUser.id).then(() => {
                    this.setSuccessMessage("User successfully deleted");
                    this.$emit('close');
                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>