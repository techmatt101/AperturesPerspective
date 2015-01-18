class SideSwipe {

    private _touchStartPosX = 0;
    private _touchStartPosY = 0;
    private _touchStartOffsetPosX = 0;
    private _touchPosX = 0;
    private _offsetPosX = 0;
    private _ignore = false;
    private _firstMove = false;
    private _currentBreakpointIndex = 0;
    private _requestAnimationFrame;

    public allowOverScrolling = false;
    public animationDuration = 200;


    constructor (public element : HTMLElement,
                 public breakpoints : SwipeBreakpoint[]) {
        element.addEventListener('touchstart', this.touchStart.bind(this));
        element.addEventListener('touchmove', this.touchMove.bind(this));
        element.addEventListener('touchend', this.touchEnd.bind(this));
        element.addEventListener('touchcancel', this.touchEnd.bind(this));
        element.addEventListener('touchleave', this.touchEnd.bind(this));
    }

    goTo (breakpoint : SwipeBreakpoint) {
        cancelAnimationFrame(this._requestAnimationFrame);
        this.setTranslateX(-breakpoint.pos);
        this.setTransition('transform', this.animationDuration);
        this._ignore = true;
        setTimeout(() => {
            this._ignore = false;
            this._offsetPosX = breakpoint.pos;
            this.clearTransition();
            if(typeof breakpoint.callback !== 'undefined') {
                breakpoint.callback();
            }
        }, this.animationDuration);

        for (var i = 0; i < this.breakpoints.length; i++) { //TODO: could be better?
            if(this.breakpoints[i] === breakpoint) {
                this._currentBreakpointIndex = i;
                break;
            }
        }
    }

    private touchStart (e : TouchEvent) {
        this._touchStartPosX = e.touches[0].clientX;
        this._touchStartPosY = e.touches[0].clientY;
        this._touchStartOffsetPosX = this._touchStartPosX + this._offsetPosX; //TODO: hmmm.. better way of doing this?
        this._touchPosX = e.touches[0].clientX; //TODO: hmmm...
        this._firstMove = true;
    }

    private touchMove (e : TouchEvent) {
        if(this._ignore) {
            return;
        }
        if (this._firstMove) {
            if (Math.abs(this._touchStartPosY - e.touches[0].clientY) > Math.abs(this._touchStartPosX - e.touches[0].clientX)) {
                this._ignore = true;
                return;
            }
            this._firstMove = false;
        }
        this._touchPosX = e.touches[0].clientX;
        cancelAnimationFrame(this._requestAnimationFrame);
        this._requestAnimationFrame = requestAnimationFrame(this.draw.bind(this));
        e.preventDefault();
    }

    private touchEnd () {
        if(this._ignore) {
            this._ignore = false;
            return;
        }
        this.animateToBreakpoint();
    }

    private animateToBreakpoint() {
        if(Math.abs(this._touchPosX - this._touchStartPosX) > 35) {
            if(this._touchPosX > this._touchStartPosX) {
                if(this._currentBreakpointIndex > 0) {
                    this._currentBreakpointIndex--;
                }
            } else if(this._currentBreakpointIndex < this.breakpoints.length - 1) {
                this._currentBreakpointIndex++;
            }
        }
        this.goTo(this.breakpoints[this._currentBreakpointIndex]);
    }

    private draw () {
        this._offsetPosX = this._touchStartOffsetPosX + -this._touchPosX;
        if (!this.allowOverScrolling) {
            if (this._offsetPosX < this.breakpoints[0].pos) {
                this._offsetPosX = this.breakpoints[0].pos;
            } else if (this._offsetPosX > this.breakpoints[this.breakpoints.length - 1].pos) {
                this._offsetPosX = this.breakpoints[this.breakpoints.length - 1].pos;
            }
        }
        this.setTranslateX(-this._offsetPosX);
    }

    private setTranslateX(pos : number) {
        this.element.style.transform = 'translateX(' + pos + 'px)';
        (<any>this.element.style).webkitTransform = 'translateX(' + pos + 'px)'; //TODO: webkit support?
    }

    private setTransition(property, duration, pacing = 'ease-out') {
        this.element.style.transition = property + ' ' + duration + 'ms ' + pacing;
        (<any>this.element.style).webkitTransition = '-webkit-' + property + ' ' + duration + 'ms ' + pacing;
    }

    private clearTransition() {
        this.element.style.transition = 'none';
        (<any>this.element.style).webkitTransition = 'none';
    }
}

interface SwipeBreakpoint {
    pos : number
    callback? : () => void
}