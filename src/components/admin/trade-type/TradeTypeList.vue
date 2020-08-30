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
                <span class="mt-5 subtitle-1"> Trade Types </span>
            </div>

            <div class="d-flex flex-column justify-center align-center my-12" v-if="!loading && tradeTypes.length === 0">
                <span class="mt-5 subtitle-1"> No Lead Sources. Please Create One </span>
            </div>

            <v-card-text  v-if="!loading && tradeTypes.length > 0" >
                <v-row class="mx-2">
                    <v-col cols="12">
                        <v-list subheader wo-line flat >
                            <v-subheader>Trade Types</v-subheader>

                            <v-list-item-group>
                                <template  v-for="(tradeType, index) in tradeTypes">
                                    <v-list-item  :key="tradeType.name">
                                        <template v-slot:default >
                                            <v-list-item-content>
                                                <v-list-item-title>{{ tradeType.name }}</v-list-item-title>
                                            </v-list-item-content>
                                            <v-list-item-action>
                                                <v-row class="justify-sm-start">
                                                    <v-btn x-small fab text dark color="error" class="mr-3" @click="deleteSource(tradeType)" >
                                                        <v-icon small > mdi-trash-can-outline </v-icon>
                                                    </v-btn>
                                                    <v-btn x-small fab text dark color="accent" @click="editSource(tradeType)"  >
                                                        <v-icon small > mdi-pencil </v-icon>
                                                    </v-btn>
                                                </v-row>
                                            </v-list-item-action>
                                        </template>
                                    </v-list-item>
                                    <v-divider
                                        v-if="index + 1 < tradeTypes.length"
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
            <TradeTypeEditDialog
                :initial-data="selectedItem"
                @close="showEditDialog = false"/>
        </v-dialog>
<!--        <v-dialog v-model="showDeleteDialog" persistent max-width="500px">-->
<!--            <LeadSourceDeleteDialog-->
<!--                :source="selectedItem"-->
<!--                @close="showDeleteDialog = false"/>-->
<!--        </v-dialog>-->
    </div>
</template>

<script>
import TradeTypeAPI from "@/api/TradeTypeAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import TradeTypeEditDialog from "@/components/admin/trade-type/TradeTypeEditDialog";
import EventBus from "@/helpers/EventBus";

export default {
    name: "TradeTypeList",
    components: {TradeTypeEditDialog},
    data(){
        return {
            tradeTypes: [],
            loading: false,
            selectedItem: null,
            showEditDialog: false,
            showDeleteDialog: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        getTradeTypes(){
            this.loading = true;
            TradeTypeAPI.getTradeTypes().then(response => {
                this.tradeTypes = response.data
            }).catch(error => {
                this.handleError(error);
            }).finally(() => {
                this.loading = false;
            })
        },
        deleteSource(tradeType){
            this.selectedItem = Object.assign({}, tradeType)
            this.showDeleteDialog = true;
        },
        editSource(tradeType){
            this.selectedItem = Object.assign({}, tradeType)
            this.showEditDialog = true;
        },
        addTradeType(tradeType){
            this.tradeTypes.push(tradeType);
        }
    },
    mounted() {
        this.getTradeTypes();

        EventBus.$on('TRADE_TYPE_CREATED', payload => this.addTradeType(payload))
    }
}
</script>

<style scoped>

</style>