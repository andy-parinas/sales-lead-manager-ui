<template>
  <v-btn text small fab @click="download" :loading="printing" >
    <v-icon >mdi-printer</v-icon>
  </v-btn>
</template>

<script>
import ContractAPI from "../../api/ContractAPI";
import DocDefinitionContentCreator from "../../helpers/DocDefinitionContentCreator";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Utils from "../../helpers/Utils";

export default {
  name: "ContractDownload",
  props: ['contract', 'leadNumber'],
  data(){

      return {
          printing: false
      }

  },

  methods: {
      async download(){

        try {
          this.printing = true
          const variations = await ContractAPI.getContractVariations(this.contract.id);

          const header = [
              { title: 'Variation Date', name: 'variationDate', type: 'date', alignment: 'left'},
              { title: 'Description', name: 'description', type: 'string', alignment: 'left' },
              { title: 'Amount', name: 'amount' , type: 'currency', alignment: 'right'}
          ]
          const body = await DocDefinitionContentCreator.createTable2(header, variations.data )

          pdfMake.vfs = pdfFonts.pdfMake.vfs;

          const content = [
            {text: 'Contract For Lead Number: ' + this.leadNumber, style: 'header'},
            {text: 'Contract Details', style: 'subheader'},
            {
              style: 'tableStyle',
              table: {
                widths: ['*', 130],
                body: [
                  ['Contract Number', {text:this.contract.contractNumber, alignment: 'right'}],
                  ['Contract Date', {text: Utils.formatDate(this.contract.contractDate), alignment: 'right'} ],
                  ['Contract Price', {text: Utils.convertToCurrency(this.contract.contractPrice), alignment: 'right'}],
                  ['Deposit Amount', {text: Utils.convertToCurrency(this.contract.depositAmount), alignment: 'right'}],
                  ['Total Variation', {text:Utils.convertToCurrency(this.contract.totalVariation), alignment: 'right'}],
                  ['Total Contract', {text: Utils.convertToCurrency(this.contract.totalContract), alignment: 'right'}],
                ]
              }
            },
            {text: 'Additional Information', style: 'subheader'},
            {
              style: 'tableStyle',
              table: {
                widths: ['*', 130],
                body: [
                  ['Date Deposit Received', {text: Utils.formatDate(this.contract.dateDepositReceived), alignment: 'right'}],
                  ['Warranty Required', {text: this.contract.warrantyRequired, alignment: 'right'} ],
                  ['Date Warranty Sent', {text: Utils.formatDate(this.contract.dateWarrantySent), alignment: 'right'}],
                  ['Roof Sheet Profile', {text: this.contract.roofSheetProfile, alignment: 'right'}],
                ]
              }
            },
            {text: 'Contract Variations', style: 'subheader'},
            {
              style: 'tableStyle',
              table: {
                widths: ['*', '*', '*'],
                body: body
              }
            }
          ]

          const  docDefinition = {
            pageOrientation: 'portrait',
            pageSize: 'A4',
            content: content,
            styles: {
              header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
              },
              subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 10, 0, 5]
              },
              tableStyle: {
                margin: [0, 5, 0, 15]
              },
              tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
              }
            }
          }

          pdfMake.createPdf(docDefinition).open();

        }catch (e) {
          console.log(e)

        }finally {

          this.printing = false;

        }






      }
  }
}
</script>

<style scoped>

</style>