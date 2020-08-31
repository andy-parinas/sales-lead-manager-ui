<template>
    <v-form v-model="isFormValid" ref="form">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-select v-model="form.approvalRequired"
                                  prepend-icon="mdi-thumb-up"
                                  label="Approval Required"
                                  :items="[{value: 'yes', text: 'Yes'}, {value: 'no', text: 'No'}]"
                                  :rules="[rules.requiredField]"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.buildingAuthorityName"
                                      prepend-icon="mdi-office-building"
                                      label="Building Authority Name"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Date Plans Sent To Draftsman"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="datePlansSentToDraftsmanHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Date Plans Completed"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="datePlansCompleted" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Date Plans Sent To Authority"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="datePlansSentToAuthority" />
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            v-model="form.buildingAuthorityComments"
                            rows="1"
                            prepend-icon="mdi-clipboard-list"
                            label="Building Authority Comments"
                        ></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Anticipated Approval Date"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="dateAnticipatedApproval"/>
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Date Received From Authority"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="dateReceivedFromAuthority"/>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.permitNumber"
                                      prepend-icon="mdi-newspaper-variant-outline"
                                      label="Authority/DA Permit Number"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select v-model="form.securityDepositRequired"
                                  prepend-icon="mdi-lock"
                                  label="Security Deposit Required"
                                  :items="[{value: 'yes', text: 'Yes'}, {value: 'no', text: 'No'}]"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.buildingInsuranceName"
                                      prepend-icon="mdi-office-building"
                                      label="Building Insurance Name"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.buildingInsuranceNumber"
                                      prepend-icon="mdi-newspaper-variant-outline"
                                      label="Building Insurance Number"
                        />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Date Building Insurance Request Sent"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="dateBuildingInsuranceRequestSent"/>
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
import DateSelectField from "@/components/shared/DateSelectField";
export default {
    name: "BuildingAuthorityForm",
    components: {DateSelectField},
    props: ['initialData', 'saving'],
    data(){
        return {
            isFormValid: false,
            form: {
                approvalRequired: '',
                buildingAuthorityName: '',
                datePlansSentToDraftsman: '',
                datePlansCompleted: '',
                datePlansSentToAuthority: '',
                buildingAuthorityComments: '',
                dateAnticipatedApproval: '',
                dateReceivedFromAuthority: '',
                permitNumber: '',
                securityDepositRequired: '',
                buildingInsuranceName: '',
                buildingInsuranceNumber: '',
                dateInsuranceRequestSent: ''
            },
            defaultForm: {
                approvalRequired: '',
                buildingAuthorityName: '',
                datePlansSentToDraftsman: '',
                datePlansCompleted: '',
                datePlansSentToAuthority: '',
                buildingAuthorityComments: '',
                dateAnticipatedApproval: '',
                dateReceivedFromAuthority: '',
                permitNumber: '',
                securityDepositRequired: '',
                buildingInsuranceName: '',
                buildingInsuranceNumber: '',
                dateInsuranceRequestSent: ''
            },
            rules: {
                requiredField: v => !!v || 'This field is required',
            }
        }
    },
    methods: {
        datePlansSentToDraftsmanHandler(date){
            this.form.datePlansSentToDraftsman = date;
        },
        datePlansCompleted(date){
            this.form.datePlansCompleted = date;
        },
        datePlansSentToAuthority(date){
            this.form.datePlansSentToAuthority = date;
        },
        dateAnticipatedApproval(date){
            this.form.dateAnticipatedApproval = date;
        },
        dateReceivedFromAuthority(date){
            this.form.dateReceivedFromAuthority = date;
        },
        dateBuildingInsuranceRequestSent(date){
            this.form.dateInsuranceRequestSent = date;
        },
        reset(){
            this.form = Object.assign({}, this.defaultForm);
            this.$refs.form.resetValidation();

        }

    }
}
</script>

<style scoped>

</style>

