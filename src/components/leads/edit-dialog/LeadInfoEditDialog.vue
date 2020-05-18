<template>
    <v-card>
        <v-toolbar color="blue-grey darken-1" dark >
            <v-toolbar-title>Edit Lead</v-toolbar-title>
        </v-toolbar>
        <div style="height: 10px">
            <v-progress-linear indeterminate color="green" v-if="loading" />
        </div>
        <v-card-text>
            <LeadInformationForm
                    @updateData="updateData"
                    :initial-data="lead.details"
                    :contact-postcode="lead.details.postcode"/>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$emit('close')">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updateLead" >Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import LeadInformationForm from "../form/LeadInformationForm";
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "LeadInfoEditDialog",
        components: {LeadInformationForm},
        data(){
            return {
                form: {},
                loading: false
            }
        },
        computed: {
            ...mapState('leads', ['lead'])
        },
        methods: {
            ...mapActions('leads', ['updateLeadDetails']),
            updateData(form){
                this.form = Object.assign({}, form)
            },
            updateLead(){
                this.loading = true;

                this.updateLeadDetails(this.form).then(() => {
                    console.log('Updated');
                    this.$emit('close');
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>