<template>
    <div>
        <PageHeader title="Users Admin" class="mb-1" />
        <v-row class="mt-6" justify="center">
            <v-col cols="12" sm="12" md="10">
                <UsersAdminTable />
            </v-col>
        </v-row>

        <v-dialog v-model="showAddDialog" persistent max-width="850" class="px-2">
            <CreateDialog @close="showAddDialog = false"  />
        </v-dialog>

        <v-btn bottom color="pink" dark fab fixed right @click="showAddDialog = true">
            <v-icon >add</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import PageHeader from "../../components/core/PageHeader";
    import UsersAdminTable from "../../components/admin/users/UsersAdminTable";
    import CreateDialog from "../../components/admin/users/CreateDialog";
    export default {
        name: "UsersAdminPage",
        components: {CreateDialog, UsersAdminTable, PageHeader},
        data(){
            return {
                showAddDialog: false
            }
        }
    }
</script>

<style scoped>

</style>