<template>
    <v-card>
        <DialogHeader title="Delete Sales Contact">
            <template v-slot:action>
                <v-btn small icon @click="$emit('close')">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text>
            <div class="mt-3 subtitle-1"> The Delete process is unrecoverable. Are you sure you want to remove these postcodes?</div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" class="mr-3 mb-2 white--text"
                   @click="removePostcodes"
                   :loading="deleting">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import PostcodeAPI from "../../../api/PostcodeAPI";
    export default {
        name: "PostcodeDeleteDialog",
        components: {DialogHeader},
        props: ['franchise', 'postcodes'],
        data(){
            return {
                deleting: false
            }
        },
        methods: {
            removePostcodes(){
                if(this.franchise && this.postcodes && this.postcodes.length > 0){
                    this.deleting = true;
                    const postcodes = this.postcodes.map(postcode => {
                        return postcode.id
                    })
                    PostcodeAPI.removePostcodes(this.franchise.id, postcodes).then(() => {
                        console.log('deleted');
                        this.$emit('close');
                        this.$emit('success');
                    }).catch(error => {
                        console.log(error)
                    }).finally(() => {
                        this.deleting = false;
                    })

                }
            }
        }
    }
</script>

<style scoped>

</style>