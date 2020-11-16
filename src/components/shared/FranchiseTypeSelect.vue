<template>
    <div>
        <v-autocomplete
          v-model="franchiseType"
          :items="franchiseTypes"
          clearable
          color="black"
          label="Franchise Type"
          no-filter
          prepend-icon="mdi-city"
          @change="franchiseTypeValueChanged"
      ></v-autocomplete>
    </div>
</template>

<script>
export default {
  name: "FranchiseTypeSelect",
  data(){
      return {
        franchiseType: '',
        franchiseTypes: ["Metro", "Regional"]
      }
  },
  methods: {
      franchiseTypeValueChanged(){
          this.$emit('onValueChanged', this.franchiseType)
      }
  }
}
</script>

<style scoped>

</style>