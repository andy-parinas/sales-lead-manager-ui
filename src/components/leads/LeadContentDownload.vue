<template>
    <v-btn text small fab @click="download" :loading="printing" >
      <v-icon >mdi-printer</v-icon>
    </v-btn>
</template>

<script>

import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {mapState} from 'vuex';
import DocDefinitionContentCreator from "../../helpers/DocDefinitionContentCreator";

export default {
  name: "LeadContentDownload",
  data(){
      return {
          printing: false
      }
  },
  computed: {
    ...mapState('leads', ['lead']),
  },
  methods: {
      download(){
        console.log(this.lead);

        this.loading = true;
        DocDefinitionContentCreator.createLeadPrintout(this.lead).then(content => {

          pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

          // pdfMake.createPdf(docDefinition).download('TestLead.pdf');
          pdfMake.createPdf(docDefinition).open();


        }).catch(error => {

            console.log(error)

        }).finally(() => {
            this.loading = false
        })


      }
  }
}
</script>

<style scoped>

</style>