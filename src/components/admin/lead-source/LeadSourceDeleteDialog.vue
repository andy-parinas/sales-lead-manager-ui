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
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="source">{{ source.name }} </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" class="mr-3 mb-2 white--text"
                   @click="deleteSource"
                   :loading="deleting">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import LeadSourceAPI from "@/api/LeadSourceAPI";
import {mapActions} from 'vuex';
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import EventBus from "@/helpers/EventBus";

export default {
    name: "LeadSourceDeleteDialog",
    props: { source: {required: true}},
    components: {DialogHeader},
    data(){
        return {
            deleting: false,
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        deleteSource(){
            this.deleting = true;
            LeadSourceAPI.deleteLeadSource(this.source.id).then(response => {
                this.setSuccessMessage("Lead Source Successfully Updated");
                EventBus.$emit('LEAD_SOURCE_DELETED', response.data);
                this.closeDialog();
            }).catch(error => {
                this.handleError(error)
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