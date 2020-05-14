
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
    }
}

export default Utils;