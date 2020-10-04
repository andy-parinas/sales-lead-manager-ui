<template>
    <div>
        <v-select
            v-model="leadSource"
             :items="leadSources"
             :loading="loading"
             clearable
             label="Lead Source"
             prepend-icon="mdi-web"
            @change="leadSourceValueChange">

        </v-select>

    </div>
</template>

<script>
import LeadSourceAPI from "@/api/LeadSourceAPI";

export default {
    name: "LeadSourceSelect",
    props: ['isRequired'],
    data(){
        return {
            leadSource: null,
            leadSources: [],
            loading: false
        }
    },
    methods: {
        getLeadSources(){
            this.loading = true
            LeadSourceAPI.getleadSources().then(response => {
                this.leadSources = response.data.map(s => {
                    return {
                        value: s.id,
                        text: s.name
                    }
                })

            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.loading = false;
            })
        },
        leadSourceValueChange(){
            this.$emit("valueChanged", this.leadSource)
        }
    },
    mounted() {
        this.getLeadSources()
    }

}
</script>

<style scoped>

</style>