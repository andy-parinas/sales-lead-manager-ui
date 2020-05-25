<template>
    <v-card>
        <v-toolbar color="blue-grey darken-1" dark >
            <v-toolbar-title><span>Edit User </span> </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="$emit('close')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <UserForm />
    </v-card>
</template>

<script>
    import UserForm from "./shared/UserForm";
    export default {
        name: "EditDialog",
        components: {UserForm},
        data(){
            return {
                assignedFranchise: [
                    '100','200','300','400','500','600','700','800','900','1000',
                ],
                allFranchises: [
                    '100','200','300','400','500','600','700','800','900','1000',
                    '1001','2001','3001','4001','5001','6001','7001','8001','9001','1002',
                ]
            }
        }
    }
</script>

<style scoped>

</style>