<template>
  <div>
      <PageHeader title="Sales Leads" class="mb-1" />
      <v-alert text outlined color="deep-orange" icon="mdi-alert" dismissible v-if="error" >
          {{ message }}
      </v-alert>
      <v-row class="mt-6" justify="center" v-show="!isDetailShown && !isFormShown">
          <v-col cols="12" sm="12" md="12">
              <LeadsTable @showDetail="showDetail" />
          </v-col>
      </v-row>
      <div v-if="isDetailShown && !isFormShown">
          <LeadDetailView @goBack="goBack" />
      </div>
      <div v-if="isFormShown">
          <FormWizard @cancel="cancelForm" />
      </div>
      <v-btn bottom color="pink" dark fab fixed right @click="showForm" >
          <v-icon  >add</v-icon>
      </v-btn>
  </div>
</template>

<script>
    import PageHeader from "../../components/core/PageHeader";
    import LeadsTable from "../../components/leads/LeadsTable";
    import LeadDetailView from "./LeadDetailView";

    import FormWizard from "../../components/leads/wizard/FormWizard";

    import {mapActions} from 'vuex'

    export default {
        name: 'Lead',
        components: {PageHeader, LeadsTable, LeadDetailView, FormWizard},
        data(){
            return {
                error: false,
                isDetailShown: false,
                isFormShown: false
            }
        },
        methods: {
            ...mapActions('leads', ['fetchSingleLead', 'clearLeadObject']),
            setErrorState(){

            },
            showDetail(id){
                this.$store.dispatch('setAppLoadingState', true)
                this.fetchSingleLead(id).then(() => {
                    this.isDetailShown = true;
                    this.$store.dispatch('setAppLoadingState', false)
                }).catch(error => {
                    console.log(error)
                    this.$store.dispatch('setAppLoadingState', false)
                })
            },
            goBack(){
                setTimeout(() => {
                    this.clearLeadObject();
                }, 1000)
                this.isDetailShown = false;
            },
            showForm(){
                console.log('ShowForm')
                this.isFormShown = true;
            },
            cancelForm(){
                this.isFormShown = false;
            }
        },
        mounted() {
        }
    }
</script>

<style>

</style>