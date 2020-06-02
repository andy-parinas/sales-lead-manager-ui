<template>
    <v-card>
        <DialogHeader title="Edit Franchise">
            <template v-slot:action>
                <v-btn icon @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <FranchiseForm :edited-item="editedItem" />
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import FranchiseForm from "./shared/FranchiseForm";
    export default {
        name: "EditFranchiseDialog",
        components: {FranchiseForm, DialogHeader},
        props: ['editedItem']
    }
</script>

<style scoped>

</style>