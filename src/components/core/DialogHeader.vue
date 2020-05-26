<template>
    <v-toolbar color="blue-grey darken-1" dark >
        <v-toolbar-title><span>{{ title }}</span> </v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="action"></slot>
    </v-toolbar>
</template>

<script>
    export default {
        name: "DialogHeader",
        props: ['title']
    }
</script>

<style scoped>

</style>