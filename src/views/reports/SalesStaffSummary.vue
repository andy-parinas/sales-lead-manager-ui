<template>
    <div>
        <PageHeader title="Sales Staff Summary Report" />
        <v-row>
            <v-col cols="12" sm="3">
                <SalesStaffSummaryForm />
            </v-col>
            <v-col cols="12" sm="9">
                <SalesStaffSummaryTable />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import PageHeader from "@/components/core/PageHeader";
import SalesStaffSummaryForm from "@/components/reports/SalesStaffSummaryForm";
import SalesStaffSummaryTable from "@/components/reports/SalesStaffSummaryTable";
export default {
name: "SalesStaffSummary",
    components: {SalesStaffSummaryTable, SalesStaffSummaryForm, PageHeader}
}
</script>

<style scoped>

</style>