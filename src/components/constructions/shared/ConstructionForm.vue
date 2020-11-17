<template>
    <v-form v-model="isFormValid" ref="form">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-text-field v-model="form.siteAddress"
                                      prepend-icon="mdi-home"
                                      label="Site Address"
                                      :rules="[rules.requiredField]"

                        />
                    </v-col>
                    <v-col cols="12" sm="12">
                        <PostcodeSelectField @onValueChanged="onPostcodeSelect"
                                             :initial-postcode-id="initialData.postcodeId"
                                             :required="true" />
                    </v-col>
                </v-row>
                <v-row >
                    <v-col cols="12">
                        <v-textarea
                                v-model="form.materialList"
                                rows="1"
                                prepend-icon="mdi-clipboard-list"
                                label="Material List"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Date Materials Received"
                                         :initial-date="initialData? initialData.dateMaterialsReceived : ''"
                                         @onDateSelected="dateMaterialsReceivedSelectedHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Date Assembly Completed"
                                         :initial-date="initialData? initialData.dateAssemblyCompleted : ''"
                                         @onDateSelected="dateAssemblyCompletedSelectedHandler" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Anticipated Delivery Date"
                                         :initial-date="initialData? initialData.dateAnticipatedDelivery : ''"
                                         @onDateSelected="dateAnticipatedDeliveryHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Finished Product Delivery Date"
                                         :initial-date="initialData? initialData.dateFinishedProductDelivery : ''"
                                         @onDateSelected="dateFinishedProductDeliveryHandler" />
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-text-field v-model="form.coilNumber"
                                      prepend-icon="mdi-cash"
                                      label="Coil Number"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <TradeStaffSelectField :is-required="true"
                                               :initial-id="form.tradeStaffId"
                                               @onValueChanged="onTradeStaffSelect" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Anticipated Construction Start"
                                         :initial-date="initialData? initialData.anticipatedConstructionStart : ''"
                                         @onDateSelected="anticipatedConstructionStartHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Actual Construction Start"
                                         :initial-date="initialData? initialData.actualConstructionStart : ''"
                                         @onDateSelected="actualConstructionStartHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Anticipated Completion Date"
                                         :initial-date="initialData? initialData.anticipatedConstructionComplete : ''"
                                         @onDateSelected="anticipatedConstructionCompleteHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Actual Completion Date"
                                         :initial-date="initialData? initialData.actualConstructionComplete : ''"
                                         @onDateSelected="actualConstructionCompleteHandler" />
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-text-field
                                v-model="form.comments"
                                prepend-icon="mdi-cash"
                                label="Comments"
                        />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Final Inspection Date"
                                         :initial-date="initialData? initialData.finalInspectionDate : ''"
                                         @onDateSelected="finalInspectionDateHandler" />
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" class="mr-5 mb-5 white--text"
                   @click="$emit('onSave', form)"
                   :loading="saving"
                   :disabled="!isFormValid">
                Save
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    import DateSelectField from "../../shared/DateSelectField";
    import TradeStaffSelectField from "../../shared/TradeStaffSelectField";
    import PostcodeSelectField from "@/components/shared/PostcodeSelectField";
    export default {
        name: "ConstructionForm",
        props: ['initialData', 'saving'],
        components: {PostcodeSelectField, TradeStaffSelectField, DateSelectField},
        data(){
            return {
                isFormValid: false,
                form: {
                    siteAddress: '',
                    postcodeId: '',
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
                },
                defaultForm: {
                  siteAddress: '',
                  postcodeId: '',
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
                },
                rules: {
                    requiredField: v => !!v || 'This field is required',
                }
            }
        },
        methods: {
            dateMaterialsReceivedSelectedHandler(date){
                this.form.dateMaterialsReceived = date;
            },
            dateAssemblyCompletedSelectedHandler(date){
                this.form.dateAssemblyCompleted = date;
            },

            dateAnticipatedDeliveryHandler(date){
                this.form.dateAnticipatedDelivery = date;
            },
            dateFinishedProductDeliveryHandler(date){
                this.form.dateFinishedProductDelivery = date;
            },
            anticipatedConstructionStartHandler(date){
                this.form.anticipatedConstructionStart = date;
            },

            anticipatedConstructionCompleteHandler(date){
                this.form.anticipatedConstructionComplete = date;
            },
            actualConstructionStartHandler(date){
                this.form.actualConstructionStart = date;
            },

            actualConstructionCompleteHandler(date){
                this.form.actualConstructionComplete = date;
            },

            finalInspectionDateHandler(date){
                this.form.finalInspectionDate = date;
            },

            onPostcodeSelect(postcodeId){
                this.form.postcodeId = postcodeId
            },

            onTradeStaffSelect(tradeStaff){
                this.form.tradeStaffId = tradeStaff.id
            },
          reset(){
              this.$refs.form.resetValidation();
          }
        },
        watch: {
            initialData: {
                handler(){
                    if(this.initialData){
                        this.form = Object.assign({}, this.initialData)
                    }
                },
                deep: true
            }
        },
        mounted() {
            if (this.initialData){
                console.log(this.initialData)
                this.form = Object.assign({}, this.initialData)
            }
        }
    }
</script>

<style scoped>

</style>