<template>
    <div class="mb-12">
        <v-card>
            <v-data-table></v-data-table>
        </v-card>
    </div>
</template>

<script>

    import UsersAPI from "../../../api/UsersAPI";

    export default {
        name: "UsersAdminTable",
        data(){
            return {}
        },
        methods:{
            getUsers(){
                UsersAPI.getUsers().then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error.response)
                })
            }

        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style scoped>

</style>