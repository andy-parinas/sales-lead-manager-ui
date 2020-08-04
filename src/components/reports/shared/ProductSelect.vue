<template>
    <v-autocomplete
            v-model="productId"
            :items="products"
            :loading="productLoading"
            clearable
            @change="productChange"
            label="Product"
            prepend-icon="mdi-cart"
            required
    ></v-autocomplete>
</template>

<script>
    import ProductAPI from "../../../api/ProductAPI";

    export default {
        name: "ProductSelect",
        data(){
            return {
                productId: null,
                products: [],
                productLoading: false,
                rules: {
                    required: [
                        v => !!v || 'This field is required',
                    ]
                },
            }
        },
        methods: {
            productChange()
            {
                this.$emit('onValueChanged', this.productId)
            },
            getAllProducts(){
                this.productLoading = true;
                ProductAPI.getProducts().then(response => {

                    this.products = response.data.map(product => {
                        return {
                            value: product.id,
                            text: product.name
                        }
                    })
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.productLoading = false;
                })
            },
        },
        mounted() {
            this.getAllProducts()
        }
    }
</script>

<style scoped>

</style>