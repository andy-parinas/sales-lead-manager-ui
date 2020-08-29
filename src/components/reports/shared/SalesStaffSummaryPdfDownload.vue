<template>
    <v-btn small @click="download" color="primary" >
        Download Report
        <v-icon right small>mdi-download</v-icon>
    </v-btn>
</template>

<script>
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import DocDefinitionContentCreator from "@/helpers/DocDefinitionContentCreator";

export default {
    name: "SalesStaffSummaryPdfDownload",
    props: {
        header: {required: true},
        content: {required: true},
        title: {required: true},
        total: {required: true},
        fileName: {required:true}
    },
    data(){
        return {

        }
    },
    methods: {
        download(){
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            // pdfMake.createPdf(this.docDefinition).download()

            DocDefinitionContentCreator.createTable(this.header, this.content).then(response => {

                const body = response;

                const total = [
                    {text: 'Total', bold: true},
                    '--',
                    {text: this.decimalFormat(this.total.totalNumberOfSales), alignment: 'right', bold: true},
                    {text: this.decimalFormat(this.total.totalNumberOfLeads), alignment: 'right', bold: true},
                    {text: this.decimalFormat(this.total.grandTotalContracts), alignment: 'right', bold: true},
                    {text:'--', alignment: 'right', bold: true},
                    {text:'--', alignment: 'right', bold: true}
                ]
                body.push(total)

                const average = [
                    {text:'Average', bold: true},
                    '--',
                    {text: this.decimalFormat(this.total.averageNumberOfSales), alignment: 'right', bold: true},
                    {text: this.decimalFormat(this.total.averageNumberOfLeads), alignment: 'right', bold: true},
                    {text: this.decimalFormat(this.total.averageTotalContract), alignment: 'right', bold: true},
                    {text: `${this.decimalFormat(this.total.averageConversionRate)} %`, alignment: 'right', bold: true},
                    {text: this.decimalFormat(this.total.grandAveragePrice), alignment: 'right', bold: true}
                ]

                body.push(average)
                const  docDefinition = {
                    pageOrientation: 'landscape',
                    pageSize: 'A4',
                    content: [
                        { text: this.title, style: 'header' },
                        ' ',
                        {
                            layout: 'lightHorizontalLines', // optional
                            table: {
                                headerRows: 1,
                                widths: [ '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
                                body: body
                            }
                        }
                    ],
                    styles: {
                        header: {
                            fontSize: 18,
                            bold: true,
                            margin: [0, 0, 0, 10]
                        },
                    }
                }

                pdfMake.createPdf(docDefinition).download(this.fileName);


            }).catch(error => {
                console.log(error)
            })
        },
        generateTable(){

        },
        decimalFormat(value) {
            const amt = Number(value)
            return amt && amt.toLocaleString(undefined, {maximumFractionDigits:2}) || '0'
        }
    }
}
</script>

<style scoped>

</style>