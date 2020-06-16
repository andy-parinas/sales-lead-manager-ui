<template>
    <div>
        <PageHeader title="Trade Staff" class="mb-1" />
        <v-row class="mt-6 mb-10" justify="center">
            <v-col cols="12" sm="12" md="10">
                <TradeStaffTable />
            </v-col>
        </v-row>
<!--        <v-dialog v-model="showCreateDialog" persistent width="850" class="px-2">-->
<!--            <SalesStaffCreateDialog-->
<!--                    @close="showCreateDialog = false" />-->
<!--        </v-dialog>-->
        <v-btn bottom color="pink" dark fab fixed right @click="showCreateDialog = true" >
            <v-icon>add</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import PageHeader from "../../components/core/PageHeader";
    import TradeStaffTable from "../../components/trade-staff/TradeStaffTable";
    export default {
        name: "TradeStaffListView",
        components: {TradeStaffTable, PageHeader}
    }
</script>

<style scoped>

</style>