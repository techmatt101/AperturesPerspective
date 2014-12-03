declare var Views : IViews;
declare var Templates : ITemplates;

interface IViews {
    inspiration : (content?) => string
    shootPlan : (content?) => string
    shootPlanner : (content?) => string
}

interface ITemplates {
    card : (content : ICard) => string
    nav : (content?) => string
    drawer : (content?) => string
}

var basePath = '/AperturesPerspective/';

var controller, controllers = [];

var Routes = {
    '/': InspirationController,
    '/inspiration': InspirationController,
    '/shoot-planner': ShootPlannerController
    //'/settings': SettingsController
};


window.addEventListener('load', () => {
    document.getElementById('nav').innerHTML = Templates.nav({title: 'Apertures Perspective'});
    document.getElementById('menu').innerHTML = Templates.drawer();

    controller = new (Routes[getPath(window.location.href)] || Routes['/']);

    var drawer = document.getElementById('drawer');

    drawer.setAttribute('open', false.toString());

    var touchStartPosX = 0;

    drawer.addEventListener('touchstart', (e : TouchEvent) => {
        var touch : Touch = e.touches[0];
        console.log(touch);
        drawer.style.transition = 'none';
        touchStartPosX = touch.clientX;
    });

    drawer.addEventListener('touchmove', (e : TouchEvent) => {
        var touch : Touch = e.touches[0];

        var direction = (touch.clientX - touchStartPosX - drawer.offsetLeft);
        if(direction > 0) {
            direction = 0;
        }
        drawer.style.transform = 'translateX(' + direction + 'px)';
    });

    document.body.addEventListener('click', (e : MouseEvent) => {
        if (e.target instanceof HTMLAnchorElement) {
            var link = getPath((<HTMLAnchorElement>e.target).href); // (<HTMLAnchorElement>e.target).href.replace(windowLink, ''); //TODO: optimize with splice?
            console.log(link, Routes[link]);
            controller = new Routes[link];
            e.preventDefault();
        }
    });
});

function getPath (href) {
    return href.slice(window.location.protocol.length + window.location.host.length + basePath.length + 1, href.length)
}

function loadView(title, html) {
    document.getElementById('nav').innerHTML = Templates.nav({title: title});

    var drawer = document.getElementById('drawer');
    var menu = document.getElementById('btn-menu');
    menu.addEventListener('click', () => {
        var value = !parseBoolean(drawer.getAttribute('open'));
        toggleClass(menu, 'md-menu', 'md-arrow-back', value);
        drawer.setAttribute('open', value.toString());
    });

    document.getElementById('content').innerHTML = html;
}