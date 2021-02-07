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
	name: "CustomerReviewDownload",
	props: ['customerReview', 'franchiseNumber'],
	data(){
		return {
			printing: false
		}
	},
	methods: {

		download(){

			const content = [
				{text: 'Customer Review For Lead Number: ' + this.leadNumber, style: 'header'},

				{
					style: 'tableContinuous',
					table: {
						widths: [200, '*'],
						body: [
							['Date Project Completed', {text: Utils.formatDate(this.customerReview.dateProjectCompleted), alignment: 'right'}],
							['Date Warranty Received', {text: Utils.formatDate(this.customerReview.dateWarrantyReceived), alignment: 'right'} ],
							['Date Maintenance Letter Sent', {text: Utils.formatDate(this.customerReview.dateMaintenanceLetterSent), alignment: 'right'} ],
							['Type Of Home Addition', {text: this.customerReview.homeAdditionType, alignment: 'right'}],
							['Home Addition Description', {text: this.customerReview.homeAdditionDescription, alignment: 'right'}],
						]
					}
				},
				{
					style: 'tableStyle',
					table: {
						widths: ['*', 100],
						body: [
							['How Would You Rate The Service You Received', {text: this.customerReview.serviceReceivedRating, alignment: 'right'}],
							['How Would You Rate The Workmanship Of Your Spanline Home Addition', {text: this.customerReview.workmanshipRating, alignment: 'right'}],
							['How Would You Rate Your Satisfaction With The Finished Product', {text: this.customerReview.finishedProductRating, alignment: 'right'}],
							['How Would You Rate The Quality,Service And Advise Of Your Design Consultant', {text: this.customerReview.designConsultantRating, alignment: 'right'}],
							['Customer Comments', {text: this.customerReview.comments, alignment: 'right'}],
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