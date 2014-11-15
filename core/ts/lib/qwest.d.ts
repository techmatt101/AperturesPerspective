declare var qwest : Qwest;

interface Qwest {
    xhr2 : boolean;
    before(action : () => void) : Qwest
    limit(limit : number) : Qwest

    get (url : string, data : string, options? : typeof Object) : QwestMethod
    post (url : string, data : typeof Object, options? : typeof Object) : QwestMethod
    put (url : string, data : typeof Object, options? : typeof Object) : QwestMethod
    delete (url : string, data : string, options? : typeof Object) : QwestMethod
}

interface QwestMethod {
    then (callback : (response : any) => void) : QwestMethod
    catch (callback : (message : any) => void) : QwestMethod
    complete (callback : () => void) : QwestMethod
}