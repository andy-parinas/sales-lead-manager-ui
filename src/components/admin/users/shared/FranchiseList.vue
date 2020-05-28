<template>
    <div>
        <v-list two-line>
                <div style="height: 10px">
                    <v-progress-linear indeterminate color="primary" v-if="loading"></v-progress-linear>
                </div>
                <v-divider></v-divider>
                <template v-for="(item, index) in items">
                    <FranchiseListItem  :key="index"
                                        :item="item"
                                        :add="add"
                                        :remove="remove"
                                        @add="$emit('onAddClicked', item)"
                                        @remove="$emit('onRemoveClicked', item)"/>
                    <v-divider :key="index  + 100"></v-divider>
                </template>

                <slot name="pagination"></slot>
        </v-list>

    </div>
</template>

<script>
    import FranchiseListItem from "./FranchiseListItem";
    export default {
        name: "FranchiseList",
        props: {
            add: {type: Boolean},
            remove: {type: Boolean},
            loading: {type: Boolean},
            items: {required: true, type: Array}
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