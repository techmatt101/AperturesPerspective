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

var basePath = '/AperturesPerspective/dist/';

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
    controller.start();

    document.body.addEventListener('click', (e : MouseEvent) => {
        if (e.target instanceof HTMLAnchorElement) {
            e.preventDefault();
            var link = (<any>e.target).attributes.href.value;
            var newController = new Routes[link];
            newController.start();
            controller.finish();
            controller = newController;
        }
    });
});

function getPath (href) {
    return href.slice(window.location.protocol.length + window.location.host.length + basePath.length + 1, href.length)
}