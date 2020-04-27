<template>
  <router-view></router-view>
</template>

<script>

  import {mapActions} from 'vuex';

  export default {
    name: 'App',

    components: {
    },

    data: () => ({
      //
    }),
    methods: {
      ...mapActions('auth', ['getUserFromStorage'])
    },
    mounted() {
      this.getUserFromStorage();
    }
};
</script>
