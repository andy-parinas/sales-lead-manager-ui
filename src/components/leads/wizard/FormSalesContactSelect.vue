<template>
   <div>
       <v-row>
           <v-col cols="12">
               <v-row>
                   <v-col cols="12">
                       <v-text-field outlined clearable
                                     placeholder="Search for First Name, Last Name or Email"
                                     hint="Only First 10 is displayed"
                                     persistent-hint>
                       </v-text-field>
                   </v-col>
               </v-row>
               <v-radio-group v-model="selected">
                   <v-list>
                       <v-row>
                           <v-col cols="12" sm="6"  v-for="contact in salesContacts" :key="contact.id">
                               <v-list-item>
                                   <template v-slot:default>
                                       <v-list-item-action>
                                           <v-radio :value="contact"></v-radio>
                                       </v-list-item-action>

                                       <v-list-item-content>
                                           <v-list-item-title>{{ contact.firstName}} {{ contact.lastName}}</v-list-item-title>
                                           <v-list-item-subtitle>{{ contact.email }}</v-list-item-subtitle>
                                           <v-list-item-subtitle>{{ contact.street1}} {{ contact.street2}} {{ contact.suburb}}, {{ contact.state}}, {{ contact.postcode }}</v-list-item-subtitle>
                                       </v-list-item-content>
                                   </template>
                               </v-list-item>
                           </v-col>
                       </v-row>
                   </v-list>
               </v-radio-group>
           </v-col>
       </v-row>
       <v-btn color="primary" class="mr-2">Cancel</v-btn>
       <v-btn color="primary" :disabled="selected === null" @click="$emit('moveNext')">Continue</v-btn>
   </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "FormSalesContactSelect",
        data() {
            return {
                selectedContact: null,
                selected: null,
            }
        },
        computed: {
            ...mapState('salesContacts', ['salesContacts']),

        },
        methods: {

        },
        watch: {
            selected(){
                console.log('Selected', this.selected);
                this.$emit('setSalesContactId', this.selected)
            }
        }
    }
</script>

<style scoped>

</style>