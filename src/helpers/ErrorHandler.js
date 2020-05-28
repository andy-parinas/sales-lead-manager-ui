

const ErrorHandler = {

    handlerError(errorCode, callback, errorResponse){

        switch (errorCode) {

            case 422:
                if(errorResponse && errorResponse.data && Object.keys(errorResponse.data).length !== 0){
                    let message = ''
                    for(let props in errorResponse.data){
                        message = message + errorResponse.data[props][0] + ' '
                    }
                    callback(message)
                }else {
                    callback('Error in processing your form. Please check and try again')
                }
                break;
            case 400:
                if(errorResponse && errorResponse.data && typeof errorResponse.data === "string" ){
                    callback(errorResponse.data)
                }else {
                    callback("Something went wrong. Please check your data and try again")
                }
                break;
            case 401:
                callback('Authorization Expired. Please logout and login again.')
                break;

            case 403:
                callback('You are not allowed to performed this functions. Please check with your administrator')
                break;

            case 500:
                callback("Something went wrong. Please try again")
                break;

            case 409:
                callback("Problem processing your data. Please check and try again")
                break;
            default:
                callback("Something went wrong. Please try again")
                break;
        }
    }

}

export default ErrorHandler;