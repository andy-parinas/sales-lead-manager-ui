<template>
  <div>
      <PageHeader title="Sales Leads" class="mb-1" />
      <v-alert text outlined color="deep-orange" icon="mdi-alert" dismissible v-if="error" >
          {{ message }}
      </v-alert>
      <v-row class="mt-6" justify="center" v-show="!isDetailShown">
          <v-col cols="12" sm="12" md="12">
              <LeadsTable @showDetail="showDetail" />
          </v-col>
      </v-row>
      <div v-if="isDetailShown">
          <LeadDetailView @goBack="goBack" />
      </div>
      <v-btn bottom color="pink" dark fab fixed right >
          <v-icon  >add</v-icon>
      </v-btn>
  </div>
</template>

<script>
    import PageHeader from "../../components/core/PageHeader";
    import LeadsTable from "../../components/leads/LeadsTable";
    import LeadDetailView from "./LeadDetailView";


    import {mapActions} from 'vuex'

    export default {
        name: 'Lead',
        components: {PageHeader, LeadsTable, LeadDetailView},
        data(){
            return {
                error: false,
                isDetailShown: false,
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
        },
        mounted() {
        }
    }
</script>

<style>

</style>