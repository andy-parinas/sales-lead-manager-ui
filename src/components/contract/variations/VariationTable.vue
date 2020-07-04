<template>
    <div>
        <v-card flat>
            <v-data-table
                    :headers="headers"
                    :items="variations"
                    :loading="loading"
                    hide-default-footer
            >

                <template v-slot:item.actions="{ item }">
                    <v-container>
                        <v-row class="justify-sm-start">
                            <v-btn x-small fab text dark color="error" class="mr-3"  v-if="isHeadOffice"  @click="deleteVariation(item)">
                                <v-icon small >mdi-trash-can-outline </v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="accent" @click="editVariation(item)" >
                                <v-icon small> mdi-pencil</v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>
                </template>

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
            <v-dialog v-model="showEditDialog" persistent max-width="500px">
                <VariationEditDialog
                        :edited-item="selectedItem"
                        :contract-id="contractId"
                        @close="showEditDialog = false"
                        @success="onVariationUpdated"/>
            </v-dialog>
            <v-dialog v-model="showDeleteDialog" persistent max-width="500px">
                <VariationDeleteDialog
                        :variation="selectedItem"
                        :contract-id="contractId"
                        @close="showDeleteDialog = false"
                        @success="onVariationUpdated"/>
            </v-dialog>
        </div>
    </div>
</template>

<script>
    import ContractAPI from "../../../api/ContractAPI";
    import VariationCreateDialog from "./VariationCreateDialog";
    import VariationEditDialog from "./VariationEditDialog";
    import VariationDeleteDialog from "./VariationDeleteDialog";

    export default {
        name: "VariationTable",
        components: {
            VariationDeleteDialog,
            VariationCreateDialog,
            VariationEditDialog
        },
        props: {
            contractId: {required: true}
        },
        data(){
            return {
                loading: false,
                showCreateDialog: false,
                showEditDialog: false,
                showDeleteDialog: false,
                variations: [],
                isHeadOffice: true,
                headers: [
                    { text: 'Variation Date',value: 'variationDate'},
                    { text: 'Description', value: 'description' },
                    { text: 'Amount', value: 'amount' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                selectedItem: null
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
            },
            onVariationUpdated(){
                this.getVariations();
                this.$emit('onVariationUpdated');
            },
            editVariation(item){
                this.selectedItem = Object.assign({}, item)
                this.showEditDialog = true
            },
            deleteVariation(item){
                this.selectedItem = Object.assign({}, item)
                this.showDeleteDialog = true
            }
        },
        mounted() {
            this.getVariations();
        }
    }
</script>

<style scoped>

</style>