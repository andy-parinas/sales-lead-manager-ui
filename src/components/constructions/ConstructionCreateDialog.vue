<template>
    <v-card>
        <DialogHeader title="Add Construction Details">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <ConstructionForm @onSave="addConstructionHandler"
                          :saving="saving" ref="constructionForm" :initial-data="initialData" />
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import ConstructionForm from "./shared/ConstructionForm";
    import ConstructionAPI from "../../api/ConstructionAPI";
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    import {mapActions} from 'vuex'
    import EventBus from "../../helpers/EventBus";

    export default {
        name: "ConstructionCreateDialog",
        props: {
            leadId: {required: true},
            siteAddress: { required: false}
        },
        components: {ConstructionForm, DialogHeader},
        data(){
            return {
                saving: false
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            initialData(){
                if (this.siteAddress){

                    return {
                        siteAddress: this.siteAddress.siteAddress,
                        postcodeId: this.siteAddress.postcodeId,
                        materialList: '',
                        dateMaterialsReceived: '',
                        dateAssemblyCompleted: '',
                        dateAnticipatedDelivery: '',
                        dateFinishedProductDelivery: '',
                        coilNumber: '',
                        tradeStaffId: '',
                        anticipatedConstructionStart: '',
                        anticipatedConstructionComplete: '',
                        actualConstructionStart: '',
                        actualConstructionComplete: '',
                        comments: '',
                        finalInspectionDate: '',
                    }

                }else {
                  return null
                }
            }
        },
        methods: {
            ...mapActions(['setSuccessMessage']),
            addConstructionHandler(formData){
                this.saving = true;
                ConstructionAPI.createConstruction(this.leadId, formData).then(() => {
                    this.setSuccessMessage("Constructions Successfully Created");
                    EventBus.$emit('LEAD_CONSTRUCTION_UPDATE');
                    this.closeDialog()
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.saving = false;
                })
            },
            closeDialog(){
                setTimeout(() => {
                  this.$refs.constructionForm.reset()
                }, 1000);
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>