<template>
    <div>
        <PageHeader title="Sales Staff" class="mb-1" />
        <v-row class="mt-6 mb-10" justify="center">
            <v-col cols="12" sm="12" md="10">
                <SalesStaffTable />
            </v-col>
        </v-row>
        <v-dialog v-model="showCreateDialog" persistent width="850" class="px-2">
            <SalesStaffCreateDialog
                    @close="showCreateDialog = false" />
        </v-dialog>
        <v-btn bottom color="pink" dark fab fixed right @click="showCreateDialog = true" >
            <v-icon>add</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import PageHeader from "../../components/core/PageHeader";
    import SalesStaffTable from "../../components/sales-staff/SalesStaffTable";
    import SalesStaffCreateDialog from "../../components/sales-staff/SalesStaffCreateDialog";

    export default {
        name: "SalesStaffListView",
        components: {SalesStaffCreateDialog, SalesStaffTable, PageHeader},
        data(){
            return {
                showCreateDialog: false
            }
        }

    }
</script>

<style scoped>

</style>