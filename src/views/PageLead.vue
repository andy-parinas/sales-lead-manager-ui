<template>
  <div>
      <PageHeader title="Sales Leads" class="mb-1" />
      <v-alert text outlined color="deep-orange" icon="mdi-alert" dismissible v-if="error" >
          {{ message }}
      </v-alert>
      <v-row class="mt-6" justify="center">
          <v-col cols="12" sm="12" md="12">
              <LeadsTable @throwError="setErrorState" />
          </v-col>
      </v-row>
  </div>
</template>

<script>
    import LeadsTable from "../components/leads/LeadsTable";
    import PageHeader from "../components/core/PageHeader";

    export default {
        name: 'Lead',
        components: {LeadsTable, PageHeader},
        data(){
            return {
                error: false,
                message: ''
            }
        },
        methods: {
            setErrorState(status, message){
                this.error = status;
                this.message = message;
            }
        },
    }
</script>

<style>

</style>