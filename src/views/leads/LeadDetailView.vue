<template>
    <div>
        <v-row justify="center" v-if="isLeadLoaded">
            <v-col cols="12" sm="10">
                <LeadTabDetails
                        title="Details"
                        :lead="lead">
                    <template v-slot:actions>
                        <v-btn text @click="goBack">
                            <v-icon>mdi-arrow-left-bold</v-icon>
                            <span> Go Back </span>
                        </v-btn>
                    </template>
                </LeadTabDetails>
            </v-col>
        </v-row>
        <v-row justify="center" v-else>
            <v-col cols="12" sm="10">
                <v-skeleton-loader
                        :boilerplate="true"
                        class="mx-auto"
                        type="card"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
</template>

<script>

    import {mapState} from 'vuex';
    import LeadTabDetails from "./partials/LeadTabDetails";

    export default {
        name: "LeadDetailTabView",
        props: ['id'],
        components: {LeadTabDetails},
        computed: {
            ...mapState('leads', ['lead']),
            isLeadLoaded(){
                return Object.keys(this.lead).length > 0
            }
        },
        methods: {
            goBack(){
                this.$emit('goBack')
            }
        },
    }
</script>

<style scoped>

</style>