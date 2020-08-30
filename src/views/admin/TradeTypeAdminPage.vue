<template>
    <div>
        <PageHeader title="Trade Type Admin" />
        <v-row>
            <v-col cols="12" sm="4">
                <TradeTypeForm />
            </v-col>
            <v-col cols="12" sm="6">
                <TradeTypeList />
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import PageHeader from "@/components/core/PageHeader";
    import TradeTypeForm from "@/components/admin/trade-type/TradeTypeForm";
    import TradeTypeList from "@/components/admin/trade-type/TradeTypeList";

    export default {
        name: "TradeTypeAdminPage",
        components: {TradeTypeList, TradeTypeForm, PageHeader}
    }
</script>

<style scoped>

</style>