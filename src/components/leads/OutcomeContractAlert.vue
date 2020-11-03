<template>
  <v-alert
      outlined text
      color="deep-orange"
      dense
      class="body-2">
    <p>
      <strong> Contract must be created when outcome is changed to Success </strong>
    </p>
    <p>
      If the Contract tab is not fully completed, the sale amount will not be visible in reports
    </p>
  </v-alert>
</template>

<script>
export default {
name: "OutcomeContractAlert"
}
</script>

<style scoped>

</style>