<template>
    <div>
        <v-card outlined>

            <div class="d-flex flex-column justify-center align-center my-12" v-if="loading">
                <v-progress-circular class="mt-12"
                                     :size="70"
                                     :width="7"
                                     color="primary"
                                     indeterminate
                ></v-progress-circular>
                <span class="mt-5 subtitle-1">Loading Products </span>
            </div>

            <div class="d-flex flex-column justify-center align-center my-12" v-if="!loading && products.length === 0">
                <span class="mt-5 subtitle-1"> No Lead Sources. Please Create One </span>
            </div>

            <v-card-text  v-if="!loading && products.length > 0" >
                <v-row class="mx-2">
                    <v-col cols="12">
                        <v-list subheader wo-line flat >
                            <v-subheader>Products</v-subheader>

                            <v-list-item-group>
                                <template  v-for="(product, index) in products">
                                    <v-list-item  :key="product.name">
                                        <template v-slot:default >
                                            <v-list-item-content>
                                                <v-list-item-title>{{ product.name }}</v-list-item-title>
                                                <v-list-item-subtitle v-text="product.description"></v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-action>
                                                <v-row class="justify-sm-start">
                                                    <v-btn x-small fab text dark color="error" class="mr-3" @click="deleteProduct(product)" >
                                                        <v-icon small > mdi-trash-can-outline </v-icon>
                                                    </v-btn>
                                                    <v-btn x-small fab text dark color="accent" @click="editProduct(product)"  >
                                                        <v-icon small > mdi-pencil </v-icon>
                                                    </v-btn>
                                                </v-row>
                                            </v-list-item-action>
                                        </template>
                                    </v-list-item>
                                    <v-divider
                                        v-if="index + 1 < products.length"
                                        :key="index"
                                    ></v-divider>
                                </template>
                            </v-list-item-group>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-dialog v-model="showEditDialog" persistent max-width="500px">
            <ProductEditDialog
                :initial-data="selectedItem"
                @close="showEditDialog = false"/>
        </v-dialog>
        <v-dialog v-model="showDeleteDialog" persistent max-width="500px">
            <ProductDeleteDialog
                :product="selectedItem"
                @close="showDeleteDialog = false"/>
        </v-dialog>
    </div>
</template>

<script>
import ProductAPI from "@/api/ProductAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import EventBus from "@/helpers/EventBus";
import ProductEditDialog from "@/components/admin/product/ProductEditDialog";
import ProductDeleteDialog from "@/components/admin/product/ProductDeleteDialog";

export default {
    name: "ProductList",
    components: {ProductDeleteDialog, ProductEditDialog},
    data(){
        return {
            products: [],
            loading: false,
            showEditDialog: false,
            showDeleteDialog: false,
            selectedItem: null
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        getProducts(){
            this.loading = true;
            ProductAPI.getProducts().then(response => {
                this.products = response.data
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false
            })
        },
        deleteProduct(product){
            this.selectedItem = product
            this.showDeleteDialog = true;
        },
        editProduct(product){
            this.selectedItem = product
            this.showEditDialog = true;
        },
        addProduct(product){
            this.products.push(product)
        },
        updateProducts(product){
            const updatedProduct = this.products.map(p => {
                if(p.id === product.id){
                    return product;
                }else {
                    return p;
                }
            })

            this.products = updatedProduct;
        },
        updateProductsOnDelete(product){
            console.log()
            const updatedProducts = this.products.filter(p => p.id !== product.id);

            this.products = updatedProducts;
        }
    },
    mounted() {
        this.getProducts();
        EventBus.$on('PRODUCT_CREATED', payload => this.addProduct(payload))
        EventBus.$on('PRODUCT_UPDATED', payload => this.updateProducts(payload))
        EventBus.$on('PRODUCT_DELETED', payload => this.updateProductsOnDelete(payload))
    }
}
</script>

<style scoped>

</style>