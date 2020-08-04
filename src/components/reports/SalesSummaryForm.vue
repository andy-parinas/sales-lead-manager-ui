<template>
    <v-card outlined>
        <v-form v-model="valid">
            <v-card-text>
                <v-row class="mx-2">
                    <v-col cols="12">
                        <v-menu
                                v-model="startDateMenu"
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
                                        :value="startDateFormattedDatefns"
                                        :rules="[rules.requiredField]"
                                        label="Start Date"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="form.startDate"
                                    @input="startDateMenu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12">
                        <v-menu
                                v-model="endDateMenu"
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
                                        :value="endDateFormattedDatefns"
                                        :rules="[rules.requiredField]"
                                        label="End Date"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="form.endDate"
                                    @input="endDateMenu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12">
                        <ProductSelect @onValueChanged="productSelected" />
                    </v-col>
                    <v-col cols="12">
                        <DesignAdvisorSelect @onValueChanged="designAdvisorSelected" />
                    </v-col>
                    <v-col cols="12">
                        <FranchiseDropDown @onValueChanged="franchiseSelected" />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="px-5">
                <v-btn small width="100%" color="blue darken-1" class="mb-5 white--text"
                       @click="generateReport"
                       :disabled="!valid">
                    Generate Report
                </v-btn>
            </v-card-actions>
        </v-form>
        <pre>{{ form }}</pre>
    </v-card>
</template>

<script>
    import {format, parseISO} from "date-fns";
    import EventBus from "../../helpers/EventBus";
    import ProductSelect from "./shared/ProductSelect";
    import DesignAdvisorSelect from "../leads/form/DesignAdvisorSelect";
    import FranchiseDropDown from "../leads/form/FranchiseDropDown";

    export default {
        name: "SalesSummaryForm",
        components: {FranchiseDropDown, DesignAdvisorSelect, ProductSelect},
        data(){
            return {
                valid: false,
                startDateMenu: false,
                endDateMenu: false,
                rules: {
                    requiredField: v => !!v || 'This field is required',
                },
                form: {
                    startDate: '',
                    endDate: '',
                    franchiseId: '',
                    productId: '',
                    designAdvisorId: ''
                }
            }
        },
        computed: {
            startDateFormattedDatefns () {
                return this.form.startDate ? format(parseISO(this.form.startDate), 'dd/MM/yyyy') : ''
            },
            endDateFormattedDatefns () {
                return this.form.endDate ? format(parseISO(this.form.endDate), 'dd/MM/yyyy') : ''
            },
            computedWarrantyDateFormattedDatefns () {
                return this.form.dateWarrantySent ? format(parseISO(this.form.dateWarrantySent), 'dd/MM/yyyy') : ''
            },
        },
        methods: {
            generateReport(){
                EventBus.$emit('GENERATE_REPORT', this.form)
            },
            franchiseSelected(franchise){
                if(franchise){
                    this.form.franchiseId = franchise.id
                }else {
                    this.form.franchiseId = ''
                }
            },
            productSelected(productId){
                if(productId){
                    this.form.productId = productId
                }else {
                    this.form.productId = ''
                }
            },
            designAdvisorSelected(designAdvisor){
                console.log(designAdvisor)
                if(designAdvisor){
                    this.form.designAdvisorId = designAdvisor.id
                }else {
                    this.form.designAdvisorId = ''
                }
            }
        }
    }
</script>

<style scoped>

</style>