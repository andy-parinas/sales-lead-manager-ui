<template>
    <div>
            <v-list two-line color="grey lighten-5">
                <template v-for="(item, index) in franchises">
                    <FranchiseListItem  :key="index"
                                        :item="item"
                                        :with-select="withSelect"
                                        @edit="$emit('onEditClicked', item)"
                                        @remove="$emit('onRemoveClicked', item)"
                                        @postcode="$emit('onPostcodeClicked', item)"
                                        @select="$emit('onSelectedClicked', item)"/>
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
            franchises: {required: true, type: Array},
            withSelect: {type: Boolean},
        },
        components: {FranchiseListItem},
        data(){
           return {
                group: -1
           }
        },
        methods: {
            resetGroup(){
                this.group = -1;
            }
        }
    }
</script>

<style scoped>

</style>