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
        <v-card flat class="mx-10" v-if="construction === null && !loading">
            <v-row >
                <v-col cols="12" sm="6">
                    <span class="ml-2  heading-6 font-weight-medium grey--text"> No Construction Details Available </span>
                    <v-btn text color="primary" class="mr-2" @click="showCreateDialog =true">Click Here to Create</v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card flat class="mx-10" v-if="construction && !loading">
            <v-card-text>
                <span class="font-weight-medium caption" >Site Address</span>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-icon small>mdi-home</v-icon>
                        <span class="ml-2"> {{ construction.siteAddress }} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-map</v-icon>
                        <span class="ml-2"> {{ construction.postcode.suburb }}, {{ construction.postcode.state}}, {{ construction.postcode.postcode }}</span>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <span class="font-weight-medium caption">Manufacturing/Assembly Details</span>
                <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-icon small>mdi-clipboard-list</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Material List:  </span>
                        <span> {{ construction.materialList }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Date Materials Received:</span>
                        <span> {{ construction.dateAnticipatedDelivery }} </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Date Assembly Completed:</span>
                        <span> {{ construction.dateAssemblyCompleted }} </span>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <span class="font-weight-medium caption">Manufacturing/Delivery Details</span>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Anticipated Delivery Date:</span>
                        <span> {{ construction.dateAnticipatedDelivery }} </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Finished Product Delivery Date:</span>
                        <span> {{ construction.dateFinishedProductDelivery }} </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-clipboard-list</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Coil Number:</span>
                        <span> {{ construction.coilNumber }} </span>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <span class="font-weight-medium caption">Building Details</span>
                <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-icon small>mdi-tools</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Builders Name:</span>
                        <span> {{ construction.tradeStaff.name }} </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Anticipated Construction Start:</span>
                        <span> {{ construction.anticipatedConstructionStart }} </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Actual Construction Start:</span>
                        <span> {{ construction.actualConstructionStart }} </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Anticipated Completion Date:</span>
                        <span> {{ construction.anticipatedConstructionComplete }} </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Actual Completion Date:</span>
                        <span> {{ construction.actualConstructionComplete}} </span>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                        <v-icon small>mdi-comment</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Comments:</span>
                        <span> {{ construction.comments }} </span>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <span class="font-weight-medium caption">Inspection Details</span>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Final Inspection Date:</span>
                        <span> {{ construction.finalInspectionDate }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn text small fab><v-icon>mdi-pencil</v-icon></v-btn>
                </v-row>
            </v-card-text>
        </v-card>
        <v-dialog v-model="showCreateDialog" persistent max-width="800px">
            <ConstructionCreateDialog
                    :lead-id="leadId"
                    :siteAddress="leadAddress"
                    @close="showCreateDialog = false" />
        </v-dialog>
    </div>
</template>

<script>
    import ConstructionAPI from "../../../api/ConstructionAPI";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import ConstructionCreateDialog from "../../../components/constructions/ConstructionCreateDialog";
    import EventBus from "../../../helpers/EventBus";
    import {mapState} from 'vuex';

    export default {
        name: "ConstructionPartial",
        components: {ConstructionCreateDialog},
        props: ['leadId', 'leadDetails'],
        data(){
            return {
                construction: null,
                loading: false,
                showCreateDialog: false
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
          ...mapState('leads', ['lead']),
          leadAddress(){
              if(this.lead && this.lead.details){
                  return {
                      siteAddress: this.lead.details.street1,
                      postcodeId: this.lead.details.postcode.id
                  }
              }else {

                return null;
              }

          }
        },
        methods: {
            getConstruction(leadId){
                this.loading = true
                ConstructionAPI.getConstruction(leadId).then(response => {
                    if(response && response.status === 200){
                        this.construction = Object.assign({}, response.data.data)
                        console.log(this.construction)
                    }
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.loading = false;
                })
            }
        },
        mounted() {
            if(this.leadId){
                this.getConstruction(this.leadId)
            }

            EventBus.$on('LEAD_CONSTRUCTION_UPDATE', () => this.getConstruction(this.leadId))
        }
    }
</script>

<style scoped>

</style>