<template>
    <InfoCardItem color="blue blue-darken"
        title="Current Month's Total Lead"
        value="30"
        unit="Leads">
    </InfoCardItem>
</template>

<script>
import InfoCardItem from "@/components/dashboard/shared/InfoCardItem";
export default {
    name: "AllOutcome",
    components: {InfoCardItem},
    methods: {
        getAllOutcome(){

        }
    }
}
</script>

<style scoped>

</style>