<template>
  <div>
      <PageHeader title="Sales Contact" class="mb-1" />
      <v-alert text outlined color="deep-orange" icon="mdi-alert" dismissible v-if="error" >
          {{ message }}
      </v-alert>
      <v-row class="mt-6" justify="center">
          <v-col cols="12" sm="12" md="10">
              <SalesContactsTable @throwError="setErrorState"  />
          </v-col>
      </v-row>
  </div>
</template>

<script>
    import PageHeader from "../components/core/PageHeader";
    import SalesContactsTable from "../components/contacts/SalesContactsTable";

    export default {

        name: 'PageSalesContact',
        components: {PageHeader, SalesContactsTable},
        data(){
            return {
                error: false,
                message: ''
            }
        },
        computed: {
        },
        methods: {
            setErrorState(status, message){
                this.error = status;
                this.message = message;
            }
        },
        mounted() {
        }


    }
</script>

<style>

</style>