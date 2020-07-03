<template>
    <div>
        <v-card flat>
            <v-data-table
                    :headers="headers"
                    :items="variations"
                    :loading="loading"
                    hide-default-footer
            >

            </v-data-table>
            <v-divider></v-divider>
        </v-card>
        <div class="mt-5">
            <v-btn small @click="showCreateDialog = true">Add Variation</v-btn>
        </div>
        <div>
            <v-dialog v-model="showCreateDialog" persistent max-width="500px">
                <VariationCreateDialog
                        :contract-id="contractId"
                        @close="showCreateDialog = false"
                        @success="onVariationCreated"/>
            </v-dialog>
        </div>
    </div>
</template>

<script>
    import ContractAPI from "../../../api/ContractAPI";
    import VariationCreateDialog from "./VariationCreateDialog";

    export default {
        name: "VariationTable",
        components: {VariationCreateDialog},
        props: {
            contractId: {required: true}
        },
        data(){
            return {
                loading: false,
                showCreateDialog: false,
                variations: [],
                headers: [
                    { text: 'Variation Date',value: 'variationDate'},
                    { text: 'Description', value: 'description' },
                    { text: 'Amount', value: 'amount' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
            }
        },
        methods: {
            getVariations(){
                if(!this.loading){
                    this.loading = true;
                    ContractAPI.getContractVariations(this.contractId).then(response => {
                        const data = response.data;

                        if(data){
                            this.variations = data;
                        }
                    }).catch(error => {
                        console.log('Variation Table', error.response)
                    }).finally(() => {
                        this.loading = false;
                    })
                }

            },
            onVariationCreated(){
                this.getVariations();
                this.$emit('onVariationCreated');
            }
        },
        mounted() {
            this.getVariations();
        }
    }
</script>

<style scoped>

</style>