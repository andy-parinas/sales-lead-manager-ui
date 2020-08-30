<template>
    <div>
        <PageHeader title="Product Admin" />
        <v-row>
            <v-col cols="12" sm="4">
                <ProductForm />
            </v-col>
            <v-col cols="12" sm="6">
                <ProductList />
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import PageHeader from "@/components/core/PageHeader";
    import ProductForm from "@/components/admin/product/ProductForm";
    import ProductList from "@/components/admin/product/ProductList";
    export default {
        name: "ProductAdminPage",
        components: {ProductList, ProductForm, PageHeader}
    }
</script>

<style scoped>

</style>