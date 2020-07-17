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
                    <div class="d-flex">
                        <v-btn  @click="$emit('edit', item)"
                                x-small fab text color="primary" dark>
                            <v-icon small>edit</v-icon>
                        </v-btn>
                        <v-btn  @click="$emit('remove', item)"
                                x-small fab text color="error" dark>
                            <v-icon small>delete</v-icon>
                        </v-btn>
                        <v-btn
                                @click="$emit('postcode', item)"
                                x-small fab text color="orange darken-2" dark>
                            <v-icon small>markunread_mailbox</v-icon>
                        </v-btn>
                        <v-btn  v-if="withSelect"
                                @click="$emit('select', item)"
                                x-small fab text color="grey darken-1" dark>
                            <v-icon small>arrow_forward_ios</v-icon>
                        </v-btn>

                    </div>
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
            withSelect: {type: Boolean}
        },
        methods: {
            itemClicked(item){
                if(this.withSelect){
                    this.$emit('select', item)
                }
            }
        }
    }
</script>

<style scoped>

</style>