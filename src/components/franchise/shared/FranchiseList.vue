<template>
    <div>
            <v-list two-line color="grey lighten-5">
                <template v-for="(item, index) in franchises">
                    <FranchiseListItem  :key="index"
                                        :item="item"
                                        @remove="$emit('onRemoveClicked', item)"/>
<!--                    <v-divider-->
<!--                            v-if="index + 1 < franchises.length"-->
<!--                            :key="index  + 100"></v-divider>-->
                </template>
            </v-list>
    </div>
</template>

<script>
    import FranchiseListItem from "./FranchiseListItem";

    export default {
        name: "FranchiseTable",
        props: {
            franchises: {required: true, type: Array}
        },
        components: {FranchiseListItem},
        data(){
           return {

           }
        }
    }
</script>

<style scoped>

</style>