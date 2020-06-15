<template>
    <v-toolbar dense color="blue-grey darken-1" dark flat >
        <v-toolbar-title><span class="subtitle-1">{{ title }}</span> </v-toolbar-title>
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