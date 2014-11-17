declare var JSONP : IJSONP;

interface IJSONP {
    get (url : string, data?, callback? : (response) => void)
}