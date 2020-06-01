<template>
    <div>
        <PageHeader title="Franchise" class="mb-1" />
        <v-row class="mt-6" justify="center">
            <v-col cols="12" sm="12" md="6">
                <AllFranchiseSection />
            </v-col>
<!--            <v-col cols="12" sm="12" md="1"></v-col>-->
            <v-col cols="12" sm="12" md="6">
                <RelatedFranchiseSection />
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import PageHeader from "../../components/core/PageHeader";
    import AllFranchiseSection from "../../components/franchise/AllFranchiseSection";
    import RelatedFranchiseSection from "../../components/franchise/RelatedFranchiseSection";

    export default {
        name: "FranchiseTableView",
        components: {RelatedFranchiseSection, AllFranchiseSection, PageHeader},
    }
</script>

<style scoped>

</style>