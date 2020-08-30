<template>
    <div>
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
                                                    <v-btn x-small fab text dark color="error" class="mr-3" @click="deleteSource(source)" >
                                                        <v-icon small > mdi-trash-can-outline </v-icon>
                                                    </v-btn>
                                                    <v-btn x-small fab text dark color="accent" @click="editSource(source)"  >
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
        <v-dialog v-model="showEditDialog" persistent max-width="500px">
            <LeadSourceEditDialog
                :initial-data="selectedItem"
                @close="showEditDialog = false"/>
        </v-dialog>
        <v-dialog v-model="showDeleteDialog" persistent max-width="500px">
            <LeadSourceDeleteDialog
                :source="selectedItem"
                @close="showDeleteDialog = false"/>
        </v-dialog>
    </div>
</template>

<script>
import LeadSourceAPI from "@/api/LeadSourceAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import EventBus from "@/helpers/EventBus";
import LeadSourceEditDialog from "@/components/admin/lead-source/LeadSourceEditDialog";
import LeadSourceDeleteDialog from "@/components/admin/lead-source/LeadSourceDeleteDialog";

export default {
    name: "LeadSourceList",
    components: {LeadSourceDeleteDialog, LeadSourceEditDialog},
    data(){

        return {
            sources: [],
            loading: false,
            showEditDialog: false,
            showDeleteDialog: false,
            selectedItem: null
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
        },
        editSource(source){
            if(source){
                this.selectedItem = Object.assign({}, source)
                this.showEditDialog = true
            }
        },
        deleteSource(source){
            if(source){
                this.selectedItem = Object.assign({}, source)
                this.showDeleteDialog = true
            }
        },
        updateSource(source){
            const updatedSources = this.sources.map(s => {
                if(s.id === source.id){
                    return source;
                }else {
                    return s;
                }
            })

            this.sources = updatedSources;
        },
        updateSourcesOnDelete(source){
            const updatedSource = this.sources.filter(s => s.id !== source.id);

            this.sources = updatedSource;
        }
    },
    mounted() {
        this.getLeadSources();
        EventBus.$on('LEAD_SOURCE_CREATED', payload => this.addSource(payload))
        EventBus.$on('LEAD_SOURCE_UPDATED', payload => this.updateSource(payload))
        EventBus.$on('LEAD_SOURCE_DELETED', payload => this.updateSourcesOnDelete(payload))
    }
}
</script>

<style scoped>

</style>