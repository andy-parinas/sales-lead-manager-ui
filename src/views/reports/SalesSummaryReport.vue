<template>
   <div>
       <PageHeader title="Sales Summary Report" />
       <v-row>
           <v-col cols="12" sm="3">
               <SalesSummaryForm />
           </v-col>
           <v-col cols="12" sm="9">
               <SalesSummaryTable />
           </v-col>
       </v-row>
   </div>
</template>

<script>
    import SalesSummaryForm from "../../components/reports/SalesSummaryForm";
    import SalesSummaryTable from "../../components/reports/SalesSummaryTable";
    import PageHeader from "../../components/core/PageHeader";
    export default {
        name: "SalesSummaryReport",
        components: {PageHeader, SalesSummaryTable, SalesSummaryForm}
    }
</script>

<style scoped>

</style>