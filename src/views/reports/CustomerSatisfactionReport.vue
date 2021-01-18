<template>
  <div>
    <PageHeader title="Customer Satisfaction Report" />
    <v-row>
      <v-col cols="12" sm="3">
          <CustomerSatisfactionForm />
      </v-col>
      <v-col cols="12" sm="9">
          <CustomerSatisfactionTable />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageHeader from "../../components/core/PageHeader";
import CustomerSatisfactionForm from "../../components/reports/CustomerSatisfactionForm";
import CustomerSatisfactionTable from "../../components/reports/CustomerSatisfactionTable";
export default {
name: "CustomerSatisfactionReport",
  components: {CustomerSatisfactionTable, CustomerSatisfactionForm, PageHeader}
}
</script>

<style scoped>

</style>