<template>
  <div>
    <PageHeader title="Outcome Summary Report" />
    <v-row>
      <v-col cols="12" sm="3">
        <OutcomeSummaryForm />
      </v-col>
      <v-col cols="12" sm="9">
        Table heere
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageHeader from "@/components/core/PageHeader";
import OutcomeSummaryForm from "@/components/reports/OutcomeSummaryForm";
export default {
name: "OutcomeReport",
  components: {OutcomeSummaryForm, PageHeader}
}
</script>

<style scoped>

</style>