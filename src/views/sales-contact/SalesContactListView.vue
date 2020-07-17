<template>
  <div>
      <PageHeader title="Sales Contact" class="mb-1" />
      <v-row class="mt-6" justify="center">
          <v-col cols="12" sm="12" md="10">
              <SalesContactsTable />
          </v-col>
      </v-row>
      <v-dialog v-model="showCreateDialog"  persistent width="850px">
          <SalesContactCreateDialog
                  @close="closeDialog"/>
      </v-dialog>

      <v-btn bottom color="pink" dark fab fixed right @click="showCreateDialog = true" >
          <v-icon  >add</v-icon>
      </v-btn>
  </div>
</template>

<script>
    import PageHeader from "../../components/core/PageHeader";
    import SalesContactsTable from "../../components/contacts/SalesContactsTable";
    import SalesContactCreateDialog from "../../components/contacts/SalesContactCreateDialog";

    export default {

        name: 'PageSalesContact',
        components: {SalesContactCreateDialog, PageHeader, SalesContactsTable},
        data(){
            return {
                showCreateDialog: false,
                error: false,
                message: ''
            }
        },
        computed: {
        },
        methods: {
            closeDialog(){
                this.showCreateDialog = false;
            }
        },
        mounted() {
        }


    }
</script>

<style>

</style>