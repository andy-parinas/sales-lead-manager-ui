<template>
    <v-card>
        <DialogHeader title="Edit Appointment">
          <template v-slot:action>
            <v-btn icon @click="closeDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </DialogHeader>
        <v-card-text>
            <AppointmentForm
                :initial-data="lead.appointment"
                @updateData="updateData" />

            <v-alert v-if="error"
                     text
                     prominent
                     type="error"
                     icon="mdi-alert">
                <v-row align="center">
                    <v-col class="grow">{{ errorMessage }}</v-col>
                    <v-col class="shrink">
                        <v-btn @click="clearError"
                               text fab small color="red">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>

        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  color="blue darken-1" class="mr-5 mb-5 white--text" :loading="loading" @click="save" >Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import AppointmentForm from "../form/AppointmentForm";
    import {mapState, mapActions} from 'vuex'
    import ErrorHandler from "../../../helpers/ErrorHandler";
    import DialogHeader from "@/components/core/DialogHeader";
    export default {
        name: "AppointmentEditDialog",
        components: {DialogHeader, AppointmentForm},
        data(){
            return {
                loading: false,
                form: {},
                error: false,
                errorMessage: ''
            }
        },
        computed: {
            ...mapState('leads', ['lead']),
        },
        methods: {
            ...mapActions('leads', ['updateLeadAppointment']),
            updateData(form){
                this.form = Object.assign({}, form)
            },
            closeDialog(){
                this.$emit('close')
            },
            clearError(){
                this.error = false;
                this.errorMessage = '';
            },
            save(){
                this.loading = true;
                this.updateLeadAppointment(this.form).then(() => {
                    this.$emit('close');
                    this.$emit('success');
                }).catch(error => {
                    if(error.response && error.response.status){
                        console.error(error.response)
                        ErrorHandler.handlerError(error.response.status, (message) => {
                            this.error = true;
                            this.errorMessage = message;
                        })
                    }else {
                        this.error = true;
                        this.errorMessage = "Something went wrong. Please try again or contact support"
                        console.error(error)
                    }
                }).finally(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>