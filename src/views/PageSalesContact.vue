<template>
  <div>
      <PageHeader title="Sales Contact" class="mb-1" />
      <SalesContactsTable class="mt-6 px-5 mx-5" />
  </div>
</template>

<script>
    import PageHeader from "../components/core/PageHeader";
    import SalesContactsTable from "../components/contacts/SalesContactsTable";

    export default {

        name: 'PageSalesContact',
        components: {PageHeader, SalesContactsTable},
        data(){
            return {}
        },
        computed: {
        },
        methods: {
        },
        mounted() {
        }


    }
</script>

<style>

</style>