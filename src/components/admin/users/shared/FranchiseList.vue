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
                franchises: [],
            }
        }
    }
</script>

<style scoped>

</style>