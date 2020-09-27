<template>
    <v-card class="mx-auto" :color="color" dark >
        <v-card-title>
            <v-icon large left> today </v-icon>
            <span class="title font-weight-light">{{ title }}</span>
        </v-card-title>
        <v-card-text >
            <v-row align="center" class="mx-0">
                <div class="display-2 font-weight-bold white--text">{{ value }}</div>
                <div class="ml-2">{{ unit }}</div>
            </v-row>
            <v-row class="mx-0" justify="end">
                <v-btn text x-small><v-icon small>refresh</v-icon></v-btn>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "InfoCardItem",
    props: ['color', 'title', 'value', 'unit']
}
</script>

<style scoped>

</style>