declare var Views : IViews;
declare var Templates : ITemplates;

interface IViews {
    inspiration : (content) => string
    shootPlan : (content) => string
    shootPlanner : (content) => string
}

interface ITemplates {
    card : (content : ICard) => string
}

var controller;

window.addEventListener('load', () => {
    controller = new InspirationController();

    var drawer = document.getElementById('drawer');

    var menu = document.getElementById('menu');
    menu.addEventListener('click', () => {
        var value = !parseBoolean(drawer.getAttribute('open'));
        toggleClass(menu, 'md-menu', 'md-arrow-back', value);
        drawer.setAttribute('open', value.toString());
    });
});
