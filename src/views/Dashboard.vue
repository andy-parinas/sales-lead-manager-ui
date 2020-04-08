<template>
  <div>
      <h1 class="subheading grey--text">Dashboard</h1>
      <v-divider></v-divider>
      <v-container class="my-5">

        <!-- Start of Statistics Information -->
        <!-- this needs to be on separate components -->

        <v-row class="mb-5">
          <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" color="green darken-2" dark >
                     <v-card-title>
                        <v-icon large left> today </v-icon>
                        <span class="title font-weight-light">Today's Leads</span>
                      </v-card-title>
                      <v-card-text > 
                        <v-row align="center" class="mx-0">
                          <div class="display-2 font-weight-bold white--text">10</div>
                          <div class="ml-2">Leads</div>
                        </v-row>
                        <v-row class="mx-0" justify="end">
                            <v-btn text x-small><v-icon small>refresh</v-icon></v-btn>
                        </v-row>
                      </v-card-text>
                </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" color="blue darken-2" dark >
                     <v-card-title>
                        <v-icon large left> date_range  </v-icon>
                        <span class="title font-weight-light">This Week's Leads</span>
                      </v-card-title>
                      <v-card-text > 
                        <v-row align="center" class="mx-0">
                          <div class="display-2 font-weight-bold white--text">59</div>
                          <div class="ml-2">Leads</div>
                        </v-row>
                        <v-row class="mx-0" justify="end">
                            <!-- <span class="caption">Refreshing...</span> -->
                            <v-btn text x-small><v-icon small>refresh</v-icon></v-btn>
                        </v-row>
                      </v-card-text>
                </v-card>
          </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" color="orange darken-2" dark >
                     <v-card-title>
                        <v-icon large left> people </v-icon>
                        <span class="title font-weight-light">All Leads</span>
                      </v-card-title>
                      <v-card-text > 
                        <v-row align="center" class="mx-0">
                          <div class="display-2 font-weight-bold white--text">500</div>
                          <div class="ml-2">Leads</div>
                        </v-row>
                        <v-row class="mx-0" justify="end">
                            <v-btn text x-small><v-icon small>refresh</v-icon></v-btn>
                        </v-row>
                      </v-card-text>
                </v-card>
          </v-col>
        </v-row>

        <!-- End of Statistics Information -->

        <v-divider></v-divider>

        <!-- start of Subfranchises Info. This is for Franchise Admin Only -->
        <!-- this needs to be on sperate components -->
        <v-row align="center" justify="start" class="mt-8">
          <v-col cols="12" sm="5" md="5" lg="5">
            <v-card class="mx-auto">
              <v-toolbar color="light-blue" dark>
                <v-toolbar-title>Sub Franchises</v-toolbar-title>
              </v-toolbar>

              <v-list two-line subheader>
                <v-list-item v-for="item in items" :key="item.title" @click="itemClicked" >
                  <v-list-item-content>
                    <v-list-item-title>
                      <span class="grey--text text--darken-1" >Franchise Number: </span>
                      <span class="font-weight-bold" > {{ item.title }} </span>
                    </v-list-item-title>
                    <v-list-item-subtitle class="mt-1">
                      <span class="font-weight-medium">{{item.subtitle}}</span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

        <!-- End of Subfranchises Info -->

      </v-container>
  </div>
</template>

<script>
export default {
    name: 'Dashboard',
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
      }
    }
}
</script>

<style>

</style>