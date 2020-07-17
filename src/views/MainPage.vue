<template>
  <v-app>
      <Navbar />
      <v-content class="ma-4">
          <router-view></router-view>
          <v-snackbar v-model="showSuccessMessage" color="success" :timeout="0" :top="true" >
              {{ successMessage }}
              <v-btn dark small fab text @click="closeSuccessSnackbar" > <v-icon small>mdi-close</v-icon> </v-btn>
          </v-snackbar>
          <v-snackbar v-model="showErrorMessage" color="error" :timeout="0" :top="true" >
              {{ errorMessage }}
              <v-btn dark small fab text @click="closeErrorSnackbar" > <v-icon small>mdi-close</v-icon> </v-btn>
          </v-snackbar>
      </v-content>
  </v-app>
</template>

<script>

import Navbar from '../components/core/Navbar';
import {mapState, mapActions} from 'vuex'

export default {
    name: 'MainPage',
    components: { Navbar},
    data(){
        return {
            snackbar: true
        }
    },
    computed: {
        ...mapState(['successMessage', 'showSuccessMessage', 'showErrorMessage', 'errorMessage'])
    },
    methods: {
        ...mapActions(['setSuccessMessage', 'setErrorMessage']),
        closeSuccessSnackbar(){
            this.setSuccessMessage(null)
        },
        closeErrorSnackbar(){
            this.setErrorMessage(null)
        }
    }
}
</script>

<style>

</style>