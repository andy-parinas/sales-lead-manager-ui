<template>
  <v-app>
      <Navbar />
      <v-content>
          <router-view></router-view>
      </v-content>
  </v-app>
</template>

<script>

import Navbar from '../components/core/Navbar';


export default {
    name: 'MainPage',
    components: { Navbar}
}
</script>

<style>

</style>