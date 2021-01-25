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
        <v-card flat class="mx-10" v-if="verification === null && !loading">
            <v-row >
                <v-col cols="12" sm="6">
                    <span class="ml-2  heading-6 font-weight-medium grey--text"> No Lead Verification Available </span>
                    <v-btn text color="primary" class="mr-2" @click="showCreateDialog =true">Click Here to Create</v-btn>
                </v-col>
            </v-row>
        </v-card>

        <v-card flat class="mx-10 mt-5" v-if="verification && !loading">
            <span class="font-weight-medium caption my-2" >Design Details</span>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-thumb-up</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Design Correct:</span>
                    <span> {{ verification.designCorrect | capitalize }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Design Check Date:</span>
                    <span> {{  verification.dateDesignCheck | formatDate  }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-thumb-up</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Costing Correct:</span>
                    <span> {{ verification.costingCorrect | capitalize }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Costing Check Date:</span>
                    <span> {{ verification.dateCostingCheck | formatDate }} </span>
                </v-col>
            </v-row>
            <span class="font-weight-medium caption my-2" >Build Details</span>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-blank-multiple</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Estimated Build Days:</span>
                    <span> {{ verification.estimatedBuildDays }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-tools</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Trades Required:</span>
                    <span> {{ verification.tradesRequired }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-account-hard-hat</v-icon>
                    <span class="ml-2 font-weight-medium caption">Building Supervisor:</span>
                    <span> {{  verification.buildingSupervisor  }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6"></v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-home-outline</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Current Roof Sheet Product:</span>
                    <span> {{ verification.roofSheet }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-home-outline</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Current Roof Sheet Colour:</span>
                    <span> {{ verification.roofColour }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-tape-measure</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Lineal Metres:</span>
                    <span> {{  verification.linealMetres  }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6"></v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-store</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Franchise Authority:</span>
                    <span> {{ verification.franchiseAuthority }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Authority Date:</span>
                    <span> {{ verification.authorityDate | formatDate }} </span>
                </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-icon small>mdi-calendar-month</v-icon>
                <span class="ml-2 font-weight-medium caption"> Date SpanPak and Blue Clean Sent:</span>
                <span> {{ verification.dateMaintenanceLetterSent | formatDate }} </span>
              </v-col>
            </v-row>
            <v-row class="py-5">
                <v-spacer></v-spacer>
                <v-btn text small fab @click="showEditDialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
            </v-row>
        </v-card>
        <v-dialog v-model="showCreateDialog" persistent max-width="800px">
            <VerificationCreateDialog
                :lead-id="leadId"
                @success="successCreateHandler"
                @close="showCreateDialog = false" />
        </v-dialog>
        <v-dialog v-model="showEditDialog" persistent max-width="800px">
            <VerificationEditDialog
                :lead-id="leadId"
                :verification="verification"
                @close="showEditDialog = false"
                @success="updateSuccessHandler"/>
        </v-dialog>
    </div>
</template>

<script>
import VerificationAPI from "@/api/VerificationAPI";
import VerificationCreateDialog from "@/components/verification/VerificationCreateDialog";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import VerificationEditDialog from "@/components/verification/VerificationEditDialog";

export default {
    name: "VerificationPartial",
    components: {VerificationEditDialog, VerificationCreateDialog},
    props: ['leadId'],
    data(){
        return {
            verification: null,
            loading: false,
            showCreateDialog: false,
            showEditDialog: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        getVerification(leadId){
            this.loading = true;
            VerificationAPI.getVerification(leadId).then(response => {
                if(response.status === 200){
                    this.verification = response.data.data
                    console.log(this.verification);
                }
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false;
            })
        },
        successCreateHandler(){
            if(this.leadId){
                this.getVerification(this.leadId)
            }
        },
        updateSuccessHandler(verification){
            if(verification){
                this.verification = Object.assign({}, verification);
            }
        }
    },
    mounted() {
        if(this.leadId){
            this.getVerification(this.leadId)
        }
    }
}
</script>

<style scoped>

</style>