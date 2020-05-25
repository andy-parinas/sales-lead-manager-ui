<template>
    <v-chip small label :color="chipColor" text-color="white">
        {{ userType | snakeCaseToRegular }}
    </v-chip>
</template>

<script>
    export default {
        name: "ChipUserType",
        props: {
            userType: {required: true, type: String}
        },
        computed: {
            chipColor(){
                switch (this.userType) {
                    case 'head_office':
                        return 'green darker-1';
                    case 'franchise_admin':
                        return 'blue darker-1';
                    case 'staff_user':
                        return 'orange darker-1';
                    default:
                        return 'grey'
                }

            }
        }
    }
</script>

<style scoped>

</style>