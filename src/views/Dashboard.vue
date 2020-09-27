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

<!--        &lt;!&ndash; End of Statistics Information &ndash;&gt;-->

<!--        <v-divider></v-divider>-->

<!--        &lt;!&ndash; start of Subfranchises Info. This is for Franchise Admin Only &ndash;&gt;-->
<!--        &lt;!&ndash; this needs to be on sperate components &ndash;&gt;-->
<!--        <v-row align="center" justify="start" class="mt-8">-->
<!--          <v-col cols="12" sm="5" md="5" lg="5">-->
<!--            <v-card class="mx-auto">-->
<!--              <v-toolbar color="light-blue" dark>-->
<!--                <v-toolbar-title>Sub Franchises</v-toolbar-title>-->
<!--              </v-toolbar>-->

<!--              <v-list two-line subheader>-->
<!--                <v-list-item v-for="item in items" :key="item.title" @click="itemClicked" >-->
<!--                  <v-list-item-content>-->
<!--                    <v-list-item-title>-->
<!--                      <span class="grey&#45;&#45;text text&#45;&#45;darken-1" >Franchise Number: </span>-->
<!--                      <span class="font-weight-bold" > {{ item.title }} </span>-->
<!--                    </v-list-item-title>-->
<!--                    <v-list-item-subtitle class="mt-1">-->
<!--                      <span class="font-weight-medium">{{item.subtitle}}</span>-->
<!--                    </v-list-item-subtitle>-->
<!--                  </v-list-item-content>-->
<!--                </v-list-item>-->
<!--              </v-list>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--        </v-row>-->

<!--        &lt;!&ndash; End of Subfranchises Info &ndash;&gt;-->

      </v-container>
  </div>
</template>

<script>
    import PageHeader from "../components/core/PageHeader";
    import ReportAPI from "@/api/ReportAPI";
    import AllOutcome from "@/components/dashboard/AllOutcome";
    import SuccessfulOutcome from "@/components/dashboard/SuccessfulOutcome";
    import PendingOutcome from "@/components/dashboard/PendingOutcome";
    import CancelledOutcome from "@/components/dashboard/CancelledOutcome";
    export default {
        name: 'Dashboard',
        components: {CancelledOutcome, PendingOutcome, SuccessfulOutcome, AllOutcome, PageHeader},
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

            getProductForTheMonth(){
                const dateNow = new Date();
                const dateNowArray = dateNow.toLocaleDateString().split("/")

                const dateMonthAgo = new Date();
                dateMonthAgo.setMonth(dateNow.getMonth() - 1);

                const dateMonthAgoArray = dateMonthAgo.toLocaleDateString().split("/")


                const formData = {
                    startDate: `${dateMonthAgoArray[2]}-${dateMonthAgoArray[1]}-${dateMonthAgoArray[0]}`,
                    endDate: `${dateNowArray[2]}-${dateNowArray[1]}-${dateNowArray[0]}`
                }


                ReportAPI.getOutcome(formData).then(response => {
                    console.log(response.data)
                }).catch(error => {
                    console.log(error)
                })

            },

        },
        mounted() {
            this.getProductForTheMonth()
        }
    }
</script>

<style>

</style>