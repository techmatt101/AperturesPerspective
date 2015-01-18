class ActionBar {
    constructor(activity : Activity) {
        if(typeof activity.intent !== 'undefined') {
            var navBtn = (<HTMLElement>activity.view.querySelector('#navigator'));
            navBtn.className = 'icon md-arrow-back';
            navBtn.addEventListener('click', () => {
                activity.finish();
            });
        }

        var scrollActionBar = <HTMLElement> activity.view.querySelector('.app__header--scroll');
        if(scrollActionBar) {
            (<HTMLElement>scrollActionBar.nextSibling.nextSibling).style.paddingTop = scrollActionBar.offsetHeight + 'px'; //TODO: nextSibling!!!
        }
    }
}