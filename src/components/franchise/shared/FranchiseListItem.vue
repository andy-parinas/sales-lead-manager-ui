<template>
    <v-list-item>
        <template v-slot:default="{}">
           <v-card class="d-flex my-3 px-4" tile width="100%" flat outlined>
               <v-list-item-content>
                   <v-list-item-title v-text="item.franchiseNumber"></v-list-item-title>
                   <v-list-item-subtitle class="text--primary" v-text="item.name"></v-list-item-subtitle>
                   <v-list-item-subtitle>
                       <span>{{ item.type }} </span>
                       <span v-if="item.parent"> of {{ item.parent }} </span>
                   </v-list-item-subtitle>
               </v-list-item-content>

               <v-list-item-action>
                   <v-btn  @click="$emit('remove', item)"
                           x-small fab text color="error" dark>
                       <v-icon small>remove</v-icon>
                   </v-btn>
               </v-list-item-action>
           </v-card>
        </template>
    </v-list-item>
</template>

<script>
    export default {
        name: "FranchiseListItem",
        props: {
            item: {required: true, type:Object},
        }
    }
</script>

<style scoped>

</style>