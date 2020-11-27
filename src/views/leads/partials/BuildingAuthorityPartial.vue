<template>
    <div>
        <v-skeleton-loader v-if="loading"
                           :loading="loading"
                           height="94"
                           type="list-item-two-line">
            <v-card>
                <v-card-title>Title</v-card-title>
                <v-card-text>Card Text</v-card-text>
            </v-card>
        </v-skeleton-loader>
        <v-card flat class="mx-10" v-if="buildingAuthority === null && !loading">
            <v-row >
                <v-col cols="12" sm="6">
                    <span class="ml-2  heading-6 font-weight-medium grey--text"> No Building Authority Details Available </span>
                    <v-btn text color="primary" class="mr-2" @click="showCreateDialog =true">Click Here to Create</v-btn>
                </v-col>
            </v-row>
        </v-card>

        <v-card flat class="mx-10 mt-5" v-if="buildingAuthority && !loading">
            <span class="font-weight-medium caption my-2" >BA Name/Plan Details</span>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-thumb-up</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Approval Required:</span>
                    <span> {{ buildingAuthority.approvalRequired }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-office-building</v-icon>
                    <span class="ml-2 font-weight-medium caption">Building Authority Name:</span>
                    <span> {{ buildingAuthority.buildingAuthorityName }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Date Plans Sent To Draftsman :</span>
                    <span> {{ buildingAuthority.datePlansSentToDraftsman | formatDate }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Date Plans Completed:</span>
                    <span> {{ buildingAuthority.datePlansCompleted | formatDate }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Date Plans Sent To Authority:</span>
                    <span> {{ buildingAuthority.datePlansSentToAuthority |formatDate }} </span>
                </v-col>
                <v-col cols="12" sm="=12" md="12">
                    <v-icon small>mdi-comment</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Building Authority Comments:</span>
                    <span> {{ buildingAuthority.buildingAuthorityComments }} </span>
                </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>

            <span class="font-weight-medium caption">BA Approval Details/Permit Number</span>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Anticipated Approval Date:</span>
                    <span> {{ buildingAuthority.dateAnticipatedApproval |formatDate }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption">Date Received From Authority:</span>
                    <span> {{ buildingAuthority.dateReceivedFromAuthority |formatDate }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-newspaper-variant-outline</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Authority/DA Permit Number:</span>
                    <span> {{buildingAuthority.permitNumber }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-lock</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Security Deposit Required:</span>
                    <span> {{ buildingAuthority.securityDepositRequired }} </span>
                </v-col>
            </v-row>

            <v-divider class="my-3"></v-divider>
            <span class="font-weight-medium caption">Building Insurance</span>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-office-building</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Building Insurance Name: </span>
                    <span> {{ buildingAuthority.buildingInsuranceName }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-newspaper-variant-outline</v-icon>
                    <span class="ml-2 font-weight-medium caption">Building Insurance Number:</span>
                    <span> {{ buildingAuthority.buildingInsuranceNumber }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Date Building Insurance Request Sent: </span>
                    <span> {{ buildingAuthority.dateInsuranceRequestSent |formatDate }} </span>
                </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row>
                 <v-col cols="12" sm="3">
                    <v-btn small color="primary" width="100%"
                        :loading="sendingIntroCouncil"
                        :disabled="buildingAuthority.introCouncilLetterSent !== null ? true : false"
                        @click="sendIntroCouncil">
                        Send Intro Council Letter
                        <v-icon class="ml-2">mdi-send</v-icon>
                    </v-btn>
                    </v-col>
            </v-row>
              <v-row>
                 <v-col cols="12" sm="3">
                    <v-btn small color="primary" width="100%" 
                        :loading="sendingOutOfCouncil"
                        :disabled="buildingAuthority.outOfCouncilLetterSent !== null ? true : false"
                        @click="sendOutOfCouncil">
                        Send Out Of Council Letter
                        <v-icon class="ml-2">mdi-send</v-icon>
                    </v-btn>
                    </v-col>
            </v-row>
              <v-row>
                 <v-col cols="12" sm="3">
                    <v-btn small color="primary" width="100%" 
                        :loading="sendingNoCouncil"
                        :disabled="buildingAuthority.noCouncilLetterSent !== null ? true : false"
                        @click="sendNoCouncil">
                        Send No Council Letter
                        <v-icon class="ml-2">mdi-send</v-icon>
                    </v-btn>
                    </v-col>
            </v-row>

            <v-row class="py-5">
                <v-spacer></v-spacer>
                <v-btn text small fab @click="showEditDialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
            </v-row>
        </v-card>
        <v-dialog v-model="showCreateDialog" persistent max-width="800px">
            <BuildingAuthorityCreateDialog
                :lead-id="leadId"
                @success="successCreateHandler"
                @close="showCreateDialog = false" />
        </v-dialog>
        <v-dialog v-model="showEditDialog" persistent max-width="800px">
            <BuildingAuthorityEditDialog
                :lead-id="leadId"
                :building-authority="buildingAuthority"
                @onContractUpdated="updateBuildingAuthority"
                @close="showEditDialog = false"
                @success="updateSuccessHandler"/>
        </v-dialog>
    </div>
</template>

<script>
import BuildingAuthorityCreateDialog from "@/components/building-authority/BuildingAuthorityCreateDialog";
import BuildingAuthorityAPI from "@/api/BuildingAuthorityAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import BuildingAuthorityEditDialog from "@/components/building-authority/BuildingAuthorityEditDialog";
import lettersAPI from "../../../api/lettersAPI";


export default {
    name: "BuildingAuthorityPartial",
    props: ['leadId'],
    components: {BuildingAuthorityEditDialog, BuildingAuthorityCreateDialog},
    data(){
        return {
            buildingAuthority: null,
            loading: false,
            showCreateDialog: false,
            showEditDialog: false,
            sendingIntroCouncil: false,
            sendingOutOfCouncil: false,
            sendingNoCouncil: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        getBuildingAuthority(leadId){
            this.loading = true;
            BuildingAuthorityAPI.getBuildingAuthority(leadId).then(response => {
                if(response.status === 200){
                    console.log(response.data.data)
                    this.buildingAuthority = response.data.data
                }
            }).catch(error => {
                this.handleError(error);
            }).finally(() => {
                this.loading = false;
            })
        },
        successCreateHandler(){
            if(this.leadId){
                this.getBuildingAuthority(this.leadId)
            }
        },
        updateSuccessHandler(buildingAuthority){
            if(buildingAuthority){
                this.buildingAuthority = Object.assign({},buildingAuthority)
            }
        },
        updateBuildingAuthority(){

        },
        sendIntroCouncil(){

            this.sendingIntroCouncil = true;
            lettersAPI.sendIntroCouncil(this.leadId).then(response => {
                this.$set(this.buildingAuthority, 'introCouncilLetterSent', response.data.intro_council_letter_sent)
            }).catch(error => {
                console.log(error)

            }).finally(() => {
                this.sendingIntroCouncil = false;
            })

        },
        sendOutOfCouncil(){

             this.sendingOutOfCouncil = true;
            lettersAPI.sendOutOfCouncil(this.leadId).then(response => {
                this.$set(this.buildingAuthority, 'outOfCouncilLetterSent', response.data.out_of_council_letter_sent)
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.sendingOutOfCouncil = false;
            })
        },
        sendNoCouncil(){

             this.sendingNoCouncil = true;
            lettersAPI.sendNoCouncil(this.leadId).then(response => {
                this.$set(this.buildingAuthority, 'noCouncilLetterSent', response.data.no_council_letter_sent)
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.sendingNoCouncil = false;
            })
        }
    },
    mounted() {
        if(this.leadId){
            this.getBuildingAuthority(this.leadId)
        }
    }
}
</script>

<style scoped>

</style>