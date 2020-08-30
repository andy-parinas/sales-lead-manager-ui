<template>
    <v-card>
        <DialogHeader title="Edit Product">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card outlined>
            <v-card-text>
                <v-form v-model="isFormValid" ref="form">
                    <v-row class="mx-2">
                        <v-col cols="12">
                            <v-text-field
                                v-model="form.name"
                                :rules="[v => !!v || 'This field is required', v => v !== null && v.length >= 3 || 'Min 3 characters']"
                                label="Product Name">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                v-model="form.description"
                                rows="1"
                                label="Description">
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions class="px-5">
                <v-btn small width="100%" color="blue darken-1" class="mb-5 white--text"
                       @click="updateProduct"
                       :loading="loading"
                       :disabled="!isFormValid">
                    Update Product
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-card>
</template>

<script>
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import DialogHeader from "@/components/core/DialogHeader";
import ProductAPI from "@/api/ProductAPI";
import {mapActions} from 'vuex';
import EventBus from "@/helpers/EventBus";

export default {
    name: "ProductEditDialog",
    props: ['initialData'],
    components: {DialogHeader},
    data() {
        return {
            isFormValid: false,
            loading: false,
            form: {
                name: '',
                description: ''
            }
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        updateProduct(){
            this.loading = true
            ProductAPI.updateProduct(this.initialData.id, this.form).then(response => {

                this.setSuccessMessage("Product Successfully Updated");
                EventBus.$emit('PRODUCT_UPDATED', response.data);
                this.closeDialog();

            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false;
            })
        },
        closeDialog(){
            this.$emit('close')
        }
    },
    watch: {
        initialData: {
            handler(){
                if(this.initialData){
                    this.form = Object.assign({}, this.initialData)
                }
            },
            deep: true
        }
    },
    mounted() {
        if(this.initialData){
            this.form = Object.assign({}, this.initialData)
        }
    }
}
</script>

<style scoped>

</style>