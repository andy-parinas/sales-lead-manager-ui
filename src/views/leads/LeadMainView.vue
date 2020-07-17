<template>
  <div>
      <PageHeader title="Sales Leads" class="mb-1" />
      <v-alert text outlined color="deep-orange" icon="mdi-alert" dismissible v-if="error" >
          {{ message }}
      </v-alert>
<!--      <LeadTableView />-->
      <router-view></router-view>
  </div>
</template>

<script>

    import PageHeader from "../../components/core/PageHeader";

    export default {
        name: 'Lead',
        components: {PageHeader},
        data(){
            return{
                message: '',
                error: ''
            }
        }

    }
</script>

<style>

</style>