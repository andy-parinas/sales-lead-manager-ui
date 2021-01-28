
const Utils = {

    camelToSnake(string) {
        return string.replace(/[\w]([A-Z])/g, function(m) {
            return m[0] + "_" + m[1];
        }).toLowerCase();
    },

    convertToAMPM(timeInput){
        const time = timeInput.split(':')
        let hour = parseInt(time[0])
        let minute = parseInt(time[1])

        let meridan = 'AM';

        if(hour >= 12 && hour <= 23) {
            meridan = 'PM'
            if(hour > 12){
                hour = hour - 12;
            }
        }else {
            if(hour === 0){
                hour = 12
            }
        }

        return `${hour}:${minute} ${meridan}`
    },

    formatDate(value){
        if(value){
            const dateArray = value.split(" ");
            const date = dateArray[0].split("-");

            if(date.length < 3) return '';

            return `${date[2]}/${date[1]}/${date[0]}`
        }else {
            return '';
        }
    },

    formatTime(value){

        if(!value) return '';

        const dateTimeArray = value.split(" ");

        if(dateTimeArray.length < 2) return '';

        return this.convertToAMPM(dateTimeArray[1]);
    },

    decimalFormat(value){
        const amt = Number(value)
        return amt && amt.toLocaleString(undefined, {maximumFractionDigits:2}) || '0'
    }
}

export default Utils;