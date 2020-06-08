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

        <v-card flat class="mx-10 mt-10" outlined v-else>
            <v-list >
                <template v-for="(document, index) in documents">
                    <v-list-item  :key="document.id">
                        <DocumentIcon :document-type="document.type" />
                        <span class="ml-2">{{ document.title }}</span>
                        <v-spacer></v-spacer>
                        <div class="d-flex">
                            <v-btn  @click="$emit('remove')"
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
        <v-row class="mx-10 mt-10 mb-5" align="center">
            <v-file-input v-model="fileForUpload"
                    show-size label="Lead Document"></v-file-input>
            <v-btn @click="uploadFile"
                   :loading="uploading"
                   :disabled="fileForUpload === null"
                    small color="primary" class="text--white ml-3">
                Upload
                <v-icon small>mdi-upload</v-icon>
            </v-btn>
        </v-row>
    </div>
</template>

<script>

    import DocumentAPI from "../../../api/DocumentAPI";
    import DocumentIcon from "./DocumentIcon";
    import {mapActions} from 'vuex'
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
                downloadingId: null

            }
        },
        mixins: [ErrorHandlerMixins],
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

                this.uploading = true

                DocumentAPI.uploadFile(this.leadId, data).then(response => {
                    this.fileForUpload = null
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
            }
        },
        mounted() {
            console.log('mounted')
            if(this.leadId){
                this.getDocuments();
            }
        }
    }
</script>

<style scoped>

</style>