<template>
    <v-card class="pb-5">
        <DialogHeader title="Upload Franchise Postcode">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-row class="mx-10 mt-4" align="center">
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
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import FranchiseAPI from "@/api/FranchiseAPI";
import {mapActions} from 'vuex';
import ErrorHandlerMixins from "@/mixins/ErrorHandler";

export default {
    name: "UploadDialog",
    components: {DialogHeader},
    data(){
        return {
            fileForUpload: null,
            uploading: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        uploadFile(){

            const data = new FormData();
            data.append('file', this.fileForUpload)
            data.append('title', this.fileForUpload.name)
            data.append('type', this.fileForUpload.type? this.fileForUpload.type : "unknown" )

            this.uploading = true;
            FranchiseAPI.uploadFranchisePostcode(data).then(() => {
                this.setSuccessMessage("Franchise-Postcode Successfully Uploaded")
                this.closeDialog()
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.uploading = false;
            })

        },
        closeDialog(){
            this.$emit('close')
        }
    }
}
</script>

<style scoped>

</style>