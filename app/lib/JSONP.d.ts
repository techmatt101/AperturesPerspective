declare var JSONP : IJSONP;

interface IJSONP {
    (options : IJSONPOptions)
}

interface IJSONPOptions {
    url : string;
    data? : any;
    success? : (response) => void;
    error? : (response) => void;
    complete? : (response) => void;
    beforeSend? : (response) => void;
    callbackName? : string;
}