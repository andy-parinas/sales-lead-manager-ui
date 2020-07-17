<template>
    <v-chip small label :color="chipColor" text-color="white">
        {{ franchiseType  }}
    </v-chip>
</template>

<script>
    export default {
        name: "ChipFranchiseType",
        props: {
            franchiseType: {required: true, type: String}
        },
        computed: {
            chipColor(){
                switch (this.franchiseType) {
                    case 'Main Franchise':
                        return 'green darker-1';
                    case 'Sub-Franchise':
                        return 'blue darker-1';
                    default:
                        return 'grey'
                }

            }
        }
    }
</script>

<style scoped>

</style>