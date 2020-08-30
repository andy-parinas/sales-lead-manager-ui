<template>
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
                   @click="createProduct"
                   :loading="loading"
                   :disabled="!isFormValid">
                Create Product
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import ProductAPI from "@/api/ProductAPI";
import {mapActions} from 'vuex';
import EventBus from "@/helpers/EventBus";

export default {
    name: "ProductForm",
    data(){
        return {
            form: {
                name: '',
                description: ''
            },
            isFormValid: false,
            loading: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        createProduct(){
            this.loading = true;
            ProductAPI.createProduct(this.form).then(response => {
                EventBus.$emit('PRODUCT_CREATED', response.data);
                this.setSuccessMessage('Product Successfully Created');
                this.$set(this.form, 'name', "");
                this.$set(this.form, 'description', "");
                this.$refs.form.resetValidation();
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false;
            })
        }
    }
}
</script>

<style scoped>

</style>