<template>
    <v-chip :small="small" label :color="chipColor" text-color="white">
        {{ outcome | capitalize }}
    </v-chip>
</template>

<script>
    export default {
        name: "ChipOutcome",
        props: ['outcome', 'small'],
        computed: {
            chipColor(){
                switch (this.outcome) {
                    case 'pending':
                        return 'blue';
                    case 'follow-up':
                        return 'teal';
                    case 'lost':
                        return 'red';
                    case 'success':
                        return 'green';
                    case 'deferred':
                        return 'light-green darken-2'
                    case 'cancelled':
                        return 'grey darken-1'
                    case 'did not proceed':
                        return 'grey darken-1'
                    default:
                        return 'grey'
                }

            }
        }
    }
</script>

<style scoped>

</style>