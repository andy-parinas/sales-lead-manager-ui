<template>
  <div>
      <PageHeader title="Sales Contact" />
      <button @click="getData">Get Data</button>
  </div>
</template>

<script>
    import PageHeader from "../components/core/PageHeader";
    import SalesContact from "../api/SalesContact";

    export default {

        name: 'SalesContact',
        components: {PageHeader},
        methods: {
            async getData(){
                const  contacts = await SalesContact.getAll();

                console.log(contacts);
            }
        }



    }
</script>

<style>

</style>