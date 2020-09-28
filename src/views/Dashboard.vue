<template>
  <div>
      <PageHeader title="Dashboard" />
      <v-container class="my-5">

        <!-- Start of Statistics Information -->
        <!-- this needs to be on separate components -->

        <v-row class="mb-5">
            <v-col cols="12" sm="6" md="6" xl="4">
                <AllOutcome />
            </v-col>
            <v-col cols="12" sm="6" md="6" xl="4">
                <SuccessfulOutcome />
            </v-col>
            <v-col cols="12" sm="6" md="6" xl="4">
                <PendingOutcome />
            </v-col>
            <v-col cols="12" sm="6" md="6" xl="4">
                <CancelledOutcome />
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2>Current Month's Number of Leads Per Product</h2>
                <ProductChart />
            </v-col>
        </v-row>

      </v-container>
  </div>
</template>

<script>
    import PageHeader from "../components/core/PageHeader";
    import AllOutcome from "@/components/dashboard/AllOutcome";
    import SuccessfulOutcome from "@/components/dashboard/SuccessfulOutcome";
    import PendingOutcome from "@/components/dashboard/PendingOutcome";
    import CancelledOutcome from "@/components/dashboard/CancelledOutcome";
    import ProductChart from "@/components/dashboard/ProductChart";
    export default {
        name: 'Dashboard',
        components: {ProductChart, CancelledOutcome, PendingOutcome, SuccessfulOutcome, AllOutcome, PageHeader},
        data: () => ({
          items: [
            { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '12321312', subtitle: 'Gold Coast Franchise' },
            { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '54353534', subtitle: 'South Brisbane Franchise' },
            { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '65432432', subtitle: 'Sydney Franchise' },
          ]
        }),

        methods: {
            itemClicked: () => {
            console.log('Item Clicked');
            },



        },
        mounted() {
            // this.getProductForTheMonth()
        }
    }
</script>

<style>

</style>