<template>
    <v-card min-height="650px">
        <DialogHeader :title="selectedUser.name">
            <template v-slot:action>
                <v-btn icon @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text >
            <v-row class="d-flex align-start my-10">
                <v-col cols="12" sm="6">
                    <FranchisesAll />
                </v-col>
                <v-col cols="12" sm="6">
                   <FranchisesUsers />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapState} from 'vuex';
    import DialogHeader from "../../core/DialogHeader";
    import FranchisesAll from "./FranchisesAll";
    import FranchisesUsers from "./FranchisesUsers";

    export default {
        name: "FranchisesDialog",
        components: {FranchisesUsers, FranchisesAll, DialogHeader},
        data(){
            return {
            }
        },
        computed: {
            ...mapState('users', ['selectedUser'])
        }
    }
</script>

<style scoped>

</style>