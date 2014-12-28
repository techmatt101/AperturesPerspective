// Version 1.0.0 - Matthew Kemp
// Released under the MIT License
// https://gist.github.com/b86523284c7415dd0d3a.git

class EventHandler<T> {
    private _listeners = {};

    fire (key : T, data?) {
        if (typeof this._listeners[<any>key] === 'undefined') {
            for (var i = 0; i < this._listeners[<any>key].length; i++) {
                this._listeners[<any>key][i](data);
            }
        }
    }

    add (key : T, callback) {
        if (typeof this._listeners[<any>key] === 'undefined') {
            this._listeners[<any>key] = [];
        }
        this._listeners[<any>key].push(callback);

        return this._listeners[<any>key].length - 1;
    }

    remove (key : T, callbackIndex : number) {
        this._listeners[<any>key].splice(callbackIndex, 1);
    }

    clear () {
        this._listeners = {};
    }
}