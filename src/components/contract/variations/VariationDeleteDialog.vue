<template>
    <v-card>
        <DialogHeader title="Delete Contract Variation">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text>
            <div class="mt-3 subtitle-1"> The Delete process is unrecoverable. Are you sure you want to delete?</div>
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="variation">{{ variation.description }} </div>
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="variation">Amount:  {{ variation.amount }}</div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" class="mr-3 mb-2 white--text"
                   @click="onDeleteVariation"
                   :loading="deleting">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import ContractAPI from "../../../api/ContractAPI";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import {mapActions} from 'vuex';

    export default {
        name: "VariationDeleteDialog",
        components: {DialogHeader},
        props: {
            variation: {required: true},
            contractId: {required: true}
        },
        data(){
            return {
                deleting: false,
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions(['setSuccessMessage']),
            onDeleteVariation(){
                this.deleting = true;
                ContractAPI.deleteContractVariation(this.contractId, this.variation.id).then(() => {
                    this.$emit('success');
                    this.setSuccessMessage("Variation Successfully Deleted");
                    this.closeDialog();
                }).catch(error => {
                    this.errorHandler(error);
                }).finally(() => {
                    this.deleting = false;
                })
            },
            closeDialog(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>