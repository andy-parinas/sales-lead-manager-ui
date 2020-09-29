<template>
    <InfoCardItem color="red darken-4"
                  title="Current Month's Cancelled Lead"
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
    name: "CancelledOutcome",
    components: {InfoCardItem},
    data(){
        return {
            value: 0,
            loading: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        getCancelledOutcome(){
            const dateNow = new Date();
            const dateNowArray = dateNow.toLocaleDateString().split("/")

            const formData = {
                startDate: `${dateNowArray[2]}-${dateNowArray[1]}-01}`,
                endDate: `${dateNowArray[2]}-${dateNowArray[1]}-${dateNowArray[0]}`,
                outcome: 'cancelled'
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
        this.getCancelledOutcome()
    }
}
</script>

<style scoped>

</style>