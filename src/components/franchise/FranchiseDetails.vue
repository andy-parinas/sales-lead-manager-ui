    <template>
        <v-card>
            <v-toolbar flat color="blue-grey" dark>
                <v-toolbar-title> Franchise Details </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text @click="$emit('goBack')">
                    <v-icon>mdi-arrow-left-bold</v-icon>
                    <span> Go Back </span>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row v-if="franchise">
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-store</v-icon>
                        <span class="ml-2 caption font-weight-bold">Franchise Number:</span> <span class="ml-1"> {{franchise.franchiseNumber}} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-store</v-icon>
                        <span class="ml-2 caption font-weight-bold">Franchise Name: </span> <span class="ml-1"> {{franchise.name }} </span>
                    </v-col>
                </v-row>
                <v-divider class="my-5"></v-divider>
                <v-row class="d-flex align-center justify-space-between mt-3 mb-2">
                    <v-col cols="12" sm="7">
                        <v-text-field
                                v-model="searchOptions.search"
                                class="mr-1"
                                placeholder="Search"
                                prepend-inner-icon="search"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5" class="d-flex align-center justify-start">
                        <v-btn @click="reset" class="mr-3"
                               small color="green darken-1" dark>
                            Refresh
                        </v-btn>
                        <v-btn small color="primary" class="mr-3"
                               v-if="isHeadOffice"
                               @click="addPostcodeDialog = true">
                            Add Postcode
                        </v-btn>
                        <v-btn small color="error"
                               v-if="isHeadOffice"
                               :disabled="selected.length === 0"
                               @click="removePostcodeDialog = true">
                            Remove Postcode
                        </v-btn>

                    </v-col>
                </v-row>

                <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :footer-props="footerProps"
                        :items="postcodes"
                        :loading="loading"
                        :options.sync="pageOptions"
                        :server-items-length="pagination.total"
                        show-select
                        @update:page="onPageOptionChanged"
                        @update:sort-by="onPageOptionChanged"
                        @update:sort-desc="onPageOptionChanged"
                        @update:items-per-page="onPageOptionChanged">

                </v-data-table>
            </v-card-text>
            <v-dialog v-model="addPostcodeDialog"  persistent width="950px">
                <PostcodeAddDialog :franchise="franchise"
                                   @success="addSuccessHandler"
                                    @close="closeAddDialog"/>
            </v-dialog>
            <v-dialog v-model="removePostcodeDialog"  persistent width="650px">
                <PostcodeDeleteDialog :franchise="franchise"
                                      :postcodes="selected"
                                   @success="removeSuccessHandler"
                                   @close="removePostcodeDialog = false"/>
            </v-dialog>
        </v-card>
    </template>

    <script>
        import PostcodeAPI from "../../api/PostcodeAPI";
        import ErrorHandlerMixins from "../../mixins/ErrorHandler";
        import PostcodeAddDialog from "./postcode/PostcodeAddDialog";
        import {mapActions} from 'vuex';
        import PostcodeDeleteDialog from "./postcode/PostcodeDeleteDialog";

        export default {
            name: "FranchiseDetails",
            components: {PostcodeDeleteDialog, PostcodeAddDialog},
            props: ['franchise'],
            data(){
                return {
                    addPostcodeDialog: false,
                    removePostcodeDialog: false,
                    headers: [
                        { text: 'Postcode',value: 'postcode'},
                        { text: 'Suburb', value: 'locality' },
                        { text: 'State', value: 'state' },
                    ],
                    footerProps: {
                        "items-per-page-options": [5,10,15,20],
                        disablePagination: false,
                        disableItemsPerPage : false
                    },
                    pageOptions: {
                        page: 1,
                        itemsPerPage: 10,
                        sortBy: ['postcode'],
                        sortDesc: [false],
                    },
                    defaultOptions: {
                        page: 1,
                        itemsPerPage: 10,
                        sortBy: ['postcode'],
                        sortDesc: [false],
                    },
                    searchOptions: {
                        search: '',
                    },
                    postcodes: [],
                    pagination: {},
                    loading: true,
                    selected: []
                }
            },
            mixins: [ErrorHandlerMixins],
            computed: {
                isHeadOffice(){
                    const userType = this.$store.state.auth.currentUser.userType;
                    return  userType === 'head_office';
                },
            },
            methods: {
                ...mapActions(['setSuccessMessage']),
                getFranchisePostcode(){
                    this.loading = true;
                    PostcodeAPI.getFranchisePostcodes(this.franchise.id, this.pageOptions, this.searchOptions).then(response => {
                        this.postcodes = response.data
                        this.pagination = Object.assign({}, response.pagination)
                    }).catch(error => {
                        this.handleError(error);
                    }).finally(() => {
                        this.loading = false;
                    })

                },
                onPageOptionChanged(){
                    this.getFranchisePostcode();
                },
                reset(){
                    this.selected = [];
                    this.pageOptions = Object.assign({}, this.defaultOptions);
                    this.searchOptions.search = '';

                    this.getFranchisePostcode();
                },
                closeAddDialog(){
                    this.addPostcodeDialog = false;
                },
                addSuccessHandler(){
                    this.selected = [];
                    this.pageOptions = Object.assign({}, this.defaultOptions);
                    this.searchOptions.search = '';
                    this.getFranchisePostcode();
                    this.setSuccessMessage("Postcodes Successfully added");
                },
                removeSuccessHandler(){
                    this.selected = [];
                    this.pageOptions = Object.assign({}, this.defaultOptions);
                    this.searchOptions.search = '';
                    this.removePostcodeDialog = false;
                    this.getFranchisePostcode();
                    this.setSuccessMessage("Postcodes Successfully Removed");
                }
            },
            watch: {
                searchOptions: {
                    handler(){
                        if(!this.loading && this.searchOptions.search.length >= 4){
                            this.pageOptions = Object.assign({}, this.defaultPageOptions)
                            this.getFranchisePostcode();
                        }
                    },
                    deep: true
                }
            },
            mounted() {
                if(this.franchise){
                    this.getFranchisePostcode();
                }
            }
        }
    </script>

    <style scoped>

    </style>