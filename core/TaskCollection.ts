class TaskCollection {
    name : string;
    active = 0;

    private _tasks : Function[] = [];
    private _tasksAsync : Array<(onComplete) => void> = [];
    private _activeAsync = 0;
    private _onComplete : () => void;


    constructor(name : string, onComplete : () => void){
        this.name = name;
        this._onComplete = onComplete;
    }

    add(task) {
        this._tasks.push(task);
        return this;
    }

    addAsync(task : (onComplete) => void) {
        this._tasksAsync.push(task);
        return this;
    }

    clear() {
        this._tasks = [];
        this._tasksAsync = [];
        this.active = 0;
    }

    private asyncTaskComplete(task) {
        console.timeEnd(task.name  + ' (async)');
        this._activeAsync--;
        this.active--;
        this.testForComplete();
    }

    private testForComplete() {
        if(this._activeAsync === 0) {
            console.timeEnd('Total Time');
            console.groupEnd();
            this._onComplete();
        }
    }

    run(){
        var self = this;
        console.group(this.name);
        console.time('Total Time');

        this.active = this._tasksAsync.length + this._tasks.length;

        this._activeAsync = this._tasksAsync.length;
        for (var i = 0; i < this._tasksAsync.length; i++) {
            console.time((<any>this._tasksAsync[i]).name + ' (async)');
            this._tasksAsync[i](function() {
                self.asyncTaskComplete(this);
            }.bind(this._tasksAsync[i]));
        }

        for (var i = 0; i < this._tasks.length; i++) {
            console.time((<any>this._tasks[i]).name);
            this._tasks[i]();
            this.active--;
            console.timeEnd((<any>this._tasks[i]).name);
        }

        this.testForComplete();
    }
}