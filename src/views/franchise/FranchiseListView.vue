<template>
    <div>
        <PageHeader title="Franchise" class="mb-1" />
        <v-row class="mt-6" justify="center" v-if="selectedFranchise">
            <v-col cols="12" sm="12">
                <FranchiseDetails @goBack="hideFranchise" :franchise="selectedFranchise" />
            </v-col>
        </v-row>
        <v-row class="mt-6" justify="center" v-show="!selectedFranchise">
            <v-col cols="12" sm="12">
                <FranchiseTable @showFranchise="showFranchise" />
            </v-col>
        </v-row>
        <v-dialog v-model="showCreateDialog" persistent width="650" class="px-2">
            <CreateFranchiseDialog
                    @close="showCreateDialog = false" />
        </v-dialog>
        <v-btn bottom color="pink" dark fab fixed right @click="showCreateDialog = true" >
            <v-icon>add</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import PageHeader from "../../components/core/PageHeader";
    import CreateFranchiseDialog from "../../components/franchise/CreateFranchiseDialog";
    import FranchiseTable from "../../components/franchise/FranchiseTable";
    import FranchiseDetails from "../../components/franchise/FranchiseDetails";

    export default {
        name: "FranchiseListView",
        components: {FranchiseDetails, FranchiseTable, CreateFranchiseDialog, PageHeader},
        data(){
            return {
                showCreateDialog: false,
                selectedFranchise: null
            }
        },
        methods: {
            showFranchise(franchise){
                this.selectedFranchise = franchise;
            },
            hideFranchise(){
                this.selectedFranchise = null;
            }
        }
    }
</script>

<style scoped>

</style>