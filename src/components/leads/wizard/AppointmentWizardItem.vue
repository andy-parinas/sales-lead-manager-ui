<template>
    <div>
        <AppointmentForm
                @updateData="updateData"
                :initial-data="initialData" />
        <v-container>
            <v-row>
                <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Back</v-btn>
                <v-btn color="primary" @click="moveNext"
                       :disabled="!isFormValid">Continue</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="mr-2" @click="$emit('cancel')">Cancel</v-btn>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import AppointmentForm from "../form/AppointmentForm";

    export default {
        name: "AppointmentWizardItem",
        components: {AppointmentForm},
        data(){
            return {
                form: {
                    appointmentDate: '',
                    appointmentTime: '',
                    outcome: '',
                    quotedPrice: '',
                    notes: '',
                    comments: '',
                    date: ''

                },
                initialData: {
                    appointmentDate: new Date().toISOString().substr(0, 10),
                    appointmentTime: '',
                    outcome: '',
                    quotedPrice: '',
                    notes: '',
                    comments: '',
                    date: ''
                }
            }

        },
        computed: {

            isFormValid(){
                return this.form.appointmentDate && this.form.appointmentTime && this.form.quotedPrice && this.form.outcome
            }
        },
        methods: {
            moveNext(){
                this.$emit('moveNext', {
                    appointment: this.form
                })
            },
            updateData(form){
                console.log('Updating data')
                this.form = Object.assign({}, form)
            }
        }
    }
</script>

<style scoped>

</style>