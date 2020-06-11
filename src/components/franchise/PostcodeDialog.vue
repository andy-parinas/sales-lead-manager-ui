<template>
    <v-card>
        <DialogHeader title="Franchise Postcode">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text >
            <v-row class="d-flex align-start my-10">
                <v-col cols="12" sm="6">
                    <AllPostcode />
                </v-col>
                <v-col cols="12" sm="6">
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import AllPostcode from "./postcode/AllPostcode";
    export default {
        name: "PostcodeDialog",
        components: {AllPostcode, DialogHeader},
        props: {
            selectedFranchise: {required: true}
        },
        methods: {
            closeDialog(){
                this.$emit('close')
            }
        },
        mounted() {
            console.log('Postcode Dialog mounted', this.selectedFranchise)
        }
    }
</script>

<style scoped>

</style>