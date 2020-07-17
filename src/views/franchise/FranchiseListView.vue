<template>
    <div>
        <PageHeader title="Franchise" class="mb-1" />
        <v-row class="mt-6" justify="center">
<!--            <v-col cols="12" sm="12" md="6">-->
<!--                <AllFranchiseSection />-->
<!--            </v-col>-->
<!--&lt;!&ndash;            <v-col cols="12" sm="12" md="1"></v-col>&ndash;&gt;-->
<!--            <v-col cols="12" sm="12" md="6">-->
<!--                <RelatedFranchiseSection />-->
<!--            </v-col>-->
            <v-col cols="12" sm="10">
                <FranchiseTable />
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

    export default {
        name: "FranchiseListView",
        components: {FranchiseTable, CreateFranchiseDialog, PageHeader},
        data(){
            return {
                showCreateDialog: false
            }
        }
    }
</script>

<style scoped>

</style>