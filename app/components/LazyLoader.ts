/// <reference path="../core/IObserver.ts" />

class LazyLoader /*implements IObserver*/ {
    heightOffset = 120;

    private _loader : Loader;
    //private _observer = new EventHandler<LoaderEvent>();


    constructor(loader = new Loader()) {
        this._loader = loader;

        //var self = this;
        //window.addEventListener('scroll', () => {
        //    if(!this._loader.isLoading() && document.body.scrollTop + window.innerHeight >=  document.body.scrollHeight - this.heightOffset) {
        //        self._loader.start();
        //    }
        //});
    }
    //
    //on (eventType : LoaderEvent, callback) {
    //    //this._loader.on(eventType, callback);
    //}
    //
    //off (eventType : LoaderEvent, callbackIndex : number) {
    //    //this._loader.off(eventType, callbackIndex);
    //}
}