<template>
    <v-form v-model="isFormValid" ref="form">
        <v-card-text>
            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" >
                        <v-text-field
                                v-model="form.franchiseNumber"
                                prepend-icon="filter_1"
                                label="Franchise Number"
                                :rules="[rules.requiredField]"
                        />
                    </v-col>
                    <v-col cols="12" >
                        <v-text-field
                                v-model="form.name"
                                prepend-icon="store_mall_directory"
                                label="Franchise Name"
                                :rules="[rules.requiredField]"
                        />
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                                v-model="form.description"
                                prepend-icon="description"
                                rows="1"
                                label="Description"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                                v-model="form.parentId"
                                clearable
                                prepend-icon="business"
                                :loading="loading"
                                :items="parents"
                                label="Parent Franchise"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" class="mr-10 mb-5 white--text"
                   @click="$emit('onSave', form)"
                   :loading="saving"
                   :disabled="!isFormValid && !edit">
                Save
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    import FranchiseAPI from "../../../api/FranchiseAPI";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";

    export default {
        name: "FranchiseForm",
        props: ['editedItem', 'saving'],
        data(){
            return {
                isFormValid: false,
                loading: false,
                edit: null,
                rules: {
                    requiredField: v => !!v || 'This field is required'
                },
                form: {
                    franchiseNumber: '',
                    franchiseName: '',
                    description: '',
                    parentId: ''

                },
                defaultForm: {
                    franchiseNumber: '',
                    franchiseName: '',
                    description: '',
                    parentId: ''

                },
                parents: []
            }
        },
        mixins: [ ErrorHandlerMixins],
        methods: {
            getParentFranchises(){
                this.loading = true;
                FranchiseAPI.getParentFranchises().then(response => {
                    const items = response.data.map(parent => {
                        return {
                            value: parent.id,
                            text: parent.franchiseNumber
                        }
                    })

                    this.parents = items;

                }).catch(error => {
                    //this.handleError(error)
                    console.log(error)
                }).finally(() => {
                    this.loading = false;
                })
            },
            clearData(){
                this.form = Object.assign({}, this.defaultForm)
            }
        },
        watch: {
            editedItem: {
                handler(){
                    if(this.editedItem){
                        this.form = Object.assign({}, this.editedItem)
                    }
                }
            }
        },
        mounted() {
            this.getParentFranchises();
            if(this.editedItem){
                this.form = Object.assign({}, this.editedItem)
            }
        }
    }
</script>

<style scoped>

</style>