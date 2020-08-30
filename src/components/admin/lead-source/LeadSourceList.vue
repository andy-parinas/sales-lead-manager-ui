<template>
    <v-card outlined>

        <div class="d-flex flex-column justify-center align-center my-12" v-if="loading">
            <v-progress-circular class="mt-12"
                                 :size="70"
                                 :width="7"
                                 color="primary"
                                 indeterminate
            ></v-progress-circular>
            <span class="mt-5 subtitle-1">Loading Lead Source </span>
        </div>

        <div class="d-flex flex-column justify-center align-center my-12" v-if="!loading && sources.length === 0">
            <span class="mt-5 subtitle-1"> No Lead Sources. Please Create One </span>
        </div>

        <v-card-text  v-if="!loading && sources.length > 0">
            <v-row class="mx-2">
                <v-col cols="12">
                    <v-list subheader wo-line flat >
                        <v-subheader>Lead Sources</v-subheader>

                        <v-list-item-group>
                            <template  v-for="(source, index) in sources">
                                <v-list-item  :key="source.name">
                                    <template v-slot:default >
                                        <v-list-item-content>
                                            <v-list-item-title>{{ source.name }}</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-row class="justify-sm-start">
                                                <v-btn x-small fab text dark color="error" class="mr-3">
                                                    <v-icon small > mdi-trash-can-outline </v-icon>
                                                </v-btn>
                                                <v-btn x-small fab text dark color="accent"  >
                                                    <v-icon small > mdi-pencil </v-icon>
                                                </v-btn>
                                            </v-row>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>
                                <v-divider
                                    v-if="index + 1 < sources.length"
                                    :key="index"
                                ></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import LeadSourceAPI from "@/api/LeadSourceAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import EventBus from "@/helpers/EventBus";

export default {
    name: "LeadSourceList",
    data(){

        return {
            sources: [],
            loading: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {

        getLeadSources(){
            this.loading = true
            LeadSourceAPI.getleadSources().then(response =>{
                this.sources = response.data;
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false
            })
        },
        addSource(source){
            this.sources.push(source)
        }
    },
    mounted() {
        this.getLeadSources();
        EventBus.$on('LEAD_SOURCE_CREATED', payload => this.addSource(payload))
    }
}
</script>

<style scoped>

</style>