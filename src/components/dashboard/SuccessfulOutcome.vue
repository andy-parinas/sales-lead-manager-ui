<template>
    <InfoCardItem color="green green-darken"
                  title="Current Month's Successful Lead"
                  value="10"
                  unit="Leads">
    </InfoCardItem>
</template>

<script>
import InfoCardItem from "@/components/dashboard/shared/InfoCardItem";
export default {
    name: "SuccessfulOutcome",
    components: {InfoCardItem}
}
</script>

<style scoped>

</style>