<template>
   <div>
        <JobTypeForm
                @updateData="updateData"></JobTypeForm>
       <v-container>
           <v-row>
               <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Back</v-btn>
               <v-btn color="primary"
                      @click="moveNext">Continue</v-btn>
               <v-spacer></v-spacer>
               <v-btn color="primary" class="mr-2" @click="$emit('cancel')">Cancel</v-btn>
           </v-row>
       </v-container>
   </div>
</template>

<script>

    import JobTypeForm from "../form/JobTypeForm";

    export default {
        name: "JobTypeWizardItem",
        components: {JobTypeForm},
        data(){
            return {

                form: {
                    takenBy: '',
                    dateAllocated: '',
                    productId: '',
                    product: '',
                    designAssessorId: '',
                    salesStaffId: '',
                    description: ''
                },
                initialData: {
                    takenBy: '',
                    dateAllocated: new Date().toISOString().substr(0, 10),
                    productId: '',
                    product: '',
                    designAssessorId: '',
                    salesStaffId: '',
                    description: ''
                },

            }
        },

        methods: {

            moveNext(){

                this.$emit('moveNext', {
                    jobType: this.form
                })
            },
            updateData(form){
                this.form = Object.assign({}, form);
            }

        },

    }
</script>

<style scoped>

</style>