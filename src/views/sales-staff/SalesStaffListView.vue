<template>
    <div>
        <PageHeader title="Sales Staff" class="mb-1" />
        <v-row class="mt-6" justify="center">
            <v-col cols="12" sm="12" md="10">
                <SalesStaffTable />
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import PageHeader from "../../components/core/PageHeader";
    import SalesStaffTable from "../../components/sales-staff/SalesStaffTable";
    export default {
        name: "SalesStaffListView",
        components: {SalesStaffTable, PageHeader}
    }
</script>

<style scoped>

</style>