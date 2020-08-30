<template>
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
                   @click="createTradeType"
                   :loading="loading"
                   :disabled="!isFormValid">
                Create Lead Source
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import TradeTypeAPI from "@/api/TradeTypeAPI";
import EventBus from "@/helpers/EventBus";
import {mapActions} from 'vuex';

export default {
    name: "TradeTypeForm",
    data(){
        return {
            form: {
                name: '',
            },
            isFormValid: false,
            loading: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        createTradeType(){
            this.loading = true;
            TradeTypeAPI.createTradeType(this.form).then(response => {
                EventBus.$emit('TRADE_TYPE_CREATED', response.data)
                this.setSuccessMessage('Trade Type Created');
                this.$set(this.form, 'name', "");
                this.$refs.form.resetValidation();
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false;
            })
        }
    }
}
</script>

<style scoped>

</style>