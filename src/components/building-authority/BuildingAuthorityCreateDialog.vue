<template>
    <v-card>
        <DialogHeader title="Add Building Authority Details">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <BuildingAuthorityForm @onSave="addBuildingAuthorityHandler"
                          :saving="saving" ref="constructionForm"/>
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import BuildingAuthorityForm from "@/components/building-authority/shared/BuildingAuthorityForm";
export default {
    name: "BuildingAuthorityCreateDialog",
    components: {BuildingAuthorityForm, DialogHeader},
    methods: {


        addBuildingAuthorityHandler(){

        }

        closeDialog(){
            this.$emit('close')
        }
    }
}
</script>

<style scoped>

</style>