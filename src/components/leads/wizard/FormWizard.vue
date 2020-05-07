<template>
    <div>
        <v-row justify="center">
            <v-col cols="12" sm="10">
                <v-card flat>
                    <v-toolbar flat color="blue-grey" dark>
                        <v-toolbar-title>Create New Lead</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn text @click="$emit('cancel')">
                            <v-icon>mdi-arrow-left-bold</v-icon>
                            <span> Go Back </span>
                        </v-btn>
                    </v-toolbar>
                    <v-container>
                        <FormSalesContactSelect />
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import FormSalesContactSelect from "./FormSalesContactSelect";
    export default {
        name: "FormWizard",
        components: { FormSalesContactSelect }
    }
</script>

<style scoped>

</style>