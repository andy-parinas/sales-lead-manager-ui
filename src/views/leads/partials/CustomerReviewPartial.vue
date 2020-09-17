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
        <v-card flat class="mx-10" v-if="customerReview === null && !loading">
            <v-row >
                <v-col cols="12" sm="6">
                    <span class="ml-2  heading-6 font-weight-medium grey--text"> No Customer Review Available </span>
                    <v-btn text color="primary" class="mr-2" @click="showCreateDialog =true">Click Here to Create</v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card flat class="mx-10 mt-5" v-if="customerReview && !loading">
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Date Project Completed:</span>
                    <span> {{  customerReview.dateProjectCompleted | formatDate }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Date Warranty Received:</span>
                    <span> {{ customerReview.dateWarrantyReceived | formatDate }} </span>
                </v-col>

                <v-col cols="12" sm="6" md="12">
                    <v-icon small>mdi-home-outline</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Type Of Home Addition:</span>
                    <span> {{ customerReview.homeAdditionType }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                    <v-icon small>mdi-home-outline</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Home Addition Description:</span>
                    <span> {{ customerReview.homeAdditionDescription }} </span>
                </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row>
                <v-col cols="12" sm="6" md="12">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> How Would You Rate The Service You Received:</span>
                    <span> {{  customerReview.serviceReceivedRating }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> How Would You Rate The Workmanship Of Your Spanline Home Addition:</span>
                    <span> {{ customerReview.workmanshipRating }} </span>
                </v-col>

                <v-col cols="12" sm="6" md="12">
                    <v-icon small>mdi-home-outline</v-icon>
                    <span class="ml-2 font-weight-medium caption"> How Would You Rate Your Satisfaction With The Finished Product:</span>
                    <span> {{ customerReview.finishedProductRating }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                    <v-icon small>mdi-home-outline</v-icon>
                    <span class="ml-2 font-weight-medium caption"> How Would You Rate The Quality,Service And Advise Of Your Design Consultant:</span>
                    <span> {{  customerReview.designConsultantRating }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                    <v-icon small>mdi-home-outline</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Customer Comments:</span>
                    <span> {{ customerReview.comments }} </span>
                </v-col>
            </v-row>
        </v-card>
        <v-dialog v-model="showCreateDialog" persistent max-width="800px">
            <CustomerReviewCreateDialog
                :lead-id="leadId"
                @success="successCreateHandler"
                @close="showCreateDialog = false" />
        </v-dialog>
    </div>
</template>

<script>
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import CustomerReviewCreateDialog from "@/components/customer-review/CustomerReviewCreateDialog";
import CustomerReviewAPI from "@/api/CustomerReviewAPI";

export default {
    name: "CustomerReviewPartial",
    components: {CustomerReviewCreateDialog},
    props: ['leadId'],
    data(){
        return {
            customerReview: null,
            loading: false,
            showCreateDialog: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        getCustomerReview(leadId){
            this.loading = true
            CustomerReviewAPI.getCustomerReview(leadId).then(response => {
                if(response.status === 200){
                    this.customerReview = response.data.data
                    console.log(this.customerReview)
                }
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false
            })
        },
        successCreateHandler(){

        }
    },
    mounted() {
        if(this.leadId){
            this.getCustomerReview(this.leadId)
        }
    }
}
</script>

<style scoped>

</style>