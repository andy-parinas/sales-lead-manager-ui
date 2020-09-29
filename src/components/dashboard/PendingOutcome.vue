<template>
    <InfoCardItem color="yellow darken-4"
                  title="Current Month's Pending Lead"
                  :value="value"
                  :loading="loading"
                  unit="Leads">
    </InfoCardItem>
</template>

<script>
import InfoCardItem from "@/components/dashboard/shared/InfoCardItem";
import ReportAPI from "@/api/ReportAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
export default {
    name: "PendingOutcome",
    components: {InfoCardItem},
    data(){
        return {
            value: 0,
            loading: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        getPendingOutcome(){
            const dateNow = new Date();
            const dateNowArray = dateNow.toLocaleDateString().split("/")

            const formData = {
                startDate: `${dateNowArray[2]}-${dateNowArray[1]}-01}`,
                endDate: `${dateNowArray[2]}-${dateNowArray[1]}-${dateNowArray[0]}`,
                outcome: 'pending'
            }
            this.loading = true
            ReportAPI.getOutcome(formData).then(response => {
                const data = response.data;
                if(data.total && data.total.totalOutcome){
                    this.value = data.total.totalOutcome
                }
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false
            })
        }
    },
    mounted() {
        this.getPendingOutcome()
    }
}
</script>

<style scoped>

</style>