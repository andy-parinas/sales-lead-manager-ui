<template>
    <v-btn small @click="download" color="primary" >
        Download Report
        <v-icon right small>mdi-download</v-icon>
    </v-btn>
</template>

<script>

    import pdfMake from 'pdfmake';
    import pdfFonts from "pdfmake/build/vfs_fonts";

    export default {
        name: "ReportToPdfDownload",
        data(){
            return {
                docDefinition: {
                    pageOrientation: 'landscape',
                    pageSize: 'A4',
                    content: [
                        {
                            layout: 'lightHorizontalLines', // optional
                            table: {
                                // headers are automatically repeated if the table spans over multiple pages
                                // you can declare how many rows should be treated as headers
                                headerRows: 1,
                                widths: [ '*', 'auto', 100, '*' ],

                                body: [
                                    [ 'First', 'Second', 'Third', 'The last one' ],
                                    [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                                    [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
                                ]
                            }
                        }
                    ],
                }
            }
        },
        methods: {
            download(){
                pdfMake.vfs = pdfFonts.pdfMake.vfs;
                pdfMake.createPdf(this.docDefinition).download();
            }
        }
    }
</script>

<style scoped>

</style>