<template>
    <v-card>
      <DialogHeader title="Edit Lead">
        <template v-slot:action>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </DialogHeader>
        <v-card-text>
            <JobTypeForm
                    @updateData="updateData"
                    :initial-data="lead.jobType" />
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  color="blue darken-1" class="mr-5 mb-5 white--text" :loading="loading" @click="save" :disabled="isFormEmpty" >Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import JobTypeForm from "../form/JobTypeForm";
    import {mapState, mapActions} from 'vuex';
    import DialogHeader from "@/components/core/DialogHeader";
    import ErrorHandlerMixins from "@/mixins/ErrorHandler";

    export default {
        name: "JobTypeEditDialog",
        components: {DialogHeader, JobTypeForm},
        data(){
            return {
                loading: false,
                form: null,
                error: false,
                errorMessage: ''
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('leads', ['lead']),
            isFormEmpty(){
                return this.form === null
            }
        },
        methods: {
            ...mapActions('leads', ['updateLeadJobType']),
            updateData(form){
                this.form = Object.assign({}, form)
            },
            closeDialog(){
                this.$emit('close')
            },
            save(){
                if(this.form){
                    this.loading = true;

                    this.updateLeadJobType(this.form).then(() => {
                        this.$emit('success');
                        this.$emit('close');
                    }).catch(error => {
                       this.handleError(error)
                    }).finally(() => {
                        this.loading = false;
                    })
                }
            },
            clearError(){
                this.error = false;
                this.errorMessage = '';
            },
        }
    }
</script>

<style scoped>

</style>