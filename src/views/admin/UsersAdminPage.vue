<template>
    <div>
        <PageHeader title="Users Admin" class="mb-1" />
        <v-row class="mt-6" justify="center">
            <v-col cols="12" sm="12" md="10">
                <UsersAdminTable />
            </v-col>
        </v-row>

    </div>
</template>

<script>
    import PageHeader from "../../components/core/PageHeader";
    import UsersAdminTable from "../../components/admin/users/UsersAdminTable";
    export default {
        name: "UsersAdminPage",
        components: {UsersAdminTable, PageHeader}
    }
</script>

<style scoped>

</style>