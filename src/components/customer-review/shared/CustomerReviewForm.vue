<template>
    <v-form v-model="isFormValid" ref="form">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Date Project Completed"
                                         :initial-date="initialData? initialData.dateProjectCompleted : ''"
                                         :required="true"
                                         @onDateSelected="dateProjectCompletedHandler" />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Date Warranty Received"
                                         :initial-date="initialData? initialData.dateWarrantyReceived : ''"
                                         :required="true"
                                         @onDateSelected="dateWarrantyReceivedHandler" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.homeAdditionType"
                                      prepend-icon="mdi-home-outline"
                                      label="Type Of Home Addition"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.homeAdditionDescription"
                                      prepend-icon="mdi-home-outline"
                                      label="Home Addition Description"
                        />
                    </v-col>
                </v-row>

                <v-divider class="my-3"></v-divider>

                <v-row>
                    <v-col cols="12" sm="12">
                        <v-select v-model="form.serviceReceivedRating"
                                  prepend-icon="mdi-thumb-up"
                                  label="How Would You Rate The Service You Received"
                                  :items="ratings"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-select v-model="form.workmanshipRating"
                                  prepend-icon="mdi-thumb-up"
                                  label="How Would You Rate The Workmanship Of Your Spanline Home Addition"
                                  :items="ratings"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-select v-model="form.finishedProductRating"
                                  prepend-icon="mdi-thumb-up"
                                  label="How Would You Rate Your Satisfaction With The Finished Product"
                                  :items="ratings"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-select v-model="form.designConsultantRating"
                                  prepend-icon="mdi-thumb-up"
                                  label="How Would You Rate The Quality,Service And Advise Of Your Design Consultant"
                                  :items="ratings"
                        ></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            v-model="form.comments"
                            rows="2"
                            outlined
                            label="Customer Comments"
                        ></v-textarea>
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
    name: "CustomerReviewForm",
    components: {DateSelectField},
    props: ['initialData', 'saving'],
    data(){
        return {
            isFormValid: false,
            rules: {
                requiredField: v => !!v || 'This field is required',
            },
            form: {
                dateProjectCompleted: '',
                dateWarrantyReceived: '',
                homeAdditionType: '',
                homeAdditionDescription: '',
                serviceReceivedRating: '',
                workmanshipRating: '',
                finishedProductRating: '',
                designConsultantRating: '',
                comments: ''
            },
            ratings: [
                'Excellent',
                'Good',
                'Average',
                'Poor',
                'Not-Rated'
            ]
        }
    },
    methods: {
        dateProjectCompletedHandler(date){
            this.$set(this.form, 'dateProjectCompleted', date)
        },
        dateWarrantyReceivedHandler(date){
            this.$set(this.form, 'dateWarrantyReceived', date)
        }
    },
    mounted() {
        if(this.initialData){
            this.form = Object.assign({}, this.initialData)
        }
    }
}
</script>

<style scoped>

</style>