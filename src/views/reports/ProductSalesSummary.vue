<template>
    <div>
        <PageHeader title="Product Sales Summary Report" />
        <v-row>
            <v-col cols="12" sm="3">
                <ProductSalesSummaryForm />
            </v-col>
            <v-col cols="12" sm="9">
                <ProductSalesSummaryTable />
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import PageHeader from "../../components/core/PageHeader";
    import ProductSalesSummaryForm from "../../components/reports/ProductSalesSummaryForm";
    import ProductSalesSummaryTable from "../../components/reports/ProductSalesSummaryTable";
    export default {
        name: "ProductSalesSummary",
        components: {ProductSalesSummaryTable, ProductSalesSummaryForm, PageHeader}
    }
</script>

<style scoped>

</style>