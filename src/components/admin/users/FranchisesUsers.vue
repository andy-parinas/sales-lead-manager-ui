<template>
    <v-card outlined>
        <div class="mx-3 mt-5">
            <h3 class="mb-3">Available Franchises</h3>
            <v-text-field
                    placeholder="Search"
                    prepend-inner-icon="search"
                    filled
                    rounded
                    dense
            ></v-text-field>
        </div>
        <FranchiseList remove />
    </v-card>
</template>

<script>
    import FranchiseList from "./shared/FranchiseList";
    export default {
        name: "FranchisesUsers",
        components: {FranchiseList}
    }
</script>

<style scoped>

</style>