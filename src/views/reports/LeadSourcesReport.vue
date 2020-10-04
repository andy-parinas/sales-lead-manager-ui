<template>
    <div>
        <PageHeader title="Lead Sources Summary Report" />
        <v-row>
            <v-col cols="12" sm="3">
                <LeadSourcesSummaryForm />
            </v-col>
            <v-col cols="12" sm="9">
                <LeadSourcesSummaryTable />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import PageHeader from "@/components/core/PageHeader";
import LeadSourcesSummaryForm from "@/components/reports/LeadSourcesSummaryForm";
import LeadSourcesSummaryTable from "@/components/reports/LeadSourcesSummaryTable";
export default {
    name: "LeadSourcesReport",
    components: {LeadSourcesSummaryTable, LeadSourcesSummaryForm, PageHeader}
}
</script>

<style scoped>

</style>