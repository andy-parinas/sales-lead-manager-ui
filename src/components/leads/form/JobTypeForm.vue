<template>
    <v-form v-model="valid">
        <v-container v-if="!productLoading" >
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
                            @change="productChange"
                            label="Product"
                            prepend-icon="mdi-cart"
                            required
                    ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                    <DesignAdvisorSelect
                        :design-advisor="initialData? {id: initialData.designAssessorId, title: initialData.designAssessor }: null"
                        @onValueChanged="designAssessorChange" />
                </v-col>
                <v-col cols="12" sm="12">
                    <v-textarea
                            v-model="form.description"
                            label="Description"
                            auto-grow
                            rows="1"
                            row-height="25"
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-container>
        <v-skeleton-loader v-else
                           ref="skeleton"
                           type="article"
                           class="mx-auto"
        ></v-skeleton-loader>
    </v-form>
</template>

<script>
    import ProductAPI from "../../../api/ProductAPI";
    import {format, parseISO} from "date-fns";
    import DesignAdvisorSelect from "./DesignAdvisorSelect";
    import ErrorHandlerMixins from "@/mixins/ErrorHandler";

    export default {
        name: "JobTypeForm",
        components: {DesignAdvisorSelect},
        props: ['initialData'],
        data(){
            return {
                form: {
                    takenBy: '',
                    dateAllocated: new Date().toISOString().substr(0, 10),
                    productId: '',
                    product: '',
                    salesStaffId: '',
                    designAdvisor: '',
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
                search: '',
                menu: false,
                valid: false,
                productLoading: false,
                designAssessor: null,
                product: null,
            }
        },
        computed: {
            computedDateFormattedDatefns () {
                return this.form.dateAllocated ? format(parseISO(this.form.dateAllocated), 'dd/MM/yyyy') : ''
            },
        },
        mixins: [ErrorHandlerMixins],
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
                    this.handleError(error)
                }).finally(() => {
                    this.productLoading = false;
                })
            },

            productChange(){
                if(this.products.length > 0){
                    const product = this.products.find(p => {
                        return p.value === this.form.productId
                    })

                    // if(product) this.form.product = product.text
                    if(product){
                        this.$set(this.form, 'product',product.text)
                    }
                }
            },
            designAssessorChange(staff){

                if(staff){
                    // this.form.designAssessorId = staff.id;
                    // this.form.designAssessor = staff.title
                    this.$set(this.form, 'designAssessorId', staff.id)
                    this.$set(this.form, 'designAssessor', staff.title)
                }
            }

        },
        watch: {
            form: {
                handler(){
                    this.$emit('updateData', this.form)
                },
                deep: true
            }
        },
        created() {
            this.getAllProducts();
        },
        mounted() {

            if(this.initialData){
                this.form = Object.assign({}, this.initialData)
            }

            if(this.initialData && this.initialData.designAssessorId && this.initialData.designAssessor){
                const designAssessor = {
                    value: this.initialData.designAssessorId,
                    text: this.initialData.designAssessor
                }
                this.designAssessors.push(designAssessor)
            }
        }
    }
</script>

<style scoped>

</style>