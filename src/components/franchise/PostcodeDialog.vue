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
            <v-row v-if="selectedFranchise" class="mt-5">
                <v-col cols="12">
                    <div>
                        <span class="subtitle-2">Franchise Number: </span>
                        <span class="subtitle-1 font-weight-black">{{ selectedFranchise.franchiseNumber }}</span>
                    </div>
                </v-col>
            </v-row>
            <v-row class="d-flex align-start mt-1 mb-10">
                <v-col cols="12" sm="6">
                    <AllPostcode
                            :franchise="selectedFranchise"
                            @onPostcodeAdded="postcodeAdded"/>
                </v-col>
                <v-col cols="12" sm="6">
                    <FranchisePostcode
                            :franchise="selectedFranchise"
                            ref="franchisePostcode"/>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import AllPostcode from "./postcode/AllPostcode";
    import FranchisePostcode from "./postcode/FranchisePostcode";
    export default {
        name: "PostcodeDialog",
        components: {FranchisePostcode, AllPostcode, DialogHeader},
        props: {
            selectedFranchise: {required: true}
        },
        methods: {
            closeDialog(){
                this.$emit('close')
            },
            postcodeAdded(postcode){
                this.$refs.franchisePostcode.updatePostcodes(postcode)
            }
        },
        computed: {
            isParent(){
                return this.selectedFranchise && this.selectedFranchise.parentId === null;
            }
        },
        mounted() {
            console.log('Postcode Dialog mounted', this.selectedFranchise)
        }
    }
</script>

<style scoped>

</style>