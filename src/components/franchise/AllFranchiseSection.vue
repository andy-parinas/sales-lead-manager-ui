<template>
    <div>
        <div class="d-flex flex-column">
            <h3 class="mb-3">All Franchises</h3>
            <div class="d-flex">
                <v-text-field
                        v-model="searchOptions.searchFor"
                        class="mr-1"
                        placeholder="Search"
                        prepend-inner-icon="search"
                        filled
                        rounded
                        dense
                ></v-text-field>
                <v-btn @click="reset"
                       x-small fab text color="green darken-1" dark class="mt-1">
                    <v-icon >refresh</v-icon>
                </v-btn>
            </div>
        </div>
        <v-card outlined :loading="loading">

            <FranchiseList :franchises="franchises"
                            :with-select="true"
                           @onPostcodeClicked="showPostcode"
                           @onSelectedClicked="franchiseSelected"
                           @onEditClicked="editFranchise"
                           ref="franchiseList"
            ></FranchiseList>
        </v-card>
        <v-pagination class="mt-2" v-if="pagination"
                      v-model="pageOptions.page"
                      :length="pagination.total_pages"
                      :total-visible="6"
                      :disabled="loading"
        ></v-pagination>
        <v-dialog v-model="showEditDialog" persistent width="650" class="px-2">
            <EditFranchiseDialog
                    :edited-item="selectedItem"
                    @close="closeDialog" />
        </v-dialog>
        <v-dialog v-model="showPostcodeDialog" persistent width="850" class="px-2">
            <PostcodeDialog :selected-franchise="this.selectedItem"
                    @close="closeDialog" />
        </v-dialog>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex'
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    import FranchiseList from "./shared/FranchiseList";
    import EditFranchiseDialog from "./EditFranchiseDialog";
    import PostcodeDialog from "./PostcodeDialog";
    // import EditUserFranchise from "../admin/users/EditUserFranchise";

    export default {
        name: "AllFranchiseSection",
        components: {PostcodeDialog, EditFranchiseDialog, FranchiseList},
        data(){
            return {
                showEditDialog: false,
                showPostcodeDialog: false,
                loading: false,
                pageOptions: {
                    page: 1,
                    itemsPerPage: 5,
                    sortBy: ['franchiseNumber'],
                    sortDesc: [false],
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 5,
                    sortBy: ['franchiseNumber'],
                    sortDesc: [false],
                },
                searchOptions: {
                    searchFor: '',
                },
                selectedItem: null,
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('franchises', ['franchises', 'pagination'])
        },
        methods: {
            ...mapActions('franchises', ['getFranchises', 'setSelectedFranchise']),

            getAllFranchises(){
                this.loading = true;
                this.getFranchises({
                    pageOptions: this.pageOptions,
                    searchOptions: this.searchOptions
                }).then(() => {

                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.loading = false;
                })
            },
            franchiseSelected(item){
                this.setSelectedFranchise(item);
            },
            reset(){
                if(!this.loading){
                    this.searchOptions.searchFor = ''
                    this.pageOptions = Object.assign({}, this.defaultOptions)

                }
            },
            editFranchise(item){
                this.selectedItem = Object.assign({}, item);
                this.showEditDialog = true;
            },
            showPostcode(item){
                this.showPostcodeDialog = true;
                this.selectedItem = Object.assign({}, item)
            },
            closeDialog(){
                this.showPostcodeDialog = false;
                this.showEditDialog = false
                this.selectedItem = null;
            },



        },
        watch: {
           pageOptions: {
               handler(){
                   if(!this.loading){
                       this.getAllFranchises();
                   }
               },
               deep: true
           },
            searchOptions: {
                handler(){
                    if(!this.loading && this.searchOptions && this.searchOptions.searchFor && this.searchOptions.searchFor.length >= 2){
                        this.getAllFranchises();
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.getAllFranchises();
        }
    }
</script>

<style scoped>

</style>