<template>
    <div>
        <v-card flat class="mx-10">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-numeric-0-box-multiple-outline</v-icon>
                        <span class="ml-2 caption font-weight-bold">Lead Number:</span> <span class="ml-1"> {{data.leadNumber}} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-store</v-icon>
                        <span class="ml-2 caption font-weight-bold">Franchise Number: </span> <span class="ml-1"> {{data.franchiseNumber }} </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-calendar</v-icon>
                        <span class="ml-2 caption font-weight-bold">Lead Date: </span> <span class="ml-1"> {{ data.leadDate | formatDate }} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-briefcase</v-icon>
                        <span class="ml-2 caption font-weight-bold">Lead Type: </span> <span class="ml-1"> {{ data.customerType | capitalize }} </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-web</v-icon>
                        <span class="ml-2 caption font-weight-bold">Lead Source: </span> <span class="ml-1"> {{ data.leadSource | capitalize }} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-icon small>mdi-web</v-icon>
                      <span class="ml-2 caption font-weight-bold">Lead Received Via: </span> <span class="ml-1"> {{ data.receivedVia | capitalize }} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-map-marker</v-icon>
                        <span class="ml-2 caption font-weight-bold">Status: </span>
                        <v-chip small label :color="isInsideFranchise" text-color="white">
                            {{ status }}
                        </v-chip>
                    </v-col>
                </v-row>
                <v-row v-if="!summary" >
                    <v-col cols="12" sm="3">
                        <v-btn small color="primary" width="100%"
                               :loading="unAssignedSending"
                               :disabled="data.unAssignedIntroSent !== null ? true: false"
                               @click="sendUnassignedIntroLetter" >
                          Send Unassigned Intro Letter
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row v-if="!summary">
                    <v-col cols="12" sm="3">
                        <v-btn small color="primary" width="100%"
                               :loading="assignedSending"
                               :disabled="data.assignedIntroSent !== null ? true : false"
                               @click="sendAssignedIntroLetter" >
                          Send Assigned Intro Letter
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn v-if="!summary" text small fab @click="editDialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
                    <LeadContentDownload v-if="!summary" />
                </v-row>
                <v-divider class="my-5"></v-divider>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-account</v-icon>
                        <span class="ml-2"> {{ data.firstName}} {{ data.lastName }} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-phone</v-icon>
                        <span class="ml-2">{{ data.contactNumber }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-email</v-icon>
                        <span class="ml-2"> {{ data.email }}</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-email</v-icon>
                        <span class="ml-2">{{ data.email2 }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-home</v-icon>
                        <span class="ml-2">{{ data.street1 }}</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-sign-direction</v-icon>
                        <span class="ml-2"> {{ data.street2 }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-icon small>mdi-map</v-icon>
                        <span class="ml-2">
                            {{summary? data.postcode : data.postcode.locality}},
                            {{summary? data.state : data.postcode.state}},
                            {{summary? data.postcode : data.postcode.pcode}}
                        </span>
                    </v-col>
                </v-row>

            </v-card-text>
        </v-card>

        <v-row justify="center">
            <v-dialog v-model="editDialog" persistent max-width="800px">
                <LeadInfoEditDialog
                        @close="editDialog = false"
                        @success="$emit('success')" />
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
    import LeadInfoEditDialog from "../../../components/leads/edit-dialog/LeadInfoEditDialog";
    import lettersAPI from "@/api/lettersAPI";
    import ErrorHandlerMixins from "@/mixins/ErrorHandler";
    import LeadContentDownload from "../../../components/leads/LeadContentDownload";
    export default {
        name: "LeadContactPartial",
        components: {LeadContentDownload, LeadInfoEditDialog},
        props: {
            data: {required: true, type: Object},
            summary: {required: false}
        },
        data(){
            return {
                editDialog: false,
                unAssignedSending: false,
                assignedSending: false
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            status(){
                if(this.data && this.data.postcodeStatus === 'outside_of_franchise'){
                    return 'Outside Of Franchise'
                }

                return 'Within Franchise'
            },
            isInsideFranchise(){

                if(this.data && this.data.postcodeStatus === 'inside_of_franchise'){
                    return 'green'
                }

                return 'orange darken-3'
            }
        },
        methods: {
            sendUnassignedIntroLetter(){
                this.unAssignedSending = true;
                lettersAPI.sendUnAssignedIntoLetter(this.data.id, this.data.salesContactId).then(response => {
                    console.log('Send Letter', response)
                    this.$set(this.data, 'unAssignedIntroSent', response.data.unassigned_intro_sent)
                }).catch(error => {
                    this.errorHandler(error)
                }).finally(() => {
                    this.unAssignedSending = false;
                })
            },
            sendAssignedIntroLetter(){
                this.assignedSending = true;
                lettersAPI.sendAssignedIntoLetter(this.data.id, this.data.salesContactId).then(response => {
                  console.log('Send Letter', response)
                  this.$set(this.data, 'assignedIntroSent', response.data.assigned_intro_sent)
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                  this.assignedSending = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>