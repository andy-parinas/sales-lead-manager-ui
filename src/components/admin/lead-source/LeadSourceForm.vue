<template>
    <v-card outlined>
        <v-card-text>
            <v-row class="mx-2">
                <v-col cols="12">
                    <v-text-field
                        v-model="name"
                        label="Lead Source Name" single-line hide-details>
                    </v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="px-5">
            <v-btn small width="100%" color="blue darken-1" class="mb-5 white--text">
                Create Lead Source
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "LeadSourceForm",
    data(){
        return {
            name: ''
        }
    }
}
</script>

<style scoped>

</style>