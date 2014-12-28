/// <reference path="IObserver.ts" />

enum LoaderEvent {
    START,
    FINISH
}

class Loader implements IObserver {
    private _observer = new EventHandler<LoaderEvent>();
    private _loading = false;
    private _queued_action : () => void = null;


    start () {
        this._loading = true;
        this._observer.fire(LoaderEvent.START);
    }

    finish () {
        if (this._queued_action !== null) {
            this._queued_action();
            return;
        }
        this._loading = false;
        this._observer.fire(LoaderEvent.FINISH);
    }

    que (action) {
        if (!this.isLoading()) {
            this.start();
            action();
            return;
        }
        this._queued_action = action;
    }

    isLoading () {
        return this._loading;
    }

    on (eventType : LoaderEvent, callback) {
        return this._observer.add(eventType, callback);
    }

    off (eventType : LoaderEvent, callbackIndex : number) {
        this._observer.remove(eventType, callbackIndex);
    }
}