<template>
    <v-btn text small fab @click="download" >
      <v-icon >mdi-printer</v-icon>
    </v-btn>
</template>

<script>

import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


export default {
  name: "LeadContentDownload",
  methods: {
      download(){
          pdfMake.vfs = pdfFonts.pdfMake.vfs;


        const  docDefinition = {
          pageOrientation: 'portrait',
          pageSize: 'A4',
          content: [
              {text: 'Lead Number: 123456', style: 'header'},
              {text: 'Contact Details', style: 'subheader'},
              {
                style: 'tableStyle',
                table: {
                  body: [
                    ['Name', 'Andy Parinas' ],
                    ['Contact Number', '0481791820'],
                    ['Email', 'atparinas@gmail.com'],
                    ['Address', '26/51 Cottesloe Drive, Robina, QLD, 4226']
                  ]
                }
              },
              {text: 'Lead Details', style: 'subheader'},
              {
                style: 'tableStyle',
                table: {
                  body: [
                    ['Lead Number', '123456' ],
                    ['Franchise Number', '2107'],
                    ['Lead Date', '21/12/2020'],
                    ['Lead Type', 'Residential'],
                    ['Lead Source', 'Pamphlets'],
                    ['Lead Received Via', 'Phone'],
                    ['Lead Status', 'Outside Of Franchise']
                  ]
                }
              },
              {text: 'Job Type Details', style: 'subheader'},
              {
                style: 'tableStyle',
                table: {
                  body: [
                    ['Taken By', '123456' ],
                    ['Date Allocated', '2107'],
                    ['Product', '21/12/2020'],
                    ['Description', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae debitis eum illum libero nemo neque nobis, '],
                    ['Design Advisor', 'Andy Parinas'],
                    ['DA Contact Number', '0481791820'],
                    ['DA Email', 'Outside Of Franchise']
                  ]
                }
              },
              {text: 'Appointment Details', style: 'subheader'},
              {
                style: 'tableStyle',
                table: {
                  body: [
                    ['Appointment Date', '21/12/2020 12:15 PM' ],
                    ['Follow-Up Date', '2107'],
                    ['Product', '25/01/2021 12:0 AM'],
                    ['Customer Touch Point', 'Unknown'],
                    ['Notes', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae debitis eum illum libero nemo neque nobis,'],
                    ['Quoted Price', '1000'],
                    ['Outcome', 'Pending'],
                    ['Comments', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae debitis eum illum libero nemo neque nobis,']
                  ]
                }
              },

          ],
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

        // pdfMake.createPdf(docDefinition).download('TestLead.pdf');
        pdfMake.createPdf(docDefinition).open();

      }
  }
}
</script>

<style scoped>

</style>