<template>
   <div>
       <v-card flat class="mx-10">
           <v-card-text>
               <v-row>
                   <v-col cols="12" sm="6">
                       <v-icon small>mdi-ticket-account</v-icon>
                       <span class="ml-2 caption font-weight-bold"> Taken By: </span> <span> {{ data.takenBy }}</span>
                   </v-col>
                   <v-col cols="12" sm="6">
                       <v-icon small>mdi-calendar-multiple-check</v-icon>
                       <span class="ml-2 caption font-weight-bold"> Date Allocated: </span> <span> {{ data.dateAllocated | formatDate }} </span>
                   </v-col>
               </v-row>
               <v-row>
                   <v-col cols="12" sm="12">
                       <v-icon small>mdi-cart</v-icon>
                       <span class="ml-2 caption font-weight-bold"> Product: </span> <span> {{ data.product | capitalize }} </span>
                   </v-col>
               </v-row>
               <v-row>
                   <v-col cols="12" sm="12">
                       <v-icon small>mdi-clipboard-text</v-icon>
                       <span class="ml-2 caption font-weight-bold"> Description: </span>
                       <span>
                        {{ data.description }}
                    </span>
                   </v-col>
               </v-row>
               <v-row>
                   <v-col cols="12" sm="12">
                       <v-icon small>mdi-pen</v-icon>
                       <span class="ml-2 caption font-weight-bold"> Design Advisor: </span> <span> {{ data.designAssessor }} </span>
                   </v-col>
               </v-row>
               <v-row v-if="data.designAssessorContactNumber && data.designAssessorEmail">
                   <v-col cols="12" sm="6">
                       <v-icon small>mdi-phone</v-icon>
                       <span class="ml-2"> {{ data.designAssessorContactNumber }} </span>
                   </v-col>
                   <v-col cols="12" sm="6">
                       <v-icon small>mdi-email</v-icon>
                       <span class="ml-2"> {{ data.designAssessorEmail }} </span>
                   </v-col>
               </v-row>
               <v-row>
                   <v-spacer></v-spacer>
                   <v-btn v-if="!summary" text small fab @click="editDialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
                    <LeadContentDownload v-if="!summary" />
               </v-row>
               <v-row v-if="!summary">
                 <v-col cols="12" sm="3">
                   <v-btn small color="primary" width="100%"
                          :disabled="data.emailSentToDesignAdvisor  !== null ? true: false"
                          @click="sendEmailToDesignAdvisor" :loading="emailSending" >
                     Send Email to Design Advisor
                   </v-btn>
                 </v-col>
                 <v-col cols="12" sm="3">
                   <v-btn small color="primary" width="100%"
                          :disabled="data.smsSentToDesignAdvisor  !== null ? true: false"
                          @click="sendSmsToDesignAdvisor" :loading="smsSending">
                     Send SMS to Design Advisor
                   </v-btn>
                 </v-col>
               </v-row>
           </v-card-text>
       </v-card>
       <v-container>
           <v-row justify="center">
               <v-dialog v-model="editDialog" persistent max-width="800px">
                   <JobTypeEditDialog
                       @close="editDialog = false"
                       @success="$emit('success')"/>
               </v-dialog>
           </v-row>
       </v-container>
   </div>
</template>

<script>
    import JobTypeEditDialog from "../../../components/leads/edit-dialog/JobTypeEditDialog";
    import LeadAPI from "../../../api/LeadAPI";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import LeadContentDownload from "../../../components/leads/LeadContentDownload";

    export default {
        name: "JobTypePartial",
        components: {LeadContentDownload, JobTypeEditDialog},
        props: {
            data: {required: true, type: Object},
            summary: {required: false}
        },
        data(){
            return {
                editDialog: false,
                emailSending: false,
                smsSending: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {

            sendEmailToDesignAdvisor(){
                this.emailSending = true;
                LeadAPI.sendEmailToDesignAdvisor(this.data.leadId, this.data.designAssessorId).then(response => {
                    this.$set(this.data, 'emailSentToDesignAdvisor', response.data)
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.emailSending = false;
                })
            },

            sendSmsToDesignAdvisor(){
                this.smsSending = true;
                LeadAPI.sendSmsToDesignAdvisor(this.data.leadId, this.data.designAssessorId).then(response => {
                    this.$set(this.data, 'smsSentToDesignAdvisor', response.data)
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.smsSending = false;
                })
            }

        }
    }
</script>

<style scoped>

</style>