<template>
    <v-card flat class="mx-10">
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-ticket-account</v-icon>
                    <span class="ml-2 caption font-weight-bold"> Taken By: </span> <span> {{ data.takenBy }}</span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-calendar-multiple-check</v-icon>
                    <span class="ml-2 caption font-weight-bold"> Date Allocated: </span> <span> {{ data.dateAllocated }} </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-icon small>mdi-cart</v-icon>
                    <span class="ml-2 caption font-weight-bold"> Product: </span> <span> {{ data.product | capitalize }} </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-icon small>mdi-clipboard-text</v-icon>
                    <span class="ml-2 caption font-weight-bold"> Description: </span>
                    <span>
                        {{ data.description }}
                    </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-icon small>mdi-pen</v-icon>
                    <span class="ml-2 caption font-weight-bold"> Design Advisor: </span> <span> {{ data.designAdvisor }} </span>
                </v-col>
            </v-row>
            <v-row v-if="data.designAdvisorContactNumber && data.designAdvisorEmail">
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-phone</v-icon>
                    <span class="ml-2"> {{ data.designAdvisorContactNumber }} </span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-email</v-icon>
                    <span class="ml-2"> {{ data.designAdvisorEmail }} </span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "JobTypePartial",
        props: {
            data: {required: true, type: Object}
        }
    }
</script>

<style scoped>

</style>