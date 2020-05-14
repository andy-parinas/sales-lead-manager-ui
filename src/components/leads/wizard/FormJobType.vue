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
                               v-model="product"
                               :items="products"
                               :rules="rules.required"
                               return-object
                               label="Product"
                               prepend-icon="mdi-cart"
                               required
                       ></v-autocomplete>
                   </v-col>
                   <v-col cols="12" sm="6">
                       <v-autocomplete
                               v-model="designAssessor"
                               :items="designAssessors"
                               :rules="rules.required"
                               :loading="searchAssessorLoading"
                               :search-input.sync="search"
                               @keyup="searchOnKeyUp"
                               return-object
                               no-filter
                               cache-items
                               label="Design Advisor"
                               prepend-icon="mdi-card-account-details"
                               required
                       ></v-autocomplete>
                   </v-col>
                   <v-col cols="12" sm="6">
                       <v-textarea
                               v-model="form.description"
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
                          :disabled="!valid"
                          @click="moveNext">Continue</v-btn>
               </v-row>
           </v-container>
       </v-form>

   </div>
</template>

<script>
    import {format, parseISO} from 'date-fns';

    import ProductAPI from "../../../api/ProductAPI";
    import DesignAssessorAPI from "../../../api/DesignAssessorAPI";

    export default {
        name: "FormJobType",
        data(){
            return {
                menu: false,
                valid: false,
                productLoading: false,
                designAssessor: null,
                product: null,
                form: {
                    takenBy: '',
                    dateAllocated: new Date().toISOString().substr(0, 10),
                    productId: '',
                    productName: '',
                    designAssessorId: '',
                    designAssessorName: '',
                    description: ''
                },
                rules: {
                    required: [
                        v => !!v || 'This field is required',
                    ]
                },
                products: [],
                designAssessors: [],
                searchAssessorLoading: false,
                search: ''
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

                if(this.product) {
                    this.form.productId = this.product.value;
                    this.form.productName = this.product.text;
                }

                if(this.designAssessor){
                    this.form.designAssessorId = this.designAssessor.value;
                    this.form.designAssessorName = this.designAssessor.text;
                }

                this.$emit('moveNext', this.form)
            },
            searchOnKeyUp(event){

                const excludedKeys = [
                    9,16,18,17, 112,113,114,115,116,117,118,119,120,121,122, 123,
                    36,35,144,20,45,33,34,27,37,38,39,40,91,13
                ]

                console.log(event);
                // Do not listen for the Tab Key
                if(event && !excludedKeys.includes(event.keyCode)){
                    if(this.search && this.search.length >= 3 && this.search.trim() !== '' ){
                        this.searchAssessor(this.search)
                    }
                }

            },
            searchAssessor(val){

                console.log('searching')

                if(this.searchAssessorLoading) return;

                this.searchAssessorLoading = true;
                DesignAssessorAPI.search(val).then(response => {

                    this.designAssessors = response.data.map(assessor => {
                        return {
                            value: assessor.id,
                            text: assessor.firstName + ' ' + assessor.lastName
                        }
                    })

                }).catch(error => {
                    console.log(error);

                }).finally(() => {
                    this.searchAssessorLoading = false;
                })


            }
        },
        watch: {
            // search(newValue, oldValue){
            //     if(newValue && newValue.length >= 3){
            //         if(newValue !== oldValue){
            //             this.searchAssessor(newValue);
            //         }
            //     }
            // },
            designAssessor(){
                console.log(this.designAssessor);
            }
        },
        created() {
            this.getAllProducts();
        }
    }
</script>

<style scoped>

</style>