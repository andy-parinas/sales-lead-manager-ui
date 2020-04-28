<template>
    <div>
        <v-card v-if="salesContacts.length > 0">
            <v-card-title id="table-header" >
                <v-row align-content="end" justify="start">
                    <v-col cols="12" md="7"  sm="12"><v-text-field  label="Search" single-line hide-details></v-text-field></v-col>
                    <v-col cols="12" md="3"  sm="12">
                        <v-select v-model="selectedSearch" :items="searchItems" label="Search In" single-line ></v-select>
                    </v-col>
                    <v-col cols="12" md="2" sm="12">
                        <v-btn large elevation="1" block class="mt-1">
                            <v-icon>search</v-icon>
                            Search
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-data-table
                    :items="salesContacts"
                    :options.sync="options"
                    :headers="headers"
                    :server-items-length="60"
                    :single-expand="true"
                    :loading="loading"
                    :footer-props="footerProps"
                    item-key="id"
                    show-expand
                    class="elevation-0">

                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-5" @click="editItem(item)" > mdi-pencil</v-icon>
                    <v-icon small @click="deleteItem(item)" v-if="isHeadOffice" > mdi-delete </v-icon>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <SalesContactDetails :length="headers.length" :item="item" />
                </template>

            </v-data-table>
            <pre>{{options}}</pre>
        </v-card>
    </div>
</template>

<script>
    import SalesContactDetails from "./SalesContactDetails";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "SalesContactsTable",
        components: {SalesContactDetails},
        props: {},
        data(){
            return {
                isInitialLoad: true,
                loading: false,
                headers: [
                    { text: 'First Name',value: 'firstName'},
                    { text: 'Last Name', value: 'lastName' },
                    { text: 'Suburb', value: 'suburb' },
                    { text: 'State', value: 'state' },
                    { text: 'Postcode', value: 'postcode' },
                    { text: 'Actions', value: 'actions', sortable: false },
                    { text: '', value: 'data-table-expand' },
                ],
                searchItems: ['First Name', 'Last Name', 'Suburb', 'State', 'Postcode'],
                selectedSearch: '',
                // options: {},
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
                footerProps: {
                    "items-per-page-options": [5,10,15,20]
                }
            }
        },
        computed: {
            ...mapState('salesContacts', {
                salesContacts: state => state.salesContacts
            }),
            isHeadOffice(){
              const userType = this.$store.state.auth.currentUser.userType;
              if(userType === 'head_office'){
                  return true;
              }

              return  false;
            }
        },
        methods: {
            ...mapActions('salesContacts', ['fetchSalesContacts']),
            editItem(item){
                console.log(item)
            },
            deleteItem(item){
                console.log(item)
            },
            showItem(item){
                console.log(item)
            }
        },
        watch: {
            options: {
                handler(){
                    if(!this.isInitialLoad){
                        console.log('Watch Trigered')
                        this.loading = true;
                        this.fetchSalesContacts(this.options).then(() => {
                            this.loading = false;
                        }).catch(error => {
                            console.log('PageSalesContacts', error)
                            this.$store.dispatch('setAppLoadingState', false)
                        })
                    }
                },
                deep: true
            }
        },
        mounted() {
            console.log('Mounted Options', this.options);
            this.$store.dispatch('setAppLoadingState', true)
            this.fetchSalesContacts(this.options).then(() => {
                this.isInitialLoad = false;
                this.$store.dispatch('setAppLoadingState', false)
            }).catch(error => {
                console.log('PageSalesContacts', error.response)
                this.$store.dispatch('setAppLoadingState', false)
            })
        }
    }
</script>

<style scoped>

</style>