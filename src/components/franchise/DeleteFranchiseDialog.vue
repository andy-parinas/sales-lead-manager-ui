<template>
    <v-card>
        <DialogHeader title="Delete Sales Contact">
            <template v-slot:action>
                <v-btn small icon @click="$emit('close')">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text>
            <div class="mt-3 subtitle-1"> The Delete process is unrecoverable. Are you sure you want to delete?</div>
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="franchise">
                {{ franchise.franchiseNumber }}
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" class="mr-3 mb-2 white--text"
                   @click="onDeleteFranchise"
                   :loading="deleting">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";


    export default {
        name: "DeleteFranchiseDialog",
        components: {DialogHeader},
        props: ['franchise'],
        data(){
            return {
                deleting: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('franchises', ['deleteFranchise']),
            ...mapActions(['setSuccessMessage']),
            onDeleteFranchise(){
                if(this.franchise){
                    this.deleting = true;
                    this.deleteFranchise(this.franchise.id).then(() => {
                        this.setSuccessMessage("Franchise Successfully Delete");
                        this.$emit('close');
                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.deleting = false;
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>