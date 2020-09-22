<template>
    <div>
        <v-card>
            <v-card-title id="table-header" >
                <FranchiseSearchForm
                        @search="searchFranchise"
                        @reset="resetSearch"
                        @upload="uploadDialog = true"/>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="franchises"
                    :options.sync="pageOptions"
                    :footer-props="footerProps"
                    :server-items-length="pagination.total"
                    :loading="loading"
                    @update:page="onPageOptionChanged"
                    @update:sort-by="onPageOptionChanged"
                    @update:sort-desc="onPageOptionChanged"
                    @update:items-per-page="onPageOptionChanged">


                <template v-slot:item.type="{item}">
                    <ChipFranchiseType :franchise-type="item.type" />
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-container>
                        <v-row class="justify-sm-start">
                            <v-btn x-small fab text dark color="error" class="mr-3"
                                   v-if="isHeadOffice"
                                   @click="deleteItem(item)">
                                <v-icon small >mdi-trash-can-outline </v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="accent"
                                   v-if="isHeadOffice"
                                   @click="editFranchise(item)" >
                                <v-icon small> mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="success" class="ml-3" @click="showFranchise(item)">
                                <v-icon small>mdi-arrow-right-bold</v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="editDialog"  persistent width="850px">
            <EditFranchiseDialog :edited-item="selectedItem"
                                    @close="closeEditDialog"/>
        </v-dialog>
        <v-dialog v-model="deleteDialog" persistent max-width="550" class="px-2">
            <DeleteFranchiseDialog :franchise="selectedItem"
                                      @close="closeDeleteDialog"/>
        </v-dialog>
        <v-dialog v-model="uploadDialog" persistent max-width="550" class="px-2">
            <UploadDialog :franchise="selectedItem"
                                   @close="uploadDialog = false"/>
        </v-dialog>
    </div>
</template>

<script>
    import FranchiseSearchForm from "./FranchiseSearchForm";
    import {mapState, mapActions} from 'vuex'
    import ChipFranchiseType from "./shared/ChipFranchiseType";
    import EditFranchiseDialog from "./EditFranchiseDialog";
    import DeleteFranchiseDialog from "./DeleteFranchiseDialog";
    import ErrorHandlerMixins from "@/mixins/ErrorHandler";
    import UploadDialog from "@/components/franchise/UploadDialog";

    export default {
        name: "FranchiseTable",
        components: {UploadDialog, DeleteFranchiseDialog, EditFranchiseDialog, ChipFranchiseType, FranchiseSearchForm},
        data(){
            return{
                loading: false,
                editDialog: false,
                deleteDialog: false,
                uploadDialog: false,
                pageOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['id'],
                    sortDesc: [false],
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['id'],
                    sortDesc: [false],
                },
                searchOptions: {
                    searchFor: '',
                    searchIn: ''
                },
                searchFor: '',
                searchIn: '',
                headers: [
                    { text: 'Franchise Number',value: 'franchiseNumber'},
                    { text: 'Franchise Name', value: 'name' },
                    { text: 'Main Franchise', value: 'parent' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                footerProps: {
                    "items-per-page-options": [5,10,15,20],
                    disablePagination: false,
                    disableItemsPerPage : false
                },
                selectedItem: null
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('franchises', ['franchises', 'pagination']),
            isHeadOffice(){
                const userType = this.$store.state.auth.currentUser.userType;
                return  userType === 'head_office';
            },
        },
        methods: {
            ...mapActions('franchises', ['getFranchises', 'getSubFranchises','setSelectedFranchise']),
            getAllFranchises(pageOptions, searchOptions){
                this.loading = true;
                this.getSubFranchises({pageOptions,searchOptions}).then(() => {

                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.loading = false;
                })
            },
            searchFranchise(searchOptions){
                this.pageOptions = Object.assign({}, this.defaultOptions)
                this.searchOptions = Object.assign({}, searchOptions);
                this.getAllFranchises(this.pageOptions, this.searchOptions);

            },
            resetSearch(){
                const resetOptions = {
                    searchFor: '',
                    searchIn: ''
                }

                this.searchOptions = Object.assign({}, resetOptions);
                this.pageOptions = Object.assign({}, this.defaultOptions)
                this.getAllFranchises(this.pageOptions, this.searchOptions);
            },
            deleteItem(item){
                this.selectedItem = item;
                this.deleteDialog = true;
            },
            editFranchise(item){
                this.editDialog = true;
                this.selectedItem = item;
            },
            closeEditDialog(){
                this.editDialog = false;
                this.selectedItem = null;

            },
            closeDeleteDialog()
            {
                this.deleteDialog = false;
                this.selectedItem = null;

            },
            showFranchise(item){
                this.$emit('showFranchise', item)
            },
            onPageOptionChanged(){
                if(this.searchOptions.searchIn.trim() !== '' && this.searchOptions.searchFor.trim() !== '')
                {
                    this.getAllFranchises(this.pageOptions, this.searchOptions);
                }else {
                    this.getAllFranchises(this.pageOptions);
                }
            }
        },
        mounted() {
            this.getAllFranchises(this.pageOptions,this.searchOptions);
        }
    }
</script>

<style scoped>

</style>