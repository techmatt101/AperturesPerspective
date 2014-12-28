interface IObserver {
    on (eventType, callback) : number
    off (eventType, callbackIndex : number)
}