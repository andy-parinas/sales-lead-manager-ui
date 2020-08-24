<template>
    <v-form v-model="isFormValid" ref="form">
        <v-card-text>
            <v-container>
                <v-row >
                    <v-col cols="12">
                        <v-textarea
                                rows="1"
                                outlined
                                label="Material List"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Date Materials Received"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="dateMaterialsReceivedSelectedHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Date Assembly Completed"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="dateAssemblyCompletedSelectedHandler" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Anticipated Delivery Date"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="dateMaterialsReceivedSelectedHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Finished Product Delivery Date"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="dateMaterialsReceivedSelectedHandler" />
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-text-field
                                      prepend-icon="mdi-cash"
                                      label="Coil Number"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Anticipated Construction Start"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="dateMaterialsReceivedSelectedHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Actual Construction Start"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="dateMaterialsReceivedSelectedHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Anticipated Completion Date"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="dateMaterialsReceivedSelectedHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Actual Completion Date"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         @onDateSelected="dateMaterialsReceivedSelectedHandler" />
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-text-field
                                prepend-icon="mdi-cash"
                                label="Comments"
                        />
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
    export default {
        name: "ConstructionForm",
        props: ['initialData', 'saving'],
        components: {DateSelectField},
        data(){
            return {
                isFormValid: false,
                form: {

                },
                rules: {
                    requiredField: v => !!v || 'This field is required',
                }
            }
        },
        methods: {
            dateMaterialsReceivedSelectedHandler(){

            },
            dateAssemblyCompletedSelectedHandler(){

            }

        }
    }
</script>

<style scoped>

</style>