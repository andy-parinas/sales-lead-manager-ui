<template>
    <div>
        <v-list two-line>

                <v-divider></v-divider>
                <template v-for="(item, index) in franchises">
                    <FranchiseListItem  :key="index"
                                        :item="item"
                                        :add="add"
                                        :remove="remove"
                                        @add="$emit('onAddClicked', item)"
                                        @remove="$emit('onRemovedClicked', item)"/>
                    <v-divider :key="index  + 100"></v-divider>
                </template>

            <v-pagination class="mt-2"
                          :length="4"
            ></v-pagination>
        </v-list>

    </div>
</template>

<script>
    import FranchiseListItem from "./FranchiseListItem";
    export default {
        name: "FranchiseList",
        props: {
            add: {type: Boolean},
            remove: {type: Boolean}
        },
        components: {FranchiseListItem},
        data(){
            return {
                franchises: [
                    {
                        franchiseNumber: 100,
                        name: 'Franchise 100',
                        description: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                    },
                    {
                        franchiseNumber: 200,
                        name: 'Franchise 200',
                        description: "Wish I could come, but I'm out of town this weekend.",
                    },
                    {
                        franchiseNumber: 300,
                        name: 'Franchise 300',
                        description: 'Do you have Paris recommendations? Have you ever been?',
                    },
                    {
                        franchiseNumber: 400,
                        name: 'Franchise 400',
                        description: 'Have any ideas about what we should get Heidi for her birthday?',
                    },
                    {
                        franchiseNumber: 500,
                        name: 'Franchise 500',
                        description: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                    },
                ],
            }
        }
    }
</script>

<style scoped>

</style>