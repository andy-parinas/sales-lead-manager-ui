<template>
    <div>
        <LeadInformationForm
                @updateData="updateData"
                :initialData="initialData"
                :contactPostcodeId="contactPostcodeId"
                ref="leadForm">
            <template v-slot:customer-type>
                <v-text-field v-if="selectedContact"
                        prepend-icon="mdi-briefcase"
                        label="Lead Type"
                        :value="selectedContact.customerType | capitalize "
                        readonly
                />
            </template>
        </LeadInformationForm>
       <v-container>
           <div v-if="selectedContact">
               <v-row>
                   <v-col cols="12" sm="6">
                       <v-icon small>mdi-account</v-icon>
                       <span class="ml-2"> {{ selectedContact.firstName}} {{ selectedContact.lastName }} </span>
                   </v-col>
                   <v-col cols="12" sm="6">
                       <v-icon small>mdi-phone</v-icon>
                       <span class="ml-2">{{ selectedContact.contactNumber }}</span>
                   </v-col>
               </v-row>
               <v-row>
                   <v-col cols="12" sm="6">
                       <v-icon small>mdi-email</v-icon>
                       <span class="ml-2"> {{ selectedContact.email }}</span>
                   </v-col>
                   <v-col cols="12" sm="6">
                       <v-icon small>mdi-email</v-icon>
                       <span class="ml-2">{{ selectedContact.email2 }}</span>
                   </v-col>
               </v-row>
               <v-row>
                   <v-col cols="12" sm="6">
                       <v-icon small>mdi-home</v-icon>
                       <span class="ml-2">{{ selectedContact.street1 }}</span>
                   </v-col>
                   <v-col cols="12" sm="6">
                       <v-icon small>mdi-sign-direction</v-icon>
                       <span class="ml-2"> {{ selectedContact.street2 }}</span>
                   </v-col>
               </v-row>
               <v-row>
                   <v-col cols="12" sm="12">
                       <v-icon small>mdi-map</v-icon>
                       <span class="ml-2">{{selectedContact.suburb}}, {{selectedContact.state}}, {{selectedContact.postcode}}</span>
                   </v-col>
               </v-row>
               <v-divider class="my-5"></v-divider>
           </div>
           <v-row>
               <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Back</v-btn>
               <v-btn color="primary"
                      @click="moveNext"
                      :disabled="!isFormValid">Continue</v-btn>
               <v-spacer></v-spacer>
               <v-btn color="primary" class="mr-2" @click="$emit('cancel')">Cancel</v-btn>
           </v-row>
       </v-container>
    </div>
</template>

<script>

    import LeadInformationForm from "../form/LeadInformationForm";
    import {mapState} from "vuex";
    //import PostcodeAPI from "../../../api/PostcodeAPI";

    export default {
        name: "LeadInfoWizardItem",
        components: {LeadInformationForm},
        data(){
            return {
                menu: false,
                valid: false,
                franchisePostcodes: [],
                franchiseChecking: false,
                contactPostcodeId: '',
                postcodeStatus: '',
                form: {
                    leadNumber: '',
                    franchiseId: '',
                    franchiseNumber: '',
                    leadSourceId: '',
                    leadSource: '',
                    leadDate: new Date().toISOString().substr(0, 10),
                    postcodeStatus: ''

                },
                initialData: {
                    leadNumber: '',
                    franchiseId: '',
                    franchiseNumber: '',
                    leadSourceId: '',
                    leadSource: '',
                    leadDate: new Date().toISOString().substr(0, 10),
                }

            }
        },
        methods: {
            moveNext(){

                this.$emit('moveNext', {
                    details: {
                        ...this.form,
                        ...this.selectedContact
                    }
                })
            },
            updateData(form){
                this.form = Object.assign({}, form)
            },
            // checkFranchisePostcode(){
            //     this.franchiseChecking = true;
            //     PostcodeAPI.checkFranchisePostcode(this.form.franchiseId,
            //         this.selectedContact.postcodeId).then(response => {
            //
            //             console.log('Check results: ', response.data)
            //
            //             if(response.data){
            //                 this.postcodeStatus = 'INSIDE_FRANCHISE';
            //                 this.form.postcodeStatus = 'inside_of_franchise'
            //             }else {
            //                 this.postcodeStatus = 'OUTSIDE_FRANCHISE';
            //                 this.form.postcodeStatus = 'outside_of_franchise'
            //             }
            //
            //     }).catch(error => {
            //
            //         console.log(error);
            //
            //     }).finally(() => {
            //         this.franchiseChecking = false;
            //     })
            // },

        },
        computed: {
            ...mapState('salesContacts', ['selectedContact']),
            isFormValid(){
                return this.form.leadNumber !== '' && this.form.franchiseId !== '' && this.form.leadSourceId !== '' && this.form.leadDate !== ''
            }
        },
        watch: {
            selectedContact: {
                handler(){
                    if(this.selectedContact){
                        this.contactPostcodeId = this.selectedContact.postcodeId
                        if(this.form.franchiseId !== ''){
                            if(this.franchiseChecking) return;
                            this.$refs.leadForm.checkFranchisePostcode();
                        }
                    }
                },
                deep: true
            },
        },
        mounted() {
            if(this.selectedContact){
                this.contactPostcodeId = this.selectedContact.postcodeId
            }
        }


    }
</script>

<style scoped>

</style>