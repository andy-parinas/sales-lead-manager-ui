<template>
    <div>
        <PageHeader title="Sales Summary Report" />
        <v-row>
            <v-col cols="12" sm="3">
                <SalesStaffProductSummaryForm />
            </v-col>
            <v-col cols="12" sm="9">
                <SalesStaffProductSummaryTable />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import PageHeader from "@/components/core/PageHeader";
import SalesStaffProductSummaryForm from "@/components/reports/SalesStaffProductSummaryForm";
import SalesStaffProductSummaryTable from "@/components/reports/SalesStaffProductSummaryTable";
export default {
    name: "SalesStaffProductSummary",
    components: {SalesStaffProductSummaryTable, SalesStaffProductSummaryForm, PageHeader}
}
</script>

<style scoped>

</style>