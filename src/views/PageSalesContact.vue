<template>
  <div>
      <PageHeader title="Sales Contact" />
      <SalesContactsTable :data="salesContacts" class="mt-6 px-5 mx-5" />
  </div>
</template>

<script>
    import PageHeader from "../components/core/PageHeader";
    import {mapActions, mapState} from 'vuex'
    import SalesContactsTable from "../components/contacts/SalesContactsTable";

    export default {

        name: 'PageSalesContact',
        components: {PageHeader, SalesContactsTable},
        data(){
            return {}
        },
        computed: {
            ...mapState('salesContacts', {
                salesContacts: state => state.salesContacts
            })
        },
        methods: {
            ...mapActions('salesContacts', ['fetchSalesContacts'])
        },
        mounted() {
            this.$store.dispatch('setAppLoadingState', true)
            this.fetchSalesContacts().then(() => {
                this.$store.dispatch('setAppLoadingState', false)
            }).catch(error => {
                console.log('PageSalesContacts', error.response)
                this.$store.dispatch('setAppLoadingState', false)
            })
        }


    }
</script>

<style>

</style>