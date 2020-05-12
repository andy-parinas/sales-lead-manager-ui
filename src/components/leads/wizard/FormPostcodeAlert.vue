<template>
    <v-alert
            outlined text
            color="deep-orange"
            dense
            class="body-2">
        <p>
            The <strong>Sales Contact postcode  </strong> is  <u>OUTSIDE</u> the selected
            <strong>Franchise assigned postcodes: </strong>
        </p>
        <p>
            Please ensure that you have selected the correct Franchise or correct Sales Contact

            If your Franchise and Sales Contact postcode is correct you must inform Spanline Australia
            in writing and the Franchise Owner of the relevant territory for this postcode or part thereof
            of the details of this customer and project.

            If you do not have permission from the Franchise Owner of the relevant territory for this postcode
            to undertake this Spanline Product project then you cannot proceed with this job.

            If you proceed with this project without having agreement in writing from the Franchise Owner of the
            relevant Territory for this postcode, you may be in breach of your Franhise Agreement.
        </p>
        <p>
            Disclaimer: Spanline Australia is not responsible for the accuracy of any information entered in this
            system by any Franchise
        </p>
    </v-alert>
</template>

<script>
    export default {
        name: "FormPostcodeAlert",
    }
</script>

<style scoped>

</style>