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
import BuildingAuthorityAPI from "@/api/BuildingAuthorityAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import {mapActions} from 'vuex';


export default {
    name: "BuildingAuthorityCreateDialog",
    props: ['leadId'],
    components: {BuildingAuthorityForm, DialogHeader},
    data(){
        return {
            saving: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        addBuildingAuthorityHandler(form){
            if(this.leadId){
                this.saving = true;
                BuildingAuthorityAPI.createBuildingAuthority(this.leadId, form).then(() => {
                    this.setSuccessMessage('Building Authority Created');
                    this.$emit('success');
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