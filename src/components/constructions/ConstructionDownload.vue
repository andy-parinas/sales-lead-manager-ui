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
	name: "ConstructionDownload",
	props: ['construction', 'leadNumber'],
	data() {
		return {
			printing: false
		}
	},
	methods: {
		download(){
			const content = [
				{text: 'Construction For Lead Number: ' + this.leadNumber, style: 'header'},
				{text: 'Site Address', style: 'subheader'},
				{
					text: `${this.construction.siteAddress}
							${this.construction.postcode.suburb}, ${this.construction.postcode.state}, ${this.construction.postcode.postcode}` ,
					style: 'subheader2'
				},
				{text: 'Manufacturing and Assembly Details', style: 'subheader'},
				{
					style: 'tableContinuous',
					table: {
						widths: [200, '*'],
						body: [
							['Material List', {text: this.construction.materialList, alignment: 'right'}],
							['Date Materials Received', {text: Utils.formatDate(this.construction.dateMaterialsReceived), alignment: 'right'}],
							['Date Assembly Completed', {text: Utils.formatDate(this.construction.dateAssemblyCompleted), alignment: 'right'} ],
						]
					}
				},
				{text: 'Manufacturing and Delivery Details', style: 'subheader'},
				{
					style: 'tableStyle',
					table: {
						widths: [200, '*'],
						body: [
							['Anticipated Delivery Date', {text: Utils.formatDate(this.construction.dateAnticipatedDelivery), alignment: 'right'}],
							['Finished Product Delivery Date', {text: Utils.formatDate(this.construction.dateFinishedProductDelivery), alignment: 'right'} ],
							['Coil Number', {text: this.construction.coilNumber, alignment: 'right'}],
						]
					}
				},
				{text: 'Building Details', style: 'subheader'},
				{
					style: 'tableStyle',
					table: {
						widths: [200, '*'],
						body: [
							['Builders Name', {text: this.construction.tradeStaff.name, alignment: 'right'}],
							['Anticipated Construction Start', {text: Utils.formatDate(this.construction.anticipatedConstructionStart), alignment: 'right'} ],
							['Anticipated Completion Date', {text: Utils.formatDate(this.construction.anticipatedConstructionComplete), alignment: 'right'}],
							['Actual Construction Start', {text: Utils.formatDate(this.construction.actualConstructionStart), alignment: 'right'}],
							['Actual Completion Date', {text: Utils.formatDate(this.construction.actualConstructionComplete), alignment: 'right'}],
							['Comments', {text: this.construction.comments, alignment: 'right'}],
							['Final Inspection Date', {text: Utils.formatDate(this.construction.finalInspectionDate), alignment: 'right'}],
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