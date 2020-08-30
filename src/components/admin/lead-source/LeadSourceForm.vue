<template>
    <v-card outlined>
        <v-card-text>
            <v-form v-model="isFormValid" ref="form">
                <v-row class="mx-2">
                    <v-col cols="12">
                        <v-text-field
                            v-model="form.name"
                            :rules="[v => !!v || 'This field is required', v => v !== null && v.length >= 3 || 'Min 3 characters']"
                            label="Lead Source Name">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions class="px-5">
            <v-btn small width="100%" color="blue darken-1" class="mb-5 white--text"
                   @click="createLeadSource"
                   :loading="loading"
                   :disabled="!isFormValid">
                Create Lead Source
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LeadSourceAPI from "@/api/LeadSourceAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import EventBus from "@/helpers/EventBus";
import {mapActions} from 'vuex';

export default {
    name: "LeadSourceForm",
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
        createLeadSource(){
            this.loading = true;
            LeadSourceAPI.createLeadSource(this.form).then(response => {
                EventBus.$emit('LEAD_SOURCE_CREATED', response.data);
                this.setSuccessMessage("Lead Source Successfully Created");
                this.$set(this.form, 'name', "")
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