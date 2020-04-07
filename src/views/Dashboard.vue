<template>
  <div>
      <h1 class="subheading grey--text">Dashboard</h1>
      <v-divider></v-divider>
      <v-container class="my-5">
        <v-row>
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
      </v-container>
  </div>
</template>

<script>
export default {
    name: 'Dashboard'
}
</script>

<style>

</style>