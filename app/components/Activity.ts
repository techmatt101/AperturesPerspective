class Activity {
    public view : HTMLElement;
    public intent : Activity;


    constructor () {
        this.view = document.createElement('div');
        this.view.className = 'activity';
    }

    start (intent? : Activity) {
        this.intent = intent;
        this.create();
        this.load();
    }

    load () {
    }

    finish (ignore?) {
        if (typeof this.intent !== 'undefined') {
            this.intent.load();
        }
        document.body.removeChild(this.view);
    }

    protected create (state?) {
    }

    protected getElement (query) : HTMLElement {
        return <HTMLElement> this.view.querySelector(query);
    }

    protected setView (view : string) {
        this.view.innerHTML = view;
        document.body.appendChild(this.view);
    }
}