<template>
    <v-card>
        <DialogHeader title="Add Building Authority Details">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <BuildingAuthorityForm @onSave="updateBuildingAuthorityHandler"
                               :initial-data="buildingAuthority"
                               :saving="saving" ref="constructionForm"/>
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import BuildingAuthorityForm from "@/components/building-authority/shared/BuildingAuthorityForm";
import BuildingAuthorityAPI from "@/api/BuildingAuthorityAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import {mapActions} from 'vuex';


export default {
    name: "BuildingAuthorityEditDialog",
    components: {BuildingAuthorityForm, DialogHeader},
    props: ['buildingAuthority', 'leadId'],
    data(){
        return {
            saving: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        updateBuildingAuthorityHandler(formData){
            if(this.buildingAuthority && this.leadId){
                this.saving = true;
                BuildingAuthorityAPI.updateBuildingAuthority(this.leadId, this.buildingAuthority.id, formData).then(response => {
                    this.setSuccessMessage("Building Authority Successfully Ppdated")
                    this.$emit('success', response.data)
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.saving = false;
                })
            }
        },
        closeDialog(){
            this.$emit('close')
        }
    }
}
</script>

<style scoped>

</style>