declare var qwest : Qwest;

interface Qwest {
    xhr2 : boolean;
    before(action : () => void) : Qwest
    limit(limit : number) : Qwest

    get (url : string, data, options?) : QwestMethod
    post (url : string, data, options?) : QwestMethod
    put (url : string, data, options?) : QwestMethod
    delete (url : string, data, options?) : QwestMethod
}

interface QwestMethod {
    then (callback : (response : any) => void) : QwestMethod
    catch (callback : (message : any) => void) : QwestMethod
    complete (callback : () => void) : QwestMethod
}