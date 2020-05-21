

const ErrorHandler = {

    handlerError(errorCode, callback){

        switch (errorCode) {

            case 422:
                callback('Error in processing your form. Please check and try again')
                break;

            case 401:
                callback('You are not authorized. Please logout and login again. Please check your credentials with your administrators')
                break;

            case 403:
                callback('You are not allowed to performed this functions. Please check with your administrator')
                break;

            case 500:
                callback("Something went wrong. Please try again")
                break;

            default:
                callback("Something went wrong. Please try again")
                break;
        }
    }

}

export default ErrorHandler;