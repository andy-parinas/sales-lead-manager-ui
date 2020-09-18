<template>
    <div>
        <v-autocomplete
            v-model="roofColour"
            :items="roofColours"
            :search-input.sync="search"
            :loading="loading"
            :rules="isRequired? [v => !!v || 'This field is required'] : []"
            clearable
            item-value="id"
            item-text="name"
            color="black"
            label="Roof Colour"
            no-filter
            prepend-icon="mdi-home-outline"
            persistent-hint
            @change="roofColourValueChange"
            return-object>
        </v-autocomplete>
    </div>
</template>

<script>
import RoofColourAPI from "@/api/RoofColourAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";

export default {
    name: "RoofColourSelect",
    props: ['isRequired', 'initialRoofColour'],
    data(){
        return {
            roofColour: '',
            roofColours: [],
            loading: false,
            search: '',
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        getRoofColour(){
            this.loading = true;
            RoofColourAPI.getRoofColours().then(response => {
                this.roofColours = response.data
                if(this.initialRoofColour){
                    this.roofColour = this.initialRoofColour
                }
            }).catch(error => {
                this.handleError(error)
            }).finally(() => {
                this.loading = false
            })
        },
        roofColourValueChange(){
            this.$emit('onValueChanged', this.roofColour)
        }
    },
    mounted() {
        this.getRoofColour();
    }
}
</script>

<style scoped>

</style>