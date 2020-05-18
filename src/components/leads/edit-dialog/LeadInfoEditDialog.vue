<template>
    <v-card>
        <v-toolbar color="blue-grey darken-1" dark >
            <v-toolbar-title>Edit Lead</v-toolbar-title>
        </v-toolbar>
        <div style="height: 10px">
            <v-progress-linear indeterminate color="green" v-if="loading" />
        </div>
        <v-card-text>
            <LeadInformationForm
                    @updateData="updateData"
                    :initial-data="lead.details"
                    :contact-postcode="lead.details.postcode"/>
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
            <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updateLead" >Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import LeadInformationForm from "../form/LeadInformationForm";
    import {mapState, mapActions} from 'vuex';
    import ErrorHandler from "../../../helpers/ErrorHandler";

    export default {
        name: "LeadInfoEditDialog",
        components: {LeadInformationForm},
        data(){
            return {
                form: {},
                loading: false,
                error: false,
                errorMessage: ''
            }
        },
        computed: {
            ...mapState('leads', ['lead'])
        },
        methods: {
            ...mapActions('leads', ['updateLeadDetails']),
            updateData(form){
                this.form = Object.assign({}, form)
            },
            updateLead(){
                this.loading = true;

                this.updateLeadDetails(this.form).then(() => {
                    this.$emit('success');
                    this.$emit('close');
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
            },
            clearError(){
                this.error = false;
                this.errorMessage = '';
            },
            closeDialog(){
                this.$emit('close')
                this.clearError()
            }
        }
    }
</script>

<style scoped>

</style>