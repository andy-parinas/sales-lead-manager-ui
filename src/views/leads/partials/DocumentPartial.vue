<template>
    <div>
        <v-card flat class="mx-10 mt-10" outlined>
            <v-list >
                <template v-for="(document, index) in documents">
                    <v-list-item  :key="document.id">
                        <DocumentIcon :document-type="document.type" />
                        <span class="ml-2">{{ document.title }}</span>
                        <v-spacer></v-spacer>
                        <div class="d-flex">
                            <v-btn  @click="$emit('edit')"
                                    x-small fab text color="primary" dark>
                                <v-icon small>edit</v-icon>
                            </v-btn>
                            <v-btn  @click="$emit('remove')"
                                    x-small fab text color="error" dark>
                                <v-icon small>delete</v-icon>
                            </v-btn>
                            <v-btn  @click="$emit('remove')"
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
            <v-file-input show-size label="Lead Document"></v-file-input>
            <v-btn small color="primary" class="text--white ml-3">
                Upload
                <v-icon small>mdi-upload</v-icon>
            </v-btn>
        </v-row>
    </div>
</template>

<script>

    import DocumentAPI from "../../../api/DocumentAPI";
    import DocumentIcon from "./DocumentIcon";

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

            }
        },
        methods: {
            getDocuments(){
                this.loading = true;
                DocumentAPI.getDocuments(this.leadId).then(response => {
                    this.documents = response.data
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.loading = false
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