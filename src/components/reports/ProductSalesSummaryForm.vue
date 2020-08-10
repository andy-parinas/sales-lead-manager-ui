<template>
    <v-card outlined>
        <v-form v-model="valid">
            <v-card-text>
                <v-row class="mx-2">
                    <v-col cols="12">
                        <DateSelect label="Start Date" :required="true" @onDateSelected="startDateSelectHandler" />
                    </v-col>
                    <v-col cols="12">
                        <DateSelect label="End Date" :required="true" @onDateSelected="endDateSelectHandler" />
                    </v-col>
                    <v-col cols="12">
                        <ProductSelect @onValueChanged="onProductSelectHandler" />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="px-5">
                <v-btn small width="100%" color="blue darken-1" class="mb-5 white--text"
                       @click="generateReport"
                       :disabled="!formValid">
                    Generate Report
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    import DateSelect from "./shared/DateSelect";
    import ProductSelect from "./shared/ProductSelect";
    export default {
        name: "ProductSalesSummaryForm",
        components: {ProductSelect, DateSelect},
        data(){
            return {
                valid: false,
                form: {
                    startDate: '',
                    endDate: '',
                    productId: ''
                }
            }
        },
        computed: {
            formValid(){
                return this.form.startDate !== "" && this.form.endDate !== ""
            }
        },
        methods: {
            startDateSelectHandler(startDate){
                this.form.startDate = startDate
            },
            endDateSelectHandler(endDate){
                this.form.endDate = endDate
            },
            onProductSelectHandler(productId){
                this.form.productId = productId
            },
            generateReport(){

            }
        }
    }
</script>

<style scoped>

</style>