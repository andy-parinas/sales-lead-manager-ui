<template>
    <v-card>
        <DialogHeader title="Delete Product">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text>
            <div class="mt-3 subtitle-1"> The Delete process is unrecoverable. Are you sure you want to delete?</div>
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="product">{{ product.name }} </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" class="mr-3 mb-2 white--text"
                   @click="deleteProduct"
                   :loading="deleting">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import ProductAPI from "@/api/ProductAPI";
import EventBus from "@/helpers/EventBus";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import {mapActions} from 'vuex';


export default {
    name: "ProductDeleteDialog",
    components: {DialogHeader},
    props: ['product'],
    data(){
        return {
            deleting: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        deleteProduct(){
            this.deleting = true;
            ProductAPI.deleteProduct(this.product.id).then(response => {
                EventBus.$emit('PRODUCT_DELETED', response.data)
                this.setSuccessMessage("Product Successfully Deleted");
                this.closeDialog();
            }).catch(error => {
                this.handleError(error);
            }).finally(() => {
                this.deleting = false;
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