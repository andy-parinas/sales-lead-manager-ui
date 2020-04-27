<template>
    <div>
        <h1 class="subheading grey--text">{{ title }}</h1>
        <v-divider></v-divider>
        <v-progress-linear indeterminate color="green" v-if="loading"></v-progress-linear>
    </div>
</template>

<script>

    export default {
        name: "PageHeader",
        props: {
          title: {required: true, type: String}
        },
        computed: {
            loading(){
                return this.$store.state.appLoading;
            }
        }
    }
</script>

<style scoped>

</style>