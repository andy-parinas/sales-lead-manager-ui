<template>
  <div>
      <PageHeader title="Sales Contact" class="mb-1" />
      <v-row class="mt-6" justify="center">
          <v-col cols="12" sm="12" md="10">
              <SalesContactsTable  />
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

            }
        },
        computed: {
        },
        methods: {
        },
        mounted() {
        }


    }
</script>

<style>

</style>