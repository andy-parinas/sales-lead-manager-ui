import Utils from "./Utils";


function currency(value) {
    const amt = Number(value)
    return amt && amt.toLocaleString(undefined, {maximumFractionDigits:2}) || '0'
}

function formatContent(item, type) {

    switch (type) {
        case 'string':
            return item;

        case 'integer':
            return item;

        case 'currency':
            return currency(item)

        case 'percentage':
            return `${ Math.round(item)} %`

        case 'date':
            return `${ Utils.formatDate(item)}`

        default:
            return item;
    }
}


const DocDefinitionContentCreator = {

    createTable(header, content){

        return new Promise((resolve, reject) =>{

            if(!Array.isArray(header)) reject("Header must be an array");
            if(header.length === 0) reject("Header must contain elements");
            if(!Array.isArray(content)) reject("Content must be an array");

            const body = [];
            const headerColumns = header.map(head => {
                return head.title
            })

            body.push(headerColumns);

            content.map(item => {
                const row = []
                header.map(head => {

                    const column = {
                        text: formatContent(item[head.name], head.type),
                        alignment: head.type === 'string'? 'left' : 'right'
                    }
                    row.push(column)
                })

                body.push(row);
            })

            resolve(body);
        })
    },

    createTable2(header, content){

        return new Promise((resolve, reject) =>{

            if(!Array.isArray(header)) reject("Header must be an array");
            if(header.length === 0) reject("Header must contain elements");
            if(!Array.isArray(content)) reject("Content must be an array");

            const body = [];
            const headerColumns = header.map(head => {
                return {text: head.title, alignment: head.alignment}
            })

            body.push(headerColumns);

            content.map(item => {
                const row = []
                header.map(head => {

                    const column = {
                        text: formatContent(item[head.name], head.type),
                        alignment: head.alignment
                    }
                    row.push(column)
                })

                body.push(row);
            })

            resolve(body);
        })
    },

    createLeadPrintout(lead){

        return new Promise((resolve, reject) => {

            if (lead === null) reject("Lead cannot be null")
            if (!lead.details ) reject('Lead must have a Details')
            if (!lead.jobType ) reject('Lead must have a Job Type')
            if (!lead.appointment ) reject('Lead must have an Appointment')


            const content = [
                {text: 'Lead Number: ' + lead.details.leadNumber, style: 'header'},
                {text: 'Contact Details', style: 'subheader'},
                {
                    style: 'tableStyle',
                    table: {
                        body: [
                            ['Name', `${lead.details.firstName} ${lead.details.lastName}` ],
                            ['Contact Number', lead.details.contactNumber],
                            ['Email', lead.details.email],
                            ['Address', `${lead.details.street1} ${lead.details.street2}, 
                                ${lead.details.postcode.locality}, ${lead.details.postcode.state} ${lead.details.postcode.pcode}`]
                        ]
                    }
                },
                {text: 'Lead Details', style: 'subheader'},
                {
                    style: 'tableStyle',
                    table: {
                        body: [
                            ['Lead Number', lead.details.leadNumber ],
                            ['Franchise Number', lead.details.franchiseNumber],
                            ['Lead Date', Utils.formatDate(lead.details.leadDate)],
                            ['Lead Type', lead.details.customerType],
                            ['Lead Source', lead.details.leadSource],
                            ['Lead Received Via', lead.details.receivedVia],
                            ['Lead Status', lead.details.postcodeStatus]
                        ]
                    }
                },
                {text: 'Job Type Details', style: 'subheader'},
                {
                    style: 'tableStyle',
                    table: {
                        body: [
                            ['Taken By', lead.jobType.takenBy ],
                            ['Date Allocated', Utils.formatDate(lead.jobType.dateAllocated)],
                            ['Product', lead.jobType.product],
                            ['Description', lead.jobType.description],
                            ['Design Advisor', lead.jobType.designAssessor],
                            ['DA Contact Number', lead.jobType.designAssessorContactNumber],
                            ['DA Email', lead.jobType.designAssessorEmail]
                        ]
                    }
                },
                {text: 'Appointment Details', style: 'subheader'},
                {
                    style: 'tableStyle',
                    table: {
                        body: [
                            ['Appointment Date', `${Utils.formatDate(lead.appointment.appointmentDate)} ${Utils.convertToAMPM(lead.appointment.appointmentTime)}`],
                            ['Follow-Up Date', `${Utils.formatDate(lead.appointment.appointmentDate)} 
                                ${ lead.appointment.appointmentTime? Utils.convertToAMPM(lead.appointment.appointmentTime): '' }`],
                            ['Customer Touch Point', lead.appointment.customerTouchPoint],
                            ['Notes', lead.appointment.notes],
                            ['Quoted Price', Utils.decimalFormat(lead.appointment.quotedPrice)],
                            ['Outcome', lead.appointment.outcome],
                            ['Comments', lead.appointment.comments]
                        ]
                    }
                },
            ]

            resolve(content);
        })

    }


}

export default DocDefinitionContentCreator;