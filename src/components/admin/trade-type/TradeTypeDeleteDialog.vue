<template>
    <v-card>
        <DialogHeader title="Delete Lead Source">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text>
            <div class="mt-3 subtitle-1"> The Delete process is unrecoverable. Are you sure you want to delete?</div>
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="tradeType">{{ tradeType.name }} </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" class="mr-3 mb-2 white--text"
                   @click="deleteType"
                   :loading="deleting">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import DialogHeader from "@/components/core/DialogHeader";
import {mapActions} from 'vuex';
import TradeTypeAPI from "@/api/TradeTypeAPI";
import EventBus from "@/helpers/EventBus";

export default {
    name: "TradeTypeDeleteDialog",
    components: {DialogHeader},
    props: ['tradeType'],
    data(){
        return {
            deleting: false,
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        deleteType(){
            this.deleting = true
            TradeTypeAPI.deleteTradeType(this.tradeType.id).then(response => {
                EventBus.$emit('TRADE_TYPE_DELETED', response.data);
                this.setSuccessMessage('Trade Type Successfully Deleted');
                this.closeDialog();
            }).catch(error => {
                this.handleError(error);
            }).finally(() => {
                this.deleting = false;
            })
        },
        closeDialog(){
            this.$emit('close');
        }
    }
}
</script>

<style scoped>

</style>