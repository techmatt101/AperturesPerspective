class Tabs {
    private _sideSwipe : SideSwipe;
    private _lis : HTMLElement[];

    constructor(activity : Activity) {
        var breakpoints = [
            {
                pos: 0,
                callback: this.endSwipe.bind({self: this, id: 0})
            },
            {
                pos: document.body.offsetWidth,
                callback: this.endSwipe.bind({self: this, id: 1})
            },
            {
                pos: document.body.offsetWidth * 2,
                callback: this.endSwipe.bind({self: this, id: 2})
            },
            {
                pos: document.body.offsetWidth * 3,
                callback: this.endSwipe.bind({self: this, id: 3})
            },
            {
                pos: document.body.offsetWidth * 4,
                callback: this.endSwipe.bind({self: this, id: 4})
            }
        ];

        this._sideSwipe = new SideSwipe(<HTMLElement> activity.view.querySelector('.tabs__content'), breakpoints); //TODO: need smarter breakpoints

        this._lis  = <any>activity.view.querySelectorAll('.tabs__nav li');

        for (var i = 0; i < this._lis.length; i++) {
            this._lis[i].addEventListener('click', this.snap.bind({ b: breakpoints[i], s:  this._sideSwipe }));
        }
    }

    snap() {
        (<SideSwipe>(<any>this).s).goTo((<any>this).b);
    }

    endSwipe() {
        for (var i = 0; i < (<any>this).self._lis.length; i++) {
            (<any>this).self._lis[i].className = '';
        }

        (<any>this).self._lis[(<any>this).id].className = 'tabs__nav--active';
        //TODO: scroll top
    }
}