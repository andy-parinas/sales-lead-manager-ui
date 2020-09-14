<template>
    <div>
        <v-autocomplete
            v-model="roofSheet"
            :items="roofSheets"
            :search-input.sync="search"
            :loading="loading"
            :rules="isRequired? [v => !!v || 'This field is required'] : []"
            clearable
            item-value="id"
            item-text="name"
            color="black"
            label="Roof Sheet"
            no-filter
            prepend-icon="mdi-home-outline"
            persistent-hint
            @change="roofSheetValueChange"
            return-object>
        </v-autocomplete>
    </div>
</template>

<script>
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import RoofSheetAPI from "@/api/RoofSheetAPI";

export default {
    name: "RoofSheetSelect",
    props: ['isRequired', 'initialRoofColourId'],
    data(){
        return {
            roofSheet: '',
            roofSheets: [],
            loading: false,
            search: '',
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        getRoofSheet(){
            this.loading = true;
            RoofSheetAPI.getRoofSheets().then(response => {
                this.roofSheets = response.data
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false
            })
        },
        roofSheetValueChange(){

        }
    },
    mounted() {
        this.getRoofSheet();
    }
}
</script>

<style scoped>

</style>