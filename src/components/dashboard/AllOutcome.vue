<template>
    <InfoCardItem color="blue blue-darken"
        title="Current Month's Total Lead"
        :value="value"
        :loading="loading"
        unit="Leads">
    </InfoCardItem>
</template>

<script>
import InfoCardItem from "@/components/dashboard/shared/InfoCardItem";
import ReportAPI from "@/api/ReportAPI";
export default {
    name: "AllOutcome",
    components: {InfoCardItem},
    data(){
        return {
            value: 0,
            loading: false
        }
    },
    methods: {
        getAllOutcome(){
            const dateNow = new Date();
            const dateNowArray = dateNow.toLocaleDateString().split("/")

            const formData = {
                startDate: `${dateNowArray[2]}-${dateNowArray[1]}-01}`,
                endDate: `${dateNowArray[2]}-${dateNowArray[1]}-${dateNowArray[0]}`
            }
            this.loading = true
            ReportAPI.getOutcome(formData).then(response => {
                console.log('AllOutcome', response.data)
                const data = response.data;
                this.value = data.total.totalOutcome

            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.loading = false
            })
        }
    },
    mounted() {
        this.getAllOutcome()
    }
}
</script>

<style scoped>

</style>