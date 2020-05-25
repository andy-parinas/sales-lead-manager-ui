<template>
    <v-form v-model="isFormValid">
        <v-card-text>
            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" sm="6">
                        <v-text-field
                                prepend-icon="mdi-account"
                                label="Name"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                                prepend-icon="mdi-account"
                                label="username"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                                prepend-icon="mdi-account"
                                label="Email"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                                prepend-icon="mdi-account"
                                label="User Type"
                        />
                    </v-col>

                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" dark >Save</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    export default {
        name: "UserForm",
        data(){
            return {
                isFormValid: false
            }
        }
    }
</script>

<style scoped>

</style>