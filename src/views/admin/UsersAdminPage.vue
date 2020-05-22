<template>
    <div>
        <PageHeader title="Users Admin" class="mb-1" />
        <UsersAdminTable />
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