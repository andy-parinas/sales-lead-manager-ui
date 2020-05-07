<template>
    <v-row>
        <v-col cols="12">
            <h3>Please Select a Sales Contact</h3>
        </v-col>
        <v-col cols="12">
            <v-row>
                <v-col cols="12">
                    <v-text-field outlined clearable
                                  placeholder="First Name, Last Name or Email">
                    </v-text-field>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "FormSalesContactSelect"
    }
</script>

<style scoped>

</style>