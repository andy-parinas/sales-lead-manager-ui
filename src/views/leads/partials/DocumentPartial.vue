<template>
    <div>
        <v-skeleton-loader v-if="loading"
                :loading="loading"
                height="94"
                type="list-item-two-line">
            <v-card>
                <v-card-title>Title</v-card-title>
                <v-card-text>Card Text</v-card-text>
            </v-card>
        </v-skeleton-loader>

        <v-card flat class="mx-10 mt-5 mb-10" outlined v-else>
            <v-list >
                <template v-for="(document, index) in documents">
                    <v-list-item  :key="document.id" class="py-2">
                        <DocumentIcon :document-type="document.type" />
                        <div>
                          <div class="ml-2 subtitle-2">{{ document.description }}</div>
                          <div class="ml-2 caption mt-1">{{ document.title }}</div>
                        </div>

                        <v-spacer></v-spacer>
                        <div class="d-flex">
                            <v-btn  v-if="currentUser.userType !== 'staff_user'"
                                    @click="onFileDelete(document)"
                                    x-small fab text color="error" dark>
                                <v-icon small>delete</v-icon>
                            </v-btn>
                            <v-btn  @click="downloadFile(document)"
                                    :loading="document.id === downloadingId"
                                    x-small fab text color="success" dark>
                                <v-icon >mdi-download</v-icon>
                            </v-btn>
                        </div>
                    </v-list-item>
                    <v-divider
                            v-if="index + 1 < documents.length"
                            :key="index"
                    ></v-divider>
                </template>
            </v-list>
        </v-card>
        <v-divider></v-divider>
        <v-row v-if="currentUser.userType !== 'staff_user'"
                class="mx-10 mt-10 mb-5" align="center">
            <v-col cols="12">
              <v-file-input v-model="fileForUpload"
                            show-size label="Lead Document"></v-file-input>
              <v-text-field
                  v-model="description"
                  label="Document Description"
                  prepend-icon="mdi-file-document-outline"
              ></v-text-field>
              <v-btn @click="uploadFile"
                     :loading="uploading"
                     :disabled="fileForUpload === null"
                     small color="primary" class="text--white ml-3">
                Upload
                <v-icon small>mdi-upload</v-icon>
              </v-btn>
            </v-col>
        </v-row>
        <v-dialog v-model="showDeleteDialog" persistent max-width="350" class="px-2">
            <v-card>
                <v-card-title class="headline">Delete File?</v-card-title>
                <v-card-text>
                    <p>You won't be able to recover this Sales Contact once deleted.</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="text--white" small :disabled="deleting" @click="onCancelDelete">Cancel</v-btn>
                    <v-btn color="error" small class="mr-3 text--white"  @click="deleteFile" :loading="deleting" >
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    import DocumentAPI from "../../../api/DocumentAPI";
    import DocumentIcon from "./DocumentIcon";
    import {mapActions, mapState} from 'vuex'
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";

    export default {
        name: "DocumentPartial",
        components: {DocumentIcon},
        props: {
            leadId: {required: true}
        },
        data(){
            return {
                loading: false,
                documents: [],
                fileForUpload: null,
                uploading: false,
                downloadingId: null,
                showDeleteDialog: false,
                deleting: false,
                fileToDelete: null,
                description: ''

            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('auth', ['currentUser'])
        },
        methods: {
            ...mapActions(['setSuccessMessage', 'setErrorMessage']),
            getDocuments(){
                this.loading = true;
                DocumentAPI.getDocuments(this.leadId).then(response => {
                    this.documents = response.data
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.loading = false
                })
            },
            uploadFile(){
                const data = new FormData();
                data.append('file', this.fileForUpload)
                data.append('title', this.fileForUpload.name)
                data.append('type', this.fileForUpload.type? this.fileForUpload.type : "unknown" )
                data.append('description', this.description )

                this.uploading = true

                DocumentAPI.uploadFile(this.leadId, data).then(response => {
                    this.fileForUpload = null
                    this.description = ''
                    this.setSuccessMessage('File successfully uploaded');
                    this.documents.push(response.data);
                }).catch(error => {
                   this.handleError(error)
                }).finally(() => {
                    this.uploading = false;
                })
            },
            downloadFile(doc){

                const file = doc.title.replace(" ", "_")

                this.downloadingId = doc.id
                DocumentAPI.downloadFile(this.leadId, doc.id).then(response => {
                    console.log('FileDownload', response)
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', file)
                    document.body.appendChild(link);
                    link.click();
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.downloadingId = null;
                })
            },
            onFileDelete(doc){
                this.fileToDelete = Object.assign({}, doc);
                this.showDeleteDialog = true;
            },
            onCancelDelete(){
                this.fileToDelete = null;
                this.showDeleteDialog = false
            },
            deleteFile(){

                this.deleting = true;
                DocumentAPI.deleteFile(this.leadId, this.fileToDelete.id).then(() => {
                    const updatedDocuments = this.documents.filter(doc => doc.id !== this.fileToDelete.id)
                    this.documents = updatedDocuments;
                    this.showDeleteDialog = false;
                    this.setSuccessMessage("File successfully deleted");
                    this.fileToDelete = null;
                }).catch(error =>{
                    this.handleError(error)
                }).finally(() => {
                    this.deleting = false;
                })

            }
        },
        mounted() {
            if(this.leadId){
                this.getDocuments();
            }
        }
    }
</script>

<style scoped>

</style>