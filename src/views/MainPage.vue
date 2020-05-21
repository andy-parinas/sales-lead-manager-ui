<template>
  <v-app>
      <Navbar />
      <v-content class="ma-4">
          <router-view></router-view>
          <v-snackbar v-model="showSuccessMessage" color="success" :timeout="0" :bottom="true" >
              {{ successMessage }}
              <v-btn dark text @click="closeSnackbar" > Close </v-btn>
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
    computed: {
        ...mapState(['successMessage', 'showSuccessMessage'])
    },
    methods: {
        ...mapActions(['setSuccessMessage']),
        closeSnackbar(){
            this.setSuccessMessage(null)
        }
    }
}
</script>

<style>

</style>