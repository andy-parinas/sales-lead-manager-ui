<template>
    <v-card>
        <DialogHeader title="Delete Sales Staff">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text>
            <div class="mt-3 subtitle-1"> The Delete process is unrecoverable. Are you sure you want to delete?</div>
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="salesStaff">{{ salesStaff.firstName }} {{ salesStaff.lastName }}</div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" class="mr-3 mb-2 white--text"
                   @click="onDeleteSalesStaff"
                    :loading="deleting">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";

    export default {
        name: "SalesStaffDeleteDialog",
        components: {DialogHeader},
        props: {
            salesStaff: {required: true}
        },
        data(){
            return {
                deleting: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('salesStaffs', ['deleteSalesStaff']),
            ...mapActions(['setSuccessMessage']),
            closeDialog(){
                this.$emit('close')
            },
            onDeleteSalesStaff(){
                if(this.salesStaff){
                    this.deleting = true;
                    this.deleteSalesStaff(this.salesStaff.id).then(() => {
                        this.setSuccessMessage("Sales Staff Successfully Deleted");
                        this.closeDialog();
                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.deleting = false;
                    })

                }
            }
        }
    }
</script>

<style scoped>

</style>