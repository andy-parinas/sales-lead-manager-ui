<template>
    <div>
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
        <v-btn bottom color="pink" dark fab fixed right @click="createLead" >
            <v-icon  >add</v-icon>
        </v-btn>
    </div>
</template>

<script>

    import LeadsTable from "../../components/leads/LeadsTable";
    import LeadDetailView from "./LeadDetailView";

    import FormWizard from "../../components/leads/wizard/FormWizard";

    import {mapActions} from 'vuex'

    export default {
        name: 'LeadTableView',
        components: {LeadsTable, LeadDetailView, FormWizard},
        data(){
            return {
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
            },
            createLead(){
                this.$router.push({name: 'LeadCreate'})
            }
        },
        mounted() {
        }
    }
</script>

<style>

</style>