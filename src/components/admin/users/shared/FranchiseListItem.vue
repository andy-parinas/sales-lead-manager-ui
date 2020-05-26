<template>
    <v-list-item>
        <template v-slot:default="{}">
            <v-list-item-content>
                <v-list-item-title v-text="item.franchiseNumber"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" v-text="item.name"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.type"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-btn  v-if="add" @click="$emit('add', item)"
                        x-small fab color="primary" dark>
                    <v-icon>add</v-icon>
                </v-btn>
                <v-btn  v-if="remove" @click="$emit('remove', item)"
                        x-small fab color="error" dark>
                    <v-icon small>remove</v-icon>
                </v-btn>
            </v-list-item-action>
        </template>
    </v-list-item>
</template>

<script>
    export default {
        name: "FranchiseListItem",
        props: {
            item: {required: true, type:Object},
            add: { type: Boolean},
            remove: {type: Boolean}
        }
    }
</script>

<style scoped>

</style>