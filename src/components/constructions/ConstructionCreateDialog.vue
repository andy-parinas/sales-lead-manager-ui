<template>
    <v-card>
        <DialogHeader title="Add Payment Schedule">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <ConstructionForm @onSave="addConstructionHandler" :saving="saving" ref="constructionForm" />
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import ConstructionForm from "./shared/ConstructionForm";
    export default {
        name: "ConstructionCreateDialog",
        components: {ConstructionForm, DialogHeader},
        data(){
            return {
                saving: false
            }
        },
        methods: {
            addConstructionHandler(){

            },
            closeDialog(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>