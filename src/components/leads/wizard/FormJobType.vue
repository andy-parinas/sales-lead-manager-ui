<template>
   <div>
       <v-form v-model="valid">
           <v-container>
               <v-row class="mx-2">
                   <v-col cols="12" sm="6">
                       <v-text-field v-model="form.takenBy"
                                     prepend-icon="mdi-account-edit"
                                     label="Taken By"
                                     :rules="rules.required"
                       />
                   </v-col>
                   <v-col cols="12" sm="6">
                       <v-menu
                               v-model="menu"
                               ref="menu"
                               :close-on-content-click="false"
                               transition="scale-transition"
                               offset-y
                               max-width="290px"
                               min-width="290px"
                       >
                           <template v-slot:activator="{ on }">
                               <v-text-field
                                       prepend-icon="event"
                                       :value="computedDateFormattedDatefns"
                                       label="Date Allocated"
                                       readonly
                                       v-on="on"
                               ></v-text-field>
                           </template>
                           <v-date-picker
                                   v-model="form.dateAllocated"
                                   @input="menu = false"
                           ></v-date-picker>
                       </v-menu>
                   </v-col>
                   <v-col cols="12" sm="6">
                       <v-autocomplete
                               v-model="form.productId"
                               :items="products"
                               :rules="rules.required"
                               label="Product"
                               prepend-icon="mdi-cart"
                               required
                       ></v-autocomplete>
                   </v-col>
                   <v-col cols="12" sm="6">
                       <v-text-field v-model="form.takenBy"
                                     prepend-icon="mdi-card-account-details"
                                     label="Design Advisor"
                                     :rules="rules.required"
                       />
                   </v-col>
                   <v-col cols="12" sm="6">
                       <v-textarea
                               label="Description"
                               auto-grow
                               outlined
                               rows="3"
                               row-height="25"
                               shaped
                       ></v-textarea>
                   </v-col>
               </v-row>
               <v-row>
                   <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Cancel</v-btn>
                   <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Back</v-btn>
                   <v-btn color="primary"
                          @click="moveNext">Continue</v-btn>
               </v-row>
           </v-container>
       </v-form>

   </div>
</template>

<script>
    import {format, parseISO} from 'date-fns';

    import ProductAPI from "../../../api/ProductAPI";

    export default {
        name: "FormJobType",
        data(){
            return {
                menu: false,
                valid: false,
                productLoading: false,
                form: {
                    takenBy: '',
                    dateAllocated: new Date().toISOString().substr(0, 10),
                    productId: '',
                },
                rules: {
                    required: [
                        v => !!v || 'This field is required',
                    ]
                },
                products: []
            }
        },
        computed: {
            computedDateFormattedDatefns () {
                return this.form.dateAllocated ? format(parseISO(this.form.dateAllocated), 'dd/MM/yyyy') : ''
            },
        },
        methods: {
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
            moveNext(){
                this.$emit('moveNext', this.form)
            }
        },
        created() {
            this.getAllProducts();
        }
    }
</script>

<style scoped>

</style>