declare var Views : IViews;
declare var Templates : ITemplates;

interface IViews {
    inspiration : (content) => string
    shootPlan : (content) => string
    shootPlanner : (content) => string
}

interface ITemplates {
    card : (content : ICard) => string
    nav : (content) => string
    drawer : () => string
}

var controller;

window.addEventListener('load', () => {
    document.getElementById('nav').innerHTML = Templates.nav({title: 'Apertures Perspective'});
    document.getElementById('menu').innerHTML = Templates.drawer();

    controller = new InspirationController();

    var drawer = document.getElementById('drawer');

    var menu = document.getElementById('btn-menu');
    menu.addEventListener('click', () => {
        var value = !parseBoolean(drawer.getAttribute('open'));
        toggleClass(menu, 'md-menu', 'md-arrow-back', value);
        drawer.setAttribute('open', value.toString());
    });

    drawer.addEventListener('touchmove', (e : TouchEvent) => {
        var touch : Touch = e.touches[0];
        console.log(e);
        drawer.style.transform = 'translateX(' + (touch.clientX - (<HTMLElement>e.target).offsetWidth) + 'px)';
    });
});
