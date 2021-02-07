<template>
	<v-btn text small fab @click="download" :loading="printing" >
		<v-icon >mdi-printer</v-icon>
	</v-btn>
</template>

<script>
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Utils from "../../helpers/Utils";

export default {
	name: "VerificationDownload",
	props: ['verification', 'leadNumber'],
	data(){
		return {
			printing: false
		}
	},
	methods: {
		download(){

			const content = [
				{text: 'Verification For Lead Number: ' + this.leadNumber, style: 'header'},
				{text: 'Design Details', style: 'subheader'},
				{
					style: 'tableContinuous',
					table: {
						widths: [200, '*'],
						body: [
							['Design Correct', {text: this.verification.designCorrect, alignment: 'right'}],
							['Design Check Date', {text: Utils.formatDate(this.verification.dateDesignCheck), alignment: 'right'}],
							['Costing Correct', {text: this.verification.costingCorrect, alignment: 'right'}],
							['Costing Check Date', {text: Utils.formatDate(this.verification.dateCostingCheck), alignment: 'right'} ],
						]
					}
				},
				{text: 'Build Details', style: 'subheader'},
				{
					style: 'tableStyle',
					table: {
						widths: [200, '*'],
						body: [
							['Estimated Build Day', {text: this.verification.estimatedBuildDays, alignment: 'right'}],
							['Trades Required', {text: this.verification.tradesRequired, alignment: 'right'}],
							['Building Supervisor', {text: this.verification.buildingSupervisor, alignment: 'right'}],
							['Current Roof Sheet Product', {text: this.verification.roofSheet, alignment: 'right'}],
							['Current Roof Sheet Colour', {text: this.verification.roofColour, alignment: 'right'}],
							['Lineal Metres', {text: this.verification.linealMetres, alignment: 'right'}],
							['Franchise Authority', {text: this.verification.franchiseAuthority, alignment: 'right'}],
							['Authority Date', {text: Utils.formatDate(this.verification.authorityDate), alignment: 'right'}],
							['Date SpanPak and Blue Clean Sent', {text: Utils.formatDate(this.verification.dateMaintenanceLetterSent), alignment: 'right'} ],
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