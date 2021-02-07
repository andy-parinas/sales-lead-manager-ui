<template>
    <v-btn text small fab @click="download" :loading="printing" >
      <v-icon >mdi-printer</v-icon>
    </v-btn>
</template>

<script>
import Utils from "../../helpers/Utils";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export default {
  name: "BuildingAuthorityDownload",
  props: ['buildingAuthority', 'leadNumber'],
  data(){
      return {
          printing: false
      }
  },
  methods: {
      download(){

          const content = [
              {text: 'Building Authority For Lead Number: ' + this.leadNumber, style: 'header'},
              {text: 'Building Authority and Plan Details', style: 'subheader'},
              {
                style: 'tableContinuous',
                table: {
                  widths: ['*', 130],
                  body: [
                    ['Building Authority Name', {text: this.buildingAuthority.buildingAuthorityName, alignment: 'right'}],
                    ['Approval Required', {text: this.buildingAuthority.approvalRequired, alignment: 'right'}],
                    ['Date Plans Sent To Draftsman', {text: Utils.formatDate(this.buildingAuthority.datePlansSentToDraftsman), alignment: 'right'} ],
                    ['Date Plans Completed', {text: Utils.formatDate(this.buildingAuthority.datePlansCompleted), alignment: 'right'}],
                    ['Date Plans Sent To Authority', {text: Utils.formatDate(this.buildingAuthority.datePlansSentToAuthority), alignment: 'right'}],
                  ]
                }
              },
              {
                style: 'tableAddition',
                table: {
                  widths: [200, '*'],
                  body: [
                    ['Building Authority Comments', this.buildingAuthority.buildingAuthorityComments],
                  ]
                }
              },
              {text: 'Building Authority Approval Details and Permit Number', style: 'subheader'},
              {
                style: 'tableStyle',
                table: {
                  widths: ['*', 130],
                  body: [
                    ['Anticipated Approval Date', {text: Utils.formatDate(this.buildingAuthority.dateAnticipatedApproval), alignment: 'right'}],
                    ['Date Received From Authority', {text: Utils.formatDate(this.buildingAuthority.dateReceivedFromAuthority), alignment: 'right'} ],
                    ['Authority/DA Permit Number', {text: this.buildingAuthority.permitNumber, alignment: 'right'}],
                    ['Security Deposit Required', {text: this.buildingAuthority.securityDepositRequired, alignment: 'right'}],
                  ]
                }
              },
              {text: 'Payments Made', style: 'subheader'},
              {
                style: 'tableStyle',
                table: {
                  widths: ['*', 130],
                  body: [
                    ['Building Insurance Name', {text: Utils.convertToCurrency(this.buildingAuthority.buildingInsuranceName), alignment: 'right'}],
                    ['Date Building Insurance Request Sent', {text: Utils.formatDate(this.buildingAuthority.dateInsuranceRequestSent), alignment: 'right'} ],
                    ['Building Insurance Number', {text: this.buildingAuthority.buildingInsuranceNumber, alignment: 'right'}],
                  ]
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
                margin: [0, 20, 0, 1]
              },
              tableStyle: {
                margin: [0, 5, 0, 15]
              },
              tableAddition: {
                margin: [0, 0, 0, 15]
              },
              tableContinuous: {
                margin: [0, 5, 0, 10]
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
      }
  }
}
</script>

<style scoped>

</style>