<template>
    <v-form v-model="isFormValid">
        <v-card-text>
            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" sm="6">
                        <v-text-field
                                v-model="form.name"
                                prepend-icon="mdi-card-account-details"
                                label="Name"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                                v-model="form.username"
                                prepend-icon="mdi-account-circle"
                                label="username"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                                v-model="form.email"
                                prepend-icon="mdi-email"
                                label="Email"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="form.userType"
                                :items="userTypes"
                                label="User Type"
                                prepend-icon="mdi-human"
                                required
                        ></v-select>

                    </v-col>

                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" dark class="mr-10 mb-5" @click="$emit('onSave', form)" :loading="loading" >Save</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    export default {
        name: "UserForm",
        props: {
            initialData: {type: Object},
            loading: {type: Boolean}
        },
        data(){
            return {
                isFormValid: false,
                form: {
                    name: '',
                    username: '',
                    email: '',
                    userType: ''
                },
                userTypes: [
                    {text: 'Head Office', value: 'head_office'},
                    {text: 'Franchise Admin', value: 'franchise_admin'},
                    {text: 'Staff User', value: 'staff_user'},
                ]
            }
        },
        watch: {
            initialData: {
                handler(){
                    if(this.initialData){
                        this.form = Object.assign({}, this.initialData)
                    }
                },
                deep: true
            }
        },
        mounted() {
            if(this.initialData){
                this.form = Object.assign({}, this.initialData)
            }
        }

    }
</script>

<style scoped>

</style>