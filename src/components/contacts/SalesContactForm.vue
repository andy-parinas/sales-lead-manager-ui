<template>
    <v-card>
        <v-toolbar color="blue-grey darken-1" dark >
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-row class="mx-2">
                <v-col cols="6">
                    <v-text-field v-model="item.firstName"
                            prepend-icon="mdi-account"
                            label="First Name"
                    />
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="item.lastName"
                            prepend-icon="mdi-account-plus"
                            label="Last Name"
                    />
                </v-col>
    <!--  Email Sections-->
                <v-col cols="6">
                    <v-text-field v-model="item.email"
                            prepend-icon="mdi-email"
                            label="E-Mail"
                    />
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="item.email2"
                            prepend-icon="mdi-email-outline"
                            label="Additonal Email (If Any)"
                    />
                </v-col>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="item.contactNumber"
                                    type="tel"
                                    prepend-icon="mdi-phone"
                                    placeholder="(000) 000 - 0000"
                            />
                        </v-col>
                    </v-row>
                </v-col>
    <!--  End of Email Sections-->
    <!--  Address Sections-->
                <v-col cols="6">
                    <v-text-field v-model="item.street1"
                            prepend-icon="mdi-home"
                            placeholder="Address"
                    />
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="item.street2"
                            prepend-icon="mdi-sign-direction"
                            placeholder="Street"
                    />
                </v-col>
    <!--  End of Address Sections-->
    <!--  State Sections-->
                <v-col cols="6">
                    <v-text-field v-model="item.suburb"
                            prepend-icon="mdi-home-modern"
                            placeholder="Suburb"
                    />
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="item.state"
                            prepend-icon="mdi-map"
                            placeholder="State"
                    />
                </v-col>
    <!--  End of State Sections-->
    <!--  Postcode Sections-->
                <v-col cols="6">
                    <v-text-field v-model="item.postcode"
                            prepend-icon="mdi-mailbox"
                            placeholder="Postcode"
                    />
                </v-col>
                <v-col cols="6"></v-col>
            </v-row>
        </v-container>
        <v-card-actions>
            <v-spacer />
            <v-btn
                    text
                    color="primary"
                    @click="$emit('closeForm')"
            >Cancel</v-btn>
            <v-btn
                    text
                    @click="$emit('save')"
            >Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "SalesContactForm",
        props: {
            item: {required: true, type: Object},
            formTitle: {required: true, type: String}
        },
        data(){
            return {}
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>