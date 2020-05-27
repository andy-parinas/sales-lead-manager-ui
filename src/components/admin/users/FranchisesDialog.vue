<template>
    <v-card>
        <DialogHeader title="User Franchises">
            <template v-slot:action>
                <v-btn icon @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text >
            <div class="d-flex align-start my-10">
                <v-col cols="12" sm="6">
                    <FranchisesAll />
                </v-col>
                <v-col cols="12" sm="6">
                   <FranchisesUsers />
                </v-col>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import FranchisesAll from "./FranchisesAll";
    import FranchisesUsers from "./FranchisesUsers";
    export default {
        name: "FranchisesDialog",
        components: {FranchisesUsers, FranchisesAll, DialogHeader},
        data(){
            return {
            }
        }
    }
</script>

<style scoped>

</style>