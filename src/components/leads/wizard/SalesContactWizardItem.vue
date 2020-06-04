<template>
   <div>
       <v-row>
           <v-col cols="12">
               <v-row>
                   <v-col cols="12">
                       <v-text-field outlined clearable v-model="searchFor"
                                     :loading="searchLoading"
                                     placeholder="Search for First Name, Last Name or Email"
                                     hint="Enter 3 characters to trigger search"
                                     persistent-hint>
                       </v-text-field>
                   </v-col>
               </v-row>
               <v-radio-group v-model="selected" @change="onSelectContact">
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
               <v-divider></v-divider>
               <v-pagination class="mt-2"
                             v-model="options.page"
                             :length="pagination.total_pages"
                             :total-visible="6"
               ></v-pagination>
           </v-col>
       </v-row>
       <v-btn color="primary" class="mr-2" @click="$emit('cancel')">Cancel</v-btn>
       <v-btn color="primary" :disabled="selected === null" @click="$emit('moveNext')">Continue</v-btn>
   </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "FormSalesContactSelect",
        data() {
            return {
                selected: null,
                options: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['firstName'],
                    sortDesc: [false],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                searchFor: '',
                searchLoading: false
            }
        },
        computed: {
            ...mapState('salesContacts', ['salesContacts', 'selectedContact', 'pagination']),

        },
        methods: {
            ...mapActions('salesContacts', ['selectContact', 'fetchSalesContacts']),
            onSelectContact(){
                console.log('Select Contact')
                this.$emit('setSalesContactId', this.selected.id)
                this.selectContact(this.selected)
            },
            getSalesContacts(){

                this.searchLoading = true;
                console.log('Search for Contacts');
                this.fetchSalesContacts({
                    options: this.options,
                    searchOptions: {
                        searchFor: this.searchFor
                    }}).then(() => {
                    this.searchLoading = false;

                }).catch(error => {
                    console.log(error);
                    this.searchLoading = false;
                })
            }
        },
        watch: {
            options: {
                handler(){
                    if(this.searchLoading) return;

                    this.getSalesContacts();
                },
                deep: true
            },

            searchFor(){

                if(this.searchLoading) return;

                if(this.searchFor !== null && this.searchFor.trim() !== '' && this.searchFor.length >= 3){
                    this.getSalesContacts();
                }
            }
        },
        mounted() {
            if(this.selectedContact){
                this.selected = this.selectedContact
            }
        }
    }
</script>

<style scoped>

</style>