<template>
    <InfoCardItem color="red darken-4"
                  title="Current Month's Cancelled Lead"
                  value="10"
                  unit="Leads">
    </InfoCardItem>
</template>

<script>
import InfoCardItem from "@/components/dashboard/shared/InfoCardItem";
export default {
    name: "CancelledOutcome",
    components: {InfoCardItem}
}
</script>

<style scoped>

</style>