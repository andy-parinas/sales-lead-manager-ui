<template>
  <v-select
      v-model="value"
      :items="items"
      item-text="franchise_number"
      item-value="id"
      @change="itemsChangeHandler"
      label="Franchises"
      :loading="loading"
      prepend-icon="mdi-tools"
  ></v-select>
</template>

<script>
import SalesStaffAPI from "@/api/SalesStaffAPI";
import EventBus from "@/helpers/EventBus";

export default {
    name: "SalesStaffFranchiseSelect",
    data(){
      return {
        items: [],
        value: "",
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
      getSalesStaff(salesStaffId){
        this.loading = true;
        SalesStaffAPI.getSalesStaff(salesStaffId).then(response => {
          const salesStaff = response.data;

          if(salesStaff.franchise){
              this.items = salesStaff.franchise
          }

        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading = false;
        })
      },
      itemsChangeHandler(){
          console.log('SalesStaffFranchise Chaged')
          this.$emit('onValueChanged', this.value)
      }
    },
    mounted() {
      EventBus.$on('DESIGN_ADVISOR_SELECT_CHANGED', salesStaff =>{
          if(salesStaff){
            this.getSalesStaff(salesStaff.id)
          }else {
            this.items = [];
          }
      })
    }
}
</script>

<style scoped>

</style>