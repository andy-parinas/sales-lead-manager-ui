<template>
    <v-btn text small fab @click="download" :loading="printing" >
      <v-icon >mdi-printer</v-icon>
    </v-btn>
</template>

<script>
import FinanceAPI from "../../api/FinanceAPI";
import Utils from "../../helpers/Utils";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import DocDefinitionContentCreator from "../../helpers/DocDefinitionContentCreator";

export default {
  name: "FinanceDownload",
  props: ['finance', 'leadNumber'],
  data(){
      return {
          printing: false
      }
  },
  methods: {
      async download(){
          try {
              this.printing = true;

              const paymentsMade = await FinanceAPI.getPaymentsMade(this.finance.id)
              const paymentsSchedule = await FinanceAPI.getPaymentsSchedule(this.finance.id)


              const paymentsMadeHeader = [
                { title: 'Payment Date',name: 'paymentDate', type: 'string', alignment: 'left'},
                { title: 'Description', name: 'description', type: 'string', alignment: 'left' },
                { title: 'Amount', name: 'amount', type: 'currency', alignment: 'right' },
              ]

              const paymentsScheduleHeader = [
                { title: 'Due Date',name: 'dueDate', type: 'date', alignment: 'left'},
                { title: 'Description', name: 'description', type: 'string', alignment: 'left' },
                { title: 'Amount', name: 'amount', type: 'currency', alignment: 'right' },
                { title: 'Payment', name: 'payment', type: 'currency', alignment: 'right' },
                { title: 'Balance', name: 'balance', type: 'currency', alignment: 'right' },
                { title: 'Status', name: 'status', type: 'string', alignment: 'right' },
              ]

              const paymentsMadeBody = await DocDefinitionContentCreator.createTable2(paymentsMadeHeader, paymentsMade)
              const paymentsScheduleBody = await DocDefinitionContentCreator.createTable2(paymentsScheduleHeader, paymentsSchedule.data)


              const content = [
                {text: 'Finance For Lead Number: ' + this.leadNumber, style: 'header'},
                {text: 'Finance Details', style: 'subheader'},
                {
                  style: 'tableStyle',
                  table: {
                    widths: ['*', 130],
                    body: [
                      ['Project Price', {text: Utils.convertToCurrency(this.finance.projectPrice), alignment: 'right'}],
                      ['GST', {text: Utils.convertToCurrency(this.finance.gst), alignment: 'right'} ],
                      ['Contract Price', {text: Utils.convertToCurrency(this.finance.contractPrice), alignment: 'right'}],
                    ]
                  }
                },
                {
                  style: 'tableStyle',
                  table: {
                    widths: ['*', 130],
                    body: [
                      ['Total Contract Including Variations', {text: Utils.convertToCurrency(this.finance.totalContract), alignment: 'right'}],
                      ['Deposit', {text: Utils.convertToCurrency(this.finance.deposit), alignment: 'right'} ],
                      ['Total Payments Made', {text: Utils.convertToCurrency(this.finance.totalPaymentMade), alignment: 'right'}],
                      ['Balance', {text: Utils.convertToCurrency(this.finance.balance), alignment: 'right'}],
                    ]
                  }
                },
                {text: 'Payments Made', style: 'subheader'},
                {
                  style: 'tableStyle',
                  table: {
                    widths: ['*', '*', '*'],
                    body: paymentsMadeBody
                  }
                },
                {text: 'Payment Schedule', style: 'subheader'},
                {
                  style: 'tableStyle',
                  table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: paymentsScheduleBody
                  }
                },

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

            pdfMake.vfs = pdfFonts.pdfMake.vfs;

            pdfMake.createPdf(docDefinition).open();

          }catch (e) {
              console.log(e)
          }finally {
              this.printing = false
          }
      }
  }
}
</script>

<style scoped>

</style>