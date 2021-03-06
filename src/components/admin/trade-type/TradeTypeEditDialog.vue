<template>
    <v-card>
        <DialogHeader title="Edit Trade Type">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card outlined>
            <v-card-text>
                <v-form v-model="isFormValid" ref="form">
                    <v-row class="mx-2">
                        <v-col cols="12">
                            <v-text-field
                                v-model="form.name"
                                :rules="[v => !!v || 'This field is required', v => v !== null && v.length >= 3 || 'Min 3 characters']"
                                label="Trade Type Name">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions class="px-5">
                <v-btn small width="100%" color="blue darken-1" class="mb-5 white--text"
                       @click="updateTradeType"
                       :loading="loading"
                       :disabled="!isFormValid">
                    Update TradeType
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import TradeTypeAPI from "@/api/TradeTypeAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import EventBus from "@/helpers/EventBus";
import {mapActions} from 'vuex';

export default {
    name: "TradeTypeEditDialog",
    props: ['initialData'],
    components: {DialogHeader},
    data(){
        return {
            isFormValid: false,
            loading: false,
            form: {
                name: ''
            }
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        updateTradeType(){
            this.loading = true;
            TradeTypeAPI.updateTradeType(this.initialData.id, this.form).then(response => {
                console.log('Updated', response)
                EventBus.$emit('TRADE_TYPE_UPDATED', response.data);
                this.setSuccessMessage('Trade Type Successfully Updated');
                this.closeDialog();
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false
            })
        },
        closeDialog(){
            this.$emit('close');
        }
    },
    watch: {
        initialData: {
            handler(){
                if(this.initialData){
                    this.form = Object.assign({}, this.initialData)
                }
            },
            deep: true
        }
    },
    mounted() {
        if(this.initialData){
            this.form = Object.assign({}, this.initialData)
        }
    }
}
</script>

<style scoped>

</style>