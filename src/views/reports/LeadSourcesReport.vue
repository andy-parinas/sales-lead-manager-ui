<template>
    <div>
        <PageHeader title="Lead Sources Summary Report" />
        <v-row>
            <v-col cols="12" sm="3">
                <LeadSourcesSummaryForm />
            </v-col>
            <v-col cols="12" sm="9">

            </v-col>
        </v-row>
    </div>
</template>

<script>
import PageHeader from "@/components/core/PageHeader";
import LeadSourcesSummaryForm from "@/components/reports/LeadSourcesSummaryForm";
export default {
    name: "LeadSourcesReport",
    components: {LeadSourcesSummaryForm, PageHeader}
}
</script>

<style scoped>

</style>