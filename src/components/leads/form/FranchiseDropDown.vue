<template>
    <v-select @change="franchiseChange"
              v-model="franchise"
              :items="franchiseItems"
              :rules="required? [v => !!v || 'This field is required'] : []"
              :loading="franchiseChecking || loading"
              clearable
              item-text="title"
              label="Franchise Number"
              prepend-icon="mdi-store"
              return-object
              required
    ></v-select>
</template>

<script>
    import FranchiseAPI from "../../../api/FranchiseAPI";

    export default {
        name: "FranchiseDropDown",
        props: ['required', 'franchiseChecking'],
        data(){
            return {
                loading: false,
                franchiseItems: [],
                franchise: null,
                pageOptions: {
                    sortBy: ['franchise_number'],
                    sortDesc: [false],
                    itemsPerPage: 50,
                    all: 'true'
                },
            }
        },
        methods: {
            getAllFranchises(){
                this.loading = true;
                FranchiseAPI.getAllSubFranchises(this.pageOptions).then(response => {
                    this.franchiseItems = response.data
                }).catch(error => {
                    console.log(error.response)
                }).finally(() => {
                    this.loading = false;
                })
            },
            franchiseChange(){
                this.$emit('onValueChanged', this.franchise)
            }
        },
        mounted() {
            this.getAllFranchises()
        }
    }
</script>

<style scoped>

</style>