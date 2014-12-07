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
    new ActionBar(title);
    document.getElementById('content').innerHTML = html;
}