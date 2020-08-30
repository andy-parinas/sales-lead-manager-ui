<template>
    <div>
        <PageHeader title="Lead Source Admin" />
        <v-row>
            <v-col cols="12" sm="4">
                <LeadSourceForm />
            </v-col>
            <v-col cols="12" sm="6">
                <LeadSourceList />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import LeadSourceForm from "@/components/admin/lead-source/LeadSourceForm";
import PageHeader from "@/components/core/PageHeader";
import LeadSourceList from "@/components/admin/lead-source/LeadSourceList";
export default {
    name: "LeadSourceAdminPage",
    components: {LeadSourceList, PageHeader, LeadSourceForm}
}
</script>

<style scoped>

</style>