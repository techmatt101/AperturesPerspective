declare var Views : IViews;
declare var Templates : ITemplates;

interface IViews {
    inspiration : (content) => string
}

interface ITemplates {
    card : (content : ICard) => string
}

var controller;

window.addEventListener('load', () => {
    controller = new InspirationController();
});

