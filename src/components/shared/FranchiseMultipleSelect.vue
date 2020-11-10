<template>
  <v-select
      v-model="value"
      :items="items"
      item-text="franchiseNumber"
      item-value="id"
      @change="itemsChangeHandler"
      chips
      label="Franchises"
      :loading="loading"
      prepend-icon="mdi-tools"
      multiple
  ></v-select>
</template>

<script>
import FranchiseAPI from "@/api/FranchiseAPI";

export default {
    name: "FranchiseMultipleSelect",
    data(){
        return {
            items: [],
            value: [],
            loading: false,
            pageOptions: {
              page: 1,
              itemsPerPage: 500,
              sortBy: ['id'],
              sortDesc: [false],
            },
        }
    },
    methods: {

        getFranchises(){
          this.loading = true
           FranchiseAPI.getAllSubFranchises(this.pageOptions).then(response => {
              console.log('Franchise Select', response)
             this.items = response.data
           }).catch(error => {
              console.log(error)
           }).finally(() => {
              this.loading = false
           })
        },
        itemsChangeHandler(){
            this.$emit("onSelectionChanged", this.value)
        }

    },
    mounted() {
        this.getFranchises()
    }
}
</script>

<style scoped>

</style>