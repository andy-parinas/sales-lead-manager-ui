<template>
    <v-card>
        <DialogHeader title="Create Lead Contract">
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
                                label="Lead Source Name">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions class="px-5">
                <v-btn small width="100%" color="blue darken-1" class="mb-5 white--text"
                       @click="updateLeadSource"
                       :loading="loading"
                       :disabled="!isFormValid">
                    Update Lead Source
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import LeadSourceAPI from "@/api/LeadSourceAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import {mapActions} from 'vuex';
import EventBus from "@/helpers/EventBus";

export default {
    name: "LeadSourceEditDialog",
    props: ['initialData'],
    components: {DialogHeader},
    data() {
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
        closeDialog(){
            this.$emit('close');
        },
        updateLeadSource(){
            this.loading = true;
            LeadSourceAPI.updateLeadSource(this.initialData.id, this.form).then(response => {
                this.setSuccessMessage('Lead Source Successfully Updated');
                EventBus.$emit('LEAD_SOURCE_UPDATED', response.data)
                this.closeDialog();
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false;
            })
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