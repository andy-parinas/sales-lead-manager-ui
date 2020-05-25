import Vue from 'vue';
import Utils from "./Utils";

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('formatDate', function (value) {
    const dateArray = value.split(" ");
    const date = dateArray[0].split("-");

    if(date.length < 3) return '';

    return `${date[2]}/${date[1]}/${date[0]}`
})

Vue.filter('formatTime', function (value) {

    const dateTimeArray = value.split(" ");

    if(dateTimeArray.length < 2) return '';

    return Utils.convertToAMPM(dateTimeArray[1]);

})

Vue.filter('dateOnly', function (value) {
    const dateTimeArray = value.split(" ");

    if(dateTimeArray.length < 2) return '';

    return dateTimeArray[0];
})

Vue.filter('snakeCaseToRegular', function (value) {
    const valueArray = value.split("_");

    let finalWords = '';

    for (let i = 0; i < valueArray.length; i++){
        const word = valueArray[i];

        finalWords = finalWords + word.charAt(0).toUpperCase() + word.slice(1) + ' ';
    }


    return finalWords;


})