<template>
    <v-card>
        <DialogHeader title="User Franchises">
            <template v-slot:action>
                <v-btn icon @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text >
            <div class="d-flex align-start my-10">
                <v-col cols="12" sm="6">
                    <FranchisesAll />
                </v-col>
                <v-col cols="12" sm="6">
                   <FranchisesUsers />
                </v-col>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import FranchisesAll from "./FranchisesAll";
    import FranchisesUsers from "./FranchisesUsers";
    export default {
        name: "FranchisesDialog",
        components: {FranchisesUsers, FranchisesAll, DialogHeader},
        data(){
            return {
                items: [
                    {
                        action: '15 min',
                        headline: 'Brunch this weekend?',
                        title: 'Ali Connors',
                        subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                    },
                    {
                        action: '2 hr',
                        headline: 'Summer BBQ',
                        title: 'me, Scrott, Jennifer',
                        subtitle: "Wish I could come, but I'm out of town this weekend.",
                    },
                    {
                        action: '6 hr',
                        headline: 'Oui oui',
                        title: 'Sandra Adams',
                        subtitle: 'Do you have Paris recommendations? Have you ever been?',
                    },
                    {
                        action: '12 hr',
                        headline: 'Birthday gift',
                        title: 'Trevor Hansen',
                        subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
                    },
                    {
                        action: '18hr',
                        headline: 'Recipe to try',
                        title: 'Britta Holt',
                        subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                    },
                ],

            }
        }
    }
</script>

<style scoped>

</style>