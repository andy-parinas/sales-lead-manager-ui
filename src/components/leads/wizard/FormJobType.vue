<template>
   <div>
       <v-form v-model="valid">
           <v-container>
               <v-row class="mx-2">
                   <v-col cols="12" sm="6">
                       <v-text-field v-model="form.takenBy"
                                     prepend-icon="mdi-numeric-0-box-multiple-outline"
                                     label="Lead Number"
                                     :rules="rules.required"
                       />
                   </v-col>
               </v-row>
               <v-row>
                   <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Cancel</v-btn>
                   <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Back</v-btn>
                   <v-btn color="primary"
                          @click="$emit('moveNext')"
                          :disabled="!valid">Continue</v-btn>
               </v-row>
           </v-container>
       </v-form>

   </div>
</template>

<script>
    export default {
        name: "FormJobType",
        data(){
            return {
                valid: false,
                form: {
                    takenBy: ''
                },
                rules: {
                    required: [
                        v => !!v || 'This field is required',
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>