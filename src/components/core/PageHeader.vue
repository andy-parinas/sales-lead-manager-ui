<template>
    <div>
        <h1 class="subheading grey--text">{{ title }}</h1>
        <v-divider></v-divider>
        <div class="progress-bar-wrapper">
            <v-progress-linear indeterminate color="green" v-if="appLoading"></v-progress-linear>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "PageHeader",
        props: {
          title: {required: true, type: String}
        },
        computed: {
            ...mapState(['appLoading', 'appError', 'appMessage']),
        }
    }
</script>

<style scoped>
    .progress-bar-wrapper{
        height: 10px;
    }
</style>